"""Build Benjamin Franklin's passage library from his own public-domain writing.

Downloads two Project Gutenberg texts and splits them into short passages, each
tagged with the work it comes from, so the guide can retrieve and cite his
actual words:

  #148    The Autobiography of Benjamin Franklin (Harvard Classics, 1909)
  #40236  Memoirs of Benjamin Franklin, Vol. 2: essays, letters and
          philosophical papers (Harper & Brothers, 1839)

Only Franklin's own text is kept. Editors' introductions, footnotes, letters
written to him, and Lord Brougham's portrait are left out.

  python scripts/build_passages_franklin.py            # writes src/data/passages/franklin.json
  python scripts/build_passages_franklin.py --cache DIR  # reuse downloaded files in DIR
"""
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "passages", "franklin.json")
TARGET_WORDS = 190
MAX_WORDS = 260


def fetch(book_id, cache):
    path = os.path.join(cache, f"pg{book_id}.txt") if cache else None
    if path and os.path.exists(path):
        return open(path, encoding="utf-8").read()
    url = f"https://www.gutenberg.org/cache/epub/{book_id}/pg{book_id}.txt"
    req = urllib.request.Request(url, headers={"User-Agent": "summon-guide passage builder"})
    text = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
    if path:
        os.makedirs(cache, exist_ok=True)
        open(path, "w", encoding="utf-8").write(text)
    return text


def clean(paragraph):
    p = re.sub(r"\[\d+\]", "", paragraph)          # footnote markers
    p = p.replace("_", "")                           # italics markup
    p = re.sub(r"\s+", " ", p).strip()
    p = p.replace("—", ", ").replace("–", "-").replace("--", ", ")
    return re.sub(r"\s+,", ",", p)


def paragraphs(lines):
    out, cur = [], []
    for line in lines:
        if line.strip():
            cur.append(line.strip())
        elif cur:
            out.append(" ".join(cur))
            cur = []
    if cur:
        out.append(" ".join(cur))
    keep = []
    for p in out:
        if re.match(r"^\[\d+\]", p):                 # footnote text
            continue
        if re.fullmatch(r"[\s*]+", p):               # ornament rows
            continue
        c = clean(p)
        if len(c.split()) >= 4:
            keep.append(c)
    return keep


def chunk(paras):
    """Group paragraphs into passages near TARGET_WORDS; split very long paragraphs by sentence."""
    units = []
    for p in paras:
        if len(p.split()) <= MAX_WORDS:
            units.append(p)
            continue
        sentence, cur = re.split(r"(?<=[.!?;])\s+", p), []
        for s in sentence:
            cur.append(s)
            if len(" ".join(cur).split()) >= TARGET_WORDS:
                units.append(" ".join(cur))
                cur = []
        if cur:
            units.append(" ".join(cur))
    chunks, cur = [], []
    for u in units:
        if cur and len(" ".join(cur + [u]).split()) > MAX_WORDS:
            chunks.append(" ".join(cur))
            cur = []
        cur.append(u)
        if len(" ".join(cur).split()) >= TARGET_WORDS:
            chunks.append(" ".join(cur))
            cur = []
    if cur:
        if chunks and len(" ".join(cur).split()) < 60:
            chunks[-1] += " " + " ".join(cur)
        else:
            chunks.append(" ".join(cur))
    return chunks


def find(lines, pattern, start=0):
    for i in range(start, len(lines)):
        if re.search(pattern, lines[i]):
            return i
    raise SystemExit(f"marker not found: {pattern}")


def title_case(heading):
    small = {"a", "an", "and", "the", "of", "to", "in", "on", "its", "that", "be", "not", "for", "from", "by", "among", "at"}
    words = heading.replace(".--", "; ").replace(". AND ", ", AND ").lower().rstrip(".,").split()
    out = [w if (i and w in small) else w[:1].upper() + w[1:] for i, w in enumerate(words)]
    return " ".join(out).replace("'S", "'s")


def autobiography(text):
    lines = text.split("\n")
    start = find(lines, r"^Dear Son: I have ever had pleasure")
    letters = find(lines, r"^Letter from Mr\. Abel James", start)
    part2 = find(lines, r"^It is some time since I receiv'd the above letters", letters)
    part3_note = find(lines, r"^\[Thus far written at Passy, 1784\.\]", part2)
    part3 = find(lines, r"^Having mentioned a great and extensive project", part3_note)
    end = find(lines, r"^CHIEF EVENTS IN FRANKLIN'S LIFE", part3)
    sections = [
        ("Autobiography, Part One (written 1771)", lines[start:letters]),
        ("Autobiography, Part Two (written 1784)", lines[part2:part3_note]),
        ("Autobiography, Parts Three and Four (written 1788 to 1790)", lines[part3:end]),
    ]
    return [(title, "Autobiography", paragraphs(body)) for title, body in sections]


HEADING = re.compile(r'^"?_([A-Z][^_]{2,90})_\.?(?:\[\d+\])?\.?"?$')
CAPS = re.compile(r"^[A-Z][A-Z .,;:'\"&-]{6,}(?:\[\d+\])?$")
SALUTATIONS = ("DEAR", "MY DEAR", "MR.", "SIR", "HONOURED", "COURTEOUS", "REVEREND", "TO MY FRIEND", "TO MADAME", "MADAM")


def essays_and_letters(text):
    lines = text.split("\n")
    first = find(lines, r"^THE WAY TO WEALTH,")
    letters = find(lines, r"^LETTERS\.$", first)
    philosophical = find(lines, r"^PHILOSOPHICAL SUBJECTS\.$", letters)
    end = find(lines, r"^LORD BROUGHAM'S PORTRAIT OF DR\. FRANKLIN", philosophical)
    sections = []

    # Essays: an all-caps heading starts each one (multi-line headings are joined).
    title, body = None, []
    i = first
    while i < letters:
        line = lines[i].rstrip()
        if CAPS.match(line) and not line.startswith(SALUTATIONS) and not lines[i - 1].strip():
            heading = line
            while i + 1 < letters and CAPS.match(lines[i + 1].rstrip()) and not lines[i + 1].startswith(SALUTATIONS):
                i += 1
                heading += " " + lines[i].rstrip()
            if title:
                sections.append((title, "Essay", paragraphs(body)))
            title, body = title_case(re.sub(r"\[\d+\]", "", heading)), []
        else:
            body.append(line)
        i += 1
    if title:
        sections.append((title, "Essay", paragraphs(body)))

    # Letters: an italic addressee line starts each one.
    def addressee(match, previous):
        who = re.sub(r"\[\d+\]", "", match.group(1)).strip().rstrip(".")
        who = re.sub(r"^To ", "", who)
        if who.lower() == "the same" and previous:
            who = previous
        return who

    title, body, previous = None, [], None
    for j in range(letters + 1, philosophical):
        line = lines[j].rstrip()
        m = HEADING.match(line)
        if m:
            if title:
                sections.append((title, "Letter", paragraphs(body)))
            who = addressee(m, previous)
            previous = who
            title = who if who.lower().startswith(("answer to", "copy of the last")) else f"Letter to {who.split(',')[0]}"
            body = []
        else:
            body.append(line.lstrip('"'))
    if title:
        sections.append((title, "Letter", paragraphs(body)))

    # Scientific papers: an addressee line, usually followed by an all-caps
    # topic. A topic with no addressee before it is a standalone paper.
    title, body, previous, who = None, [], None, None
    j = philosophical + 1
    while j < end:
        line = lines[j].rstrip()
        m = HEADING.match(line)
        if m:
            if title:
                sections.append((title, "Scientific letter", paragraphs(body)))
            who = addressee(m, previous)
            previous = who
            title, body = f"Letter to {who.split(',')[0]}", []
        elif CAPS.match(line) and not line.startswith(SALUTATIONS):
            heading = line
            while j + 1 < end and CAPS.match(lines[j + 1].rstrip()) and not lines[j + 1].startswith(SALUTATIONS):
                j += 1
                heading += " " + lines[j].rstrip()
            topic = title_case(re.sub(r"\[\d+\]", "", heading))
            if title and not paragraphs(body):
                title = f"{topic} (letter to {who.split(',')[0]})"
            else:
                if title:
                    sections.append((title, "Scientific letter", paragraphs(body)))
                title, body = topic, []
        else:
            body.append(line.lstrip('"'))
        j += 1
    if title:
        sections.append((title, "Scientific letter", paragraphs(body)))
    return sections


def main():
    cache = sys.argv[sys.argv.index("--cache") + 1] if "--cache" in sys.argv else None
    works = [
        ("The Autobiography of Benjamin Franklin", "https://www.gutenberg.org/ebooks/148", autobiography(fetch(148, cache))),
        ("Memoirs of Benjamin Franklin, Vol. 2: Essays, Letters and Philosophical Papers", "https://www.gutenberg.org/ebooks/40236", essays_and_letters(fetch(40236, cache))),
    ]
    passages, seen = [], {}
    for work, url, sections in works:
        for title, kind, paras in sections:
            if not paras:
                continue
            n = seen.get(title, 0) + 1          # several letters to one person
            seen[title] = n
            label = title if n == 1 else f"{title} ({n})"
            for k, body in enumerate(chunk(paras)):
                passages.append({"id": f"franklin-{len(passages) + 1:04d}", "title": label, "kind": kind, "work": work, "url": url, "part": k + 1, "text": body})
    for p in passages:
        assert "—" not in p["text"] and "–" not in p["text"]
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump({"guide": "franklin", "rights": "Public domain (Project Gutenberg #148 and #40236)", "passages": passages}, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    titles = sorted({p["title"] for p in passages})
    words = sum(len(p["text"].split()) for p in passages)
    print(f"{len(passages)} passages, {words} words, {len(titles)} titled sources -> {os.path.relpath(OUT, ROOT)}")
    for kind in ("Autobiography", "Essay", "Letter", "Scientific letter"):
        print(f"  {kind}: {sum(1 for p in passages if p['kind'] == kind)} passages, {len({p['title'] for p in passages if p['kind'] == kind})} sources")


if __name__ == "__main__":
    main()
