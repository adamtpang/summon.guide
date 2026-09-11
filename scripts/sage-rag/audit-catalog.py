"""Read the public first-party catalog, never private Founders Notes content."""
import datetime
import json
import re
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[2]
knowledge = root.parent / "summon.company" / "knowledge"
output = knowledge / "_sage-rag-pilot"
output.mkdir(exist_ok=True)
url = "https://www.founderspodcast.com/"
html = urllib.request.urlopen(url, timeout=30).read().decode("utf-8")
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
if not episodes:
    raise SystemExit("Public catalog format changed; no coverage claim generated.")
rows = [{key: e.get(key) for key in ["slug", "guid", "title", "episodeNumber", "publishedAt"]} for e in episodes]
normalize = lambda text: re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()
manifest = json.loads((knowledge / "founders-podcast/manifest.json").read_text(encoding="utf-8"))
titles = {normalize(e["title"]) for e in manifest["episodes"]}
matched = [e for e in rows if normalize(e["title"]) in titles]
unmatched = [e for e in rows if normalize(e["title"]) not in titles]
report = {
    "source": url,
    "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "catalogEntries": len(rows),
    "numberedEntries": sum(isinstance(e["episodeNumber"], int) for e in rows),
    "syncedYouTubeEpisodes": len(manifest["episodes"]),
    "exactTitleMatches": len(matched),
    "unmatchedCatalogEntries": len(unmatched),
    "limitation": "Exact-title matching only. Renamed, duplicate, trailer and bonus entries need reconciliation; unmatched does not prove missing.",
}
(output / "catalog-audit.json").write_text(json.dumps({"summary": report, "unmatched": unmatched, "episodes": rows}, indent=2), encoding="utf-8")
print(json.dumps(report))
