"""Reconcile public podcast metadata with local YouTube inventory."""
import collections
import datetime
import difflib
import json
import re
import unicodedata
import urllib.request
import sys
import functools
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE = ROOT.parent / "summon.company" / "knowledge"
OUT = KNOWLEDGE / "_sage-rag-pilot"


def normalize(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


@functools.lru_cache(maxsize=2048)
def title(text):
    return normalize(re.sub(r"^\s*#?\d+\s*[:.\-]\s*", "", text))


@functools.lru_cache(maxsize=2048)
def description(text):
    # Ignore shared sponsor copy when identifying an episode.
    text = re.split(r"made possible by|episode sponsors|this episode is brought|sponsors:", text, flags=re.I)[0]
    text = re.sub(r"https?://[^\s)]+", "", text)
    return normalize(text)[:180]


@functools.lru_cache(maxsize=2048)
def episode_links(text):
    links = re.findall(r"https?://(?:www\.)?(?:founderspodcast.com|joincolossus.com)/(?:episodes?|p)/[^\s<>]+", text)
    numbered = []
    for link in links:
        match = re.search(r"/(?:senra-)?(\d{1,3})-", link)
        if match:
            numbered.append((int(match[1]), link))
    return numbered


def duration_minutes(value):
    match = re.fullmatch(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", value or "")
    return sum(int(n or 0) * scale for n, scale in zip(match.groups(), [60, 1, 1/60])) if match else None


def reconcile(episodes, local):
    rows = []
    for episode in episodes:
        et, ed = title(episode["title"]), description(episode.get("description", ""))
        candidates = []
        for video in local:
            vt, vd = title(video["title"]), description(video.get("description", ""))
            links = episode_links(video.get("description", ""))
            linked_number = next((link for number, link in links if number == episode.get("episodeNumber")), None)
            different_number = bool(links) and not linked_number
            common = min(len(ed), len(vd), 120)
            description_exact = common >= 65 and ed[:common] == vd[:common]
            same_title = et == vt
            direct_id = video["id"] in episode.get("description", "")
            desc_similarity = difflib.SequenceMatcher(None, ed[:120], vd[:120]).ratio() if ed and vd else 0
            title_similarity = difflib.SequenceMatcher(None, et, vt).ratio()
            generic = set('the of a an how life story biography autobiography founder founders works worked genius simple part'.split())
            identity = set(et.split()) - generic
            shared = identity.intersection(set(vt.split()) - generic)
            name_agrees = len(shared) >= min(2, len(identity)) and bool(identity)
            duration = episode.get("durationMinutes")
            delta = abs(duration - video["duration_min"]) if duration is not None else None
            title_duration = name_agrees and delta is not None and delta <= 1 and (desc_similarity >= .65 or title_similarity >= .7)
            # An episode link also needs title/description corroboration: pasted links can be wrong.
            linked_number = linked_number if name_agrees else None
            evidence = [name for name, yes in [("video-id-in-official-description", direct_id), ("corroborated-episode-number-link", linked_number), ("normalized-title", same_title and not different_number), ("distinctive-description-prefix", description_exact and not different_number and name_agrees), ("title-description-duration", title_duration and not different_number)] if yes]
            candidates.append({"videoId": video["id"], "title": video["title"], "url": video["url"], "published": video.get("published"), "episodeLink": linked_number, "durationDeltaMinutes": round(delta, 2) if delta is not None else None, "conflictingEpisodeLink": different_number, "evidence": evidence, "score": round(max(title_similarity, desc_similarity), 4), "descriptionSimilarity": round(desc_similarity, 4), "catalogOpening": ed[:120], "videoOpening": vd[:120]})
        certain = [c for c in candidates if c["evidence"]]
        candidates.sort(key=lambda c: (bool(c["evidence"]), c["score"]), reverse=True)
        status = "matched" if len(certain) == 1 else "ambiguous" if certain else "review" if candidates[0]["score"] >= .62 else "no-local-match"
        rows.append({**{k: episode.get(k) for k in ["guid", "slug", "title", "episodeNumber", "publishedAt"]}, "status": status, "matches": certain, "candidates": candidates[:3]})
    reverse = collections.defaultdict(list)
    for row in rows:
        if row["status"] == "matched":
            reverse[row["matches"][0]["videoId"]].append(row)
    for group in reverse.values():
        if len(group) > 1:
            close = [row for row in group if row["matches"][0]["durationDeltaMinutes"] is not None and row["matches"][0]["durationDeltaMinutes"] <= 1]
            for row in group:
                row["status"] = "matched" if len(close) == 1 and row == close[0] else "review-repeated-book"
    return rows


def main():
    url = "https://www.founderspodcast.com/"
    html = urllib.request.urlopen(url, timeout=45).read().decode("utf-8") if '--cached' not in sys.argv else ''
    episodes = None
    for match in re.finditer(r"self\.__next_f\.push\((.*?)\)</script>", html):
        try:
            payload = json.loads(match.group(1))[1]
            start = payload.find('"episodes":[')
            if start >= 0:
                episodes = json.JSONDecoder().raw_decode(payload[start + 11:])[0]
                break
        except (ValueError, TypeError, IndexError):
            continue
    if '--cached' in sys.argv:
        episodes = json.loads((OUT / 'official-catalog-full.json').read_text(encoding='utf-8'))
    if not episodes:
        raise SystemExit("Catalog parse failed; refusing to replace reconciliation.")
    for episode in episodes:
        detail = OUT / 'catalog-details' / (episode['slug'] + '.json')
        if detail.exists():
            data = json.loads(detail.read_text(encoding='utf-8'))
            episode['durationMinutes'] = duration_minutes(data.get('associatedMedia', {}).get('duration'))
            episode['publicAudioUrl'] = data.get('associatedMedia', {}).get('contentUrl')
    local = json.loads((KNOWLEDGE / "founders-podcast/manifest.json").read_text(encoding="utf-8"))["episodes"]
    rows = reconcile(episodes, local)
    reviewed = json.loads(Path(__file__).with_name('catalog-reviewed-matches.json').read_text(encoding='utf-8'))
    interviews = json.loads((KNOWLEDGE / 'david-senra-conversations/manifest.json').read_text(encoding='utf-8'))['episodes']
    for review in reviewed['matches']:
        row = next(r for r in rows if r['slug'] == review['slug']) if 'slug' in review else next(r for r in rows if r['episodeNumber'] == review['episodeNumber'])
        source = review.get('source', 'founders-podcast')
        video = next(v for v in (interviews if source == 'david-senra-conversations' else local) if v['id'] == review['videoId'])
        row['status'] = 'matched-cross-feed' if source == 'david-senra-conversations' else 'matched-reviewed'
        row['matches'] = [{'videoId': video['id'], 'title': video['title'], 'url': video['url'], 'source': source, 'evidence': ['agent-reviewed-metadata'], 'review': review}]
    linked = {c["videoId"] for r in rows if r["status"].startswith("matched") for c in r["matches"] if c.get('source', 'founders-podcast') == 'founders-podcast'}
    reverse = collections.defaultdict(list)
    for row in rows:
        if row["status"].startswith("matched"):
            reverse[row["matches"][0]["videoId"]].append(row["slug"])
    summary = {"checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "source": url, "catalogEntries": len(rows), "numberedEntries": sum(isinstance(r["episodeNumber"], int) for r in rows), "syncedFoundersVideos": len(local), "statuses": dict(collections.Counter(r["status"] for r in rows)), "linkedUniqueVideos": len(linked), "unlinkedVideos": len(local)-len(linked), "limitation": "Metadata reconciliation only. Review/no-local-match rows are acquisition candidates, not proof a distinct episode is absent. Matching does not prove complete transcript text."}
    report = {"summary": summary, "rows": rows, "unlinkedVideos": [v for v in local if v["id"] not in linked], "sharedVideoMappings": {k:v for k,v in reverse.items() if len(v)>1}}
    episode_by_slug = {e['slug']: e for e in episodes}
    queue = [{**r, 'publicAudioUrl': episode_by_slug[r['slug']].get('publicAudioUrl'), 'durationMinutes': episode_by_slug[r['slug']].get('durationMinutes'), 'nextAction': 'Resolve possible duplicate or acquire eligible public source; metadata availability is not hosted transcript authorization.'} for r in rows if not r['status'].startswith('matched')]
    (OUT / 'catalog-acquisition-queue.json').write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding='utf-8')
    OUT.mkdir(exist_ok=True)
    (OUT / "catalog-reconciliation.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    (OUT / "official-catalog-full.json").write_text(json.dumps(episodes, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(summary))


if __name__ == "__main__":
    main()
