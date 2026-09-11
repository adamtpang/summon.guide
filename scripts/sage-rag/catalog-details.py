"""Cache public episode metadata (including audio URL and duration), not audio."""
import concurrent.futures
import json
import re
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[3] / "summon.company/knowledge/_sage-rag-pilot"
CACHE = OUT / "catalog-details"
CACHE.mkdir(exist_ok=True)


def fetch(row):
    filename = CACHE / (row["slug"] + ".json")
    if filename.exists():
        return "cached"
    url = "https://www.founderspodcast.com/episodes/" + row["slug"]
    try:
        html = urllib.request.urlopen(url, timeout=30).read().decode("utf-8")
        for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html):
            data = json.loads(raw)
            for item in data.get("@graph", []):
                if item.get("@type") == "PodcastEpisode":
                    filename.write_text(json.dumps(item, ensure_ascii=False, indent=2), encoding="utf-8")
                    return "fetched"
        return "parse-failed:" + row["slug"]
    except Exception as error:
        return "failed:" + row["slug"] + ":" + str(error)


if __name__ == "__main__":
    rows = json.loads((OUT / "official-catalog-full.json").read_text(encoding="utf-8"))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(fetch, rows))
    from collections import Counter
    print(json.dumps(dict(Counter(results))))
