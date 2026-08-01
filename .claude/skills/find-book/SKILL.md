---
name: find-book
description: Find a legally ingestible source for a book, so it can go through the book-to-skills or book-to-episodes pipeline. Checks the local library first, then public domain, open access, and library scans, and escalates to a browser only for the tail that has no API. Use when the user wants a book PDF, asks where to get a book, has a backlog of titles to source, or names a book that is not yet in books.ts.
---

# Find a book

Sourcing is the step before every pipeline in this repo, and it is the step that
silently decides whether a corpus can be cited. A source you cannot legally read
is a source you cannot quote on a public page.

## Scope, stated once

Search sources the reader can legally use: the local library, public domain,
open access, and library lending. Do not search shadow libraries. This is not
squeamishness, it is that the whole point of the corpus is that a claim on a
guide's page traces to a source, and a source that cannot be named is worth
less than no source.

## Run the script first

```bash
node scripts/find-book.mjs "The Beginning of Infinity"
node scripts/find-book.mjs --backlog "C:/Users/adamp/Desktop/win/Library/Books/no-pdfs"
```

It checks, in this order:

1. **The local library** at `Desktop/win/Library/Books`. Roughly 544 books are
   already there across several shelves. Check before hunting anything, because
   the most common outcome is that the book is already owned.
2. **Project Gutenberg** via the Gutendex API. Public domain, epub and text.
3. **DOAB**, peer reviewed open access books. This is where Vervaeke's
   *Zombies in Western Culture* came from.
4. **Open Library and the Internet Archive**. Distinguishes a full public domain
   scan, which is ingestible, from controlled digital lending, which is
   borrowable to read but not to ingest. The script labels which is which and
   never conflates them.

Most books resolve here in one request, with no browser involved.

## When to reach for the browser harness

The APIs above cover public domain, open access, and archive scans. They do not
cover two cases that matter, because neither has an API:

- **The author's own site.** More authors post a free copy than people expect.
  Balaji's *The Network State* is free at thenetworkstate.com. Pressfield,
  Graham, and many others publish essays and sometimes whole books.
- **The publisher's open access edition.** University presses and Open Book
  Publishers often have one, findable only by looking at the book's page.

For those, use [browser-harness](https://github.com/browser-use/browser-harness):
Python, drives real Chrome over the DevTools protocol, and writes its own helper
code as it goes rather than needing a scraper per site.

```
uv tool install browser-harness
browser-harness skill
# then enable remote debugging at chrome://inspect/#remote-debugging
```

Give it a task shaped like this, and keep the constraint explicit in the prompt
so the agent does not wander into shadow libraries when the legitimate search
fails:

> Find whether a free, author-authorised or publisher-authorised copy of
> `<title>` by `<author>` exists. Check the author's own website, the
> publisher's page for the book, and any university press open access
> programme. Report the direct URL and what licence it is offered under. If no
> authorised free copy exists, say so and stop. Do not search shadow libraries.

The harness is the right tool here precisely because these pages have no shape
in common. Writing a scraper for each would be endless; an agent that reads the
page and adapts is not.

## Then ingest

Once there is a file:

```bash
node scripts/pdf-to-md.mjs sources/<figure-slug>/<book-slug>.pdf
```

Then either `/book-to-skills` for installable frameworks, or `/book-to-episodes`
for a watchable series. Add the book to `src/lib/books.ts` first; both pipelines
refuse to run without it.

## Anti-patterns

- Hunting online for a book that is already on the local shelf. Run the script.
- Treating a lending copy as ingestible. Borrowing lets you read it, and the
  script labels it, so respect the label.
- Recording a source you cannot link. If the `source` field in `skills.ts` or
  `books.ts` cannot be checked by a reader, the grounding is decorative.
- Reaching for the browser first. It is slower, it breaks when a page changes,
  and for most books an API already has the answer.
