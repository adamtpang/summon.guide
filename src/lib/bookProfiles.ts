// Wikipedia-style profile data per book. Keyed by book slug (see books.ts).
// Used by /books/[slug] pages. Kept separate from books.ts for the same reason
// profiles.ts is separate from figures.ts: the catalog entry and the readable
// encyclopedia prose are different concerns.
//
// A book with no entry here still gets a page, rendered from its books.ts
// record alone. That keeps every book linkable from day one and lets the rich
// profiles land one at a time.

export interface KeyIdea {
  /** the idea's name, as the book itself would put it */
  title: string;
  /** 1 paragraph explaining it plainly, with the book's own example where possible */
  body: string;
}

export interface BookProfile {
  /** matches a slug in books.ts */
  slug: string;
  /** title including subtitle, as printed */
  fullTitle: string;

  // Wikipedia-style infobox
  language?: string;
  country?: string;
  subjects?: string[];
  genre?: string;
  publisher?: string;
  publicationDate?: string;
  pages?: string;
  isbn?: string;
  precededBy?: string;
  followedBy?: string;
  wikipediaUrl?: string;

  // Body sections, each rendering as its own h2
  /** 2 paragraphs: what the book is and what it argues */
  overview: string;
  /** the frameworks themselves, which is the reason anyone comes to this page */
  keyIdeas: KeyIdea[];
  /** how it was received and by whom */
  reception?: string;
  /** its influence, especially where it shows up in the present */
  legacy?: string;

  /** short, attributed, famous. 3 to 5. */
  notableQuotes: string[];
  /** why this book is a source in the library, in our own voice */
  whyItMatters?: string;
}

export const bookProfiles: Record<string, BookProfile> = {
  "the-beginning-of-infinity": {
    slug: "the-beginning-of-infinity",
    fullTitle: "The Beginning of Infinity: Explanations That Transform the World",

    language: "English",
    country: "United Kingdom",
    subjects: [
      "Epistemology",
      "Philosophy of science",
      "Progress",
      "Quantum theory",
    ],
    genre: "Non-fiction",
    publisher: "Allen Lane (UK), Viking Press (US)",
    publicationDate: "31 March 2011",
    pages: "496",
    isbn: "978-0-7139-9274-8",
    precededBy: "The Fabric of Reality (1997)",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Beginning_of_Infinity",

    overview:
      "The Beginning of Infinity is a 2011 book by the British physicist David Deutsch, a pioneer of quantum computation. Its argument is that explanatory knowledge is the thing that makes unbounded progress possible, and that the growth of such knowledge has no natural limit. The Enlightenment, on this account, was not merely a period in European history but the moment a culture first began systematically seeking good explanations and correcting its errors, which is why Deutsch calls it a beginning of infinity.\n\nThe book ranges much wider than physics. It moves through epistemology, the theory of computation, evolutionary biology, aesthetics, political philosophy, and the anthropic arguments in cosmology, on the claim that these are not separate subjects but connected strands of one story about how knowledge grows. Deutsch works in the tradition of Karl Popper, and the book is in large part an argument that Popper's fallibilism, taken seriously, has consequences most people have not absorbed.",

    keyIdeas: [
      {
        title: "Good explanations are hard to vary",
        body:
          "This is the book's central criterion, and Deutsch's main original contribution to epistemology. A good explanation is one whose details each do necessary work, so that changing any of them destroys the explanation. He contrasts the Greek myth that winter comes because Persephone was abducted, which is easy to vary (any deity, any grievance, any season would serve equally well), with the axis-tilt explanation, which is hard to vary: the geometry forces the conclusion, and forces the further prediction that the seasons run opposite in the other hemisphere. Testability matters, but hard-to-vary is the deeper standard, because a theory can be testable and still be a bad explanation.",
      },
      {
        title: "Problems are inevitable, problems are soluble",
        body:
          "Deutsch's Principle of Optimism, and the most quoted line in the book. Optimism here is not a forecast that things will turn out well. It is the claim that all failures are ultimately caused by insufficient knowledge, and that any evil not forbidden by the laws of nature can be removed given the right knowledge. Pessimism, he argues, always smuggles in an unargued assumption that some particular problem is insoluble in principle. The corollary is uncomfortable in both directions: problems never stop arriving, so no state of affairs is ever finished.",
      },
      {
        title: "Fallibilism and error correction",
        body:
          "Following Popper, all knowledge is conjectural and none of it can be justified as certain. Progress therefore does not come from finding a reliable source of certainty, whether authority, revelation, induction, or raw sense experience, because there is no such source. It comes from creating conjectures and then criticizing them. This makes the crucial question about any institution, tradition, or company not whether it is right, but whether it is capable of noticing that it is wrong.",
      },
      {
        title: "The reach of explanations",
        body:
          "Good explanations tend to solve problems far beyond the ones they were invented for. Newton's laws were devised for planets and turned out to govern bridges. This reach cannot be predicted in advance, which is precisely why the growth of knowledge is unbounded rather than a march toward a known finish line. It also means the value of a discovery is systematically underestimated at the moment it is made.",
      },
      {
        title: "The jump to universality",
        body:
          "Systems that are improved incrementally often cross a threshold and abruptly become universal within their domain. A finite alphabet can spell any word; a positional number system can express any number; DNA encodes any organism; a universal Turing machine runs any computation. Deutsch's point is that these jumps were almost never designed. They arrived as side effects of small practical improvements, which is a reason to expect the next one to be unrecognized when it happens.",
      },
      {
        title: "People are universal explainers",
        body:
          "Humans differ from other animals in kind rather than in degree: we are universal explainers and constructors, able in principle to understand anything understandable and build anything physics permits. Deutsch uses this against what he calls the Principle of Mediocrity, the assumption that humans and our location are nothing special. On his account, people are cosmically significant, because the growth of knowledge is a physical process with no known upper bound.",
      },
      {
        title: "Spaceship Earth is a misconception",
        body:
          "The image of Earth as a benign life-support system that humans are damaging gets the causation backwards. Deutsch observes that the biosphere does not support human life anywhere without knowledge; even Oxfordshire would kill an unclothed, unsheltered, pre-agricultural human. Habitability is something knowledge creates rather than something the planet provides. He does not use this to dismiss environmental problems, but to argue that they are knowledge problems and therefore soluble.",
      },
      {
        title: "Static and dynamic societies",
        body:
          "Cultures are made of memes, and memes replicate in two very different ways. Anti-rational memes survive by disabling the recipient's capacity to criticize them, which is how static societies persist for centuries with almost no change. Rational memes survive because they hold up under criticism. A dynamic society is one whose memes are of the second kind, and the Enlightenment was the transition from the first regime to the second. This is the sense in which the book's title is a claim about history and not just about physics.",
      },
    ],

    reception:
      "The book was widely and largely favourably reviewed on publication, though several reviewers noted that the chapters on quantum theory and on the multiverse demand considerably more of the reader than the rest. It has had an unusually long tail: rather than fading after its publication year, it accumulated readers steadily through technology and startup circles over the following decade, and is now more discussed than it was in 2011.",

    legacy:
      "The Beginning of Infinity became a foundational text for the techno-optimist current in technology, and its vocabulary, particularly good explanations, hard to vary, and problems are soluble, now circulates well beyond people who have read it. Naval Ravikant has repeatedly named it among the most important books he has read, and Marc Andreessen's Techno-Optimist Manifesto draws directly on Deutsch's argument that knowledge growth has no natural ceiling. Both are guides in this library, which makes this book one of the roster's connective texts rather than a single figure's source.",

    notableQuotes: [
      "Problems are inevitable. Problems are soluble.",
      "Good explanations are hard to vary.",
      "Everything not forbidden by the laws of nature is achievable, given the right knowledge.",
      "Optimism is a way of explaining failure, not of prophesying success.",
    ],

    whyItMatters:
      "Two skills in this library come straight out of this book. The hard-to-vary test is a practical tool, not only an epistemological one: it works on a business plan, a diagnosis, or an excuse just as well as on a scientific theory. And the Principle of Optimism is the most useful thing to reach for when a problem looks structural and permanent, because its first move is to ask what knowledge is missing rather than whether the thing is possible.",
  },
};

/** Rich profile for a book, if one has been written yet. */
export function getBookProfile(slug: string): BookProfile | undefined {
  return bookProfiles[slug];
}

/** Slugs that have a full encyclopedia-style write-up. */
export function booksWithProfiles(): string[] {
  return Object.keys(bookProfiles);
}
