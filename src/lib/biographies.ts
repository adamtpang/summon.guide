// Full-length life stories for curated guides, shown on /<guide>/about.
// A guide without an entry here keeps the short profile from profiles.ts.
// Rules: every quotation is exact and names its source; every image is public
// domain or openly licensed and carries its credit and source link.

export type BioImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
};

export type BioChapter = {
  id: string;
  title: string;
  years: string;
  paragraphs: string[];
  image?: BioImage;
  quote?: { text: string; source: string };
};

export type Biography = {
  slug: string;
  lede: string;
  chapters: BioChapter[];
  timeline: { year: string; event: string }[];
  furtherReading: { label: string; url: string; note: string }[];
  library: string;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

const franklin: Biography = {
  slug: "franklin",
  lede:
    "Benjamin Franklin was a Boston candle maker's son with two years of schooling who became the best known American of his century: a printer who retired at forty-two, an experimenter who showed that lightning is electricity, a founder of libraries, fire companies, a hospital and a university, and the diplomat who brought France into the American war. He also wrote the most read memoir in American letters, and most of what he says on this site comes from it.",
  chapters: [
    {
      id: "boston",
      title: "A tallow chandler's son",
      years: "1706 to 1723",
      paragraphs: [
        "Franklin was born on Milk Street in Boston on January 17, 1706, the youngest son of Josiah Franklin, who made soap and candles, and Abiah Folger. He was the fifteenth of his father's seventeen children. Josiah meant him for the church and sent him to the grammar school at eight, then thought better of the expense. Franklin's schooling ended when he was ten.",
        "He cut wicks and filled candle moulds in his father's shop, hated it, and talked of going to sea. To keep him ashore his father bound him at twelve as an apprentice to his older brother James, a printer. The printing house gave him what school had not: books. He borrowed them from booksellers' apprentices and read at night so they could be returned in the morning.",
        "He taught himself to write by taking apart essays from the Spectator. He made short notes on each sentence, set the essay aside for a few days, then tried to write it again in his own words and compared the two. At sixteen he slipped a series of letters under the printing house door, signed by an invented widow named Silence Dogood. James printed fourteen of them in the New-England Courant before he learned who wrote them.",
        "The brothers quarrelled, and James sometimes beat him. In 1723, at seventeen, Franklin sold some of his books for passage money and left Boston in secret.",
      ],
      image: {
        src: "/biography/franklin/birthplace.webp",
        width: 620,
        height: 719,
        alt: "Engraving of a small wooden house on Milk Street in Boston",
        caption: "The house on Milk Street, Boston, where Franklin was born. The building burned long before photography; this view was engraved from earlier drawings.",
        credit: "From King's Handbook of Boston (Moses King, 1881). Public domain.",
        sourceUrl: commons("Benjamin Franklin Birthplace.JPG"),
      },
    },
    {
      id: "philadelphia",
      title: "Philadelphia and London",
      years: "1723 to 1730",
      paragraphs: [
        "He reached Philadelphia dirty, tired and nearly out of money, bought three large rolls, and walked up Market Street eating one with the other two under his arms. A young woman named Deborah Read saw him from her father's door and thought he looked ridiculous. Seven years later she became his wife.",
        "He found work with a printer named Samuel Keimer. The governor of Pennsylvania, Sir William Keith, took a liking to him and promised letters of credit to buy a press and type in London. Franklin sailed in 1724. The letters did not exist. He was eighteen and stranded, and he spent a year and a half working in two London printing houses, where the other men called him the Water American because he drank water while they drank beer.",
        "He came home in 1726, and on the voyage wrote out a plan for how he meant to conduct his life. In 1728 he and a partner opened their own printing house. The next year he bought a failing newspaper, the Pennsylvania Gazette, and made it the most read paper in the colonies. In 1730 he bought out his partner and entered a common-law marriage with Deborah Read, whose first husband had run off and could not be proved dead.",
        "He called the wrongs of these years his errata, a printer's word for the mistakes listed at the back of a book: spending money a friend had trusted to him, neglecting Deborah while he was in London, a pamphlet he came to regret.",
      ],
      quote: {
        text: "So convenient a thing it is to be a reasonable creature, since it enables one to find or make a reason for everything one has a mind to do.",
        source: "Autobiography, Part One (written 1771)",
      },
      image: {
        src: "/biography/franklin/printer.webp",
        width: 1400,
        height: 804,
        alt: "Painting of Franklin in a leather apron at a hand press, with other printers at work",
        caption: "Franklin at the press. He signed himself \"B. Franklin, Printer\" to the end of his life.",
        credit: "Charles E. Mills, Franklin the Printer, about 1914. Library of Congress. Public domain.",
        sourceUrl: commons("Franklin the printer.jpg"),
      },
    },
    {
      id: "printer",
      title: "The printer and the projector",
      years: "1727 to 1748",
      paragraphs: [
        "In 1727 Franklin gathered a dozen tradesmen into a club called the Junto. They met on Friday evenings to debate questions of morals, politics and natural philosophy, and to ask one another what they had lately seen that might be useful. Most of his public projects started as a paper read to the Junto.",
        "The first was a subscription library in 1731, since books were costly and the members wanted more than any one of them owned. Then a volunteer fire company in 1736, a learned society in 1743, an academy that became the University of Pennsylvania, and in 1751 a hospital. His method was the same each time: propose the idea as coming from \"a number of friends\", raise subscriptions, and let others take the credit.",
        "Around 1733 he drew up a plan to reach what he called moral perfection. He listed thirteen virtues, ruled a little book with a column for each day, and gave one week of close attention to each virtue in turn, marking every fault with a black spot. He never got there, and said so. Order defeated him entirely. He judged that the attempt had still made him better and happier than he would otherwise have been.",
        "Poor Richard's Almanack, which he published every year from 1732 to 1757, sold about ten thousand copies a year and made him prosperous. He set up former journeymen as printers in other colonies and took a share of their profits. In 1748, at forty-two, he handed the running of the business to his partner David Hall and stopped working for money.",
        "It is part of the record that his newspaper carried advertisements for the sale of enslaved people, and that from the 1730s his own household held enslaved servants.",
      ],
      quote: {
        text: "Human felicity is produc'd not so much by great pieces of good fortune that seldom happen, as by little advantages that occur every day.",
        source: "Autobiography, Parts Three and Four (written 1788 to 1790)",
      },
      image: {
        src: "/biography/franklin/fireplace.webp",
        width: 529,
        height: 573,
        alt: "Engraved diagram of the parts of an iron fireplace",
        caption: "The Pennsylvania fireplace, from Franklin's own 1744 pamphlet. He was offered a patent and declined it, on the ground that we should be glad to serve others by our inventions as we are served by theirs.",
        credit: "Benjamin Franklin, An Account of the New Invented Pennsylvanian Fire-Places, 1744. Public domain.",
        sourceUrl: commons("Franklin - Pennsylvania Fireplace.png"),
      },
    },
    {
      id: "electricity",
      title: "Electricity",
      years: "1746 to 1753",
      paragraphs: [
        "Retirement was meant to buy time for study. In 1746 Franklin saw some electrical demonstrations, was sent a glass tube by his London correspondent Peter Collinson, and soon was doing little else. He reported what he found in letters to Collinson, which were published in London in 1751 as Experiments and Observations on Electricity and translated across Europe.",
        "He proposed that electricity was a single fluid that bodies held in excess or deficit, and gave those states the names we still use: positive and negative. He also coined battery, charge and conductor in their electrical senses. He noticed that pointed metal drew off electrical fire silently, guessed that lightning was the same thing on a large scale, and proposed an experiment to prove it.",
        "French experimenters carried out his proposal in May 1752. That June, not yet knowing of their success, he tried it himself with a silk kite in a thunderstorm and drew sparks from a key. The practical result was the lightning rod, which he described in Poor Richard for 1753 and never sought to profit from.",
        "The Royal Society gave him its Copley Medal in 1753. Harvard and Yale gave him honorary degrees the same year, and the University of St Andrews made him a doctor in 1759. From then on the boy who left school at ten was Dr. Franklin.",
      ],
      image: {
        src: "/biography/franklin/kite.webp",
        width: 920,
        height: 1230,
        alt: "Painting of Franklin raising his hand to a key on a kite string beneath storm clouds",
        caption: "A romantic view of the kite experiment, painted a quarter century after his death. The real experiment was done quietly, with only his son William present.",
        credit: "Benjamin West, Benjamin Franklin Drawing Electricity from the Sky, about 1816. Philadelphia Museum of Art. Public domain.",
        sourceUrl: commons("West - Benjamin Franklin Drawing Electricity from the Sky (ca 1816).jpg"),
      },
    },
    {
      id: "public",
      title: "Public man",
      years: "1751 to 1775",
      paragraphs: [
        "He was elected to the Pennsylvania Assembly in 1751 and made joint deputy postmaster general for the colonies in 1753, a post in which he made the mail faster and, for the first time, profitable. In 1754, as war with France approached, he printed a woodcut of a snake cut in pieces over the words \"Join, or Die\" and carried a plan for a union of the colonies to a congress at Albany. Neither the colonies nor London would have it.",
        "In 1757 the Assembly sent him to London to argue its case against the Penn family, who owned the province and refused to let their lands be taxed. Apart from two years at home he stayed until 1775, in time acting as agent for Massachusetts, Georgia and New Jersey as well. He loved London and for years hoped the empire could be held together.",
        "In 1766 he was examined before the House of Commons on the Stamp Act and answered 174 questions so clearly that the act was repealed within weeks. In January 1774, after he had sent home letters showing the governor of Massachusetts urging a harder line, he was made to stand silent for an hour in a room called the Cockpit while the solicitor general abused him before the Privy Council. He was dismissed from the post office the next day.",
        "Deborah, who feared the sea and never joined him, died in Philadelphia in December 1774. He had not seen her for ten years. He sailed home in March 1775 and landed to the news of Lexington and Concord.",
      ],
      image: {
        src: "/biography/franklin/join-or-die.webp",
        width: 1400,
        height: 1009,
        alt: "Woodcut of a snake cut into eight labelled pieces above the words Join, or Die",
        caption: "\"Join, or Die\", from the Pennsylvania Gazette of May 9, 1754, usually counted the first American political cartoon.",
        credit: "Benjamin Franklin, 1754. Library of Congress. Public domain.",
        sourceUrl: commons("Benjamin Franklin - Join or Die.jpg"),
      },
    },
    {
      id: "revolution",
      title: "Revolution",
      years: "1775 to 1776",
      paragraphs: [
        "The day after he landed, Pennsylvania chose him as a delegate to the Second Continental Congress. He was sixty-nine, by far the oldest member, and sat on committees for the post, for gunpowder, for a mission to Canada and for almost everything else.",
        "In June 1776 Congress named him to the committee of five charged with drafting a declaration of independence. Jefferson wrote it. Franklin, laid up with gout, made a few small changes; by long tradition the change from truths that are \"sacred and undeniable\" to truths that are \"self-evident\" was his.",
        "Independence cost him his son. William Franklin, whom he had raised and taken to London, was the royal governor of New Jersey and stayed loyal to the Crown. He was arrested in 1776. Father and son met once more, briefly, in 1785, and were never reconciled.",
      ],
      image: {
        src: "/biography/franklin/declaration.webp",
        width: 1400,
        height: 1867,
        alt: "Painting of Franklin, Adams and Jefferson reading over a draft among scattered papers",
        caption: "Franklin, John Adams and Thomas Jefferson going over the draft of the Declaration. An imagined scene, painted in 1900.",
        credit: "Jean Leon Gerome Ferris, Writing the Declaration of Independence, 1776. Library of Congress. Public domain.",
        sourceUrl: commons("Writing the Declaration of Independence 1776 cph.3g09904.jpg"),
      },
    },
    {
      id: "france",
      title: "Paris",
      years: "1776 to 1785",
      paragraphs: [
        "Congress sent him to France in the autumn of 1776 to ask for money, arms and an alliance. He was already famous there as the man who had tamed lightning. He put aside his wig, wore a plain coat and a fur cap, and let Paris take him for a backwoods philosopher. His face appeared on medallions, snuffboxes and rings.",
        "After the American victory at Saratoga he signed treaties of alliance and commerce with France on February 6, 1778. French money, troops and ships decided the war. For seven more years he kept the loans coming, managed quarrelsome colleagues, ran a small press at his house in Passy, and wrote the light pieces he called bagatelles for his friends.",
        "With John Adams and John Jay he negotiated the peace with Britain, signed in Paris on September 3, 1783. He was seventy-seven. Around this time he had his spectacle maker cut two pairs of lenses in half and mount them in one frame, so he could see both his dinner and the people across the table. He went home in 1785.",
      ],
      image: {
        src: "/biography/franklin/france.webp",
        width: 1400,
        height: 1023,
        alt: "Print of Franklin in a plain dark coat among richly dressed courtiers at Versailles",
        caption: "Franklin received at the French court in 1778, in a plain coat among the silks. A nineteenth century print, more legend than record, but true to the part he played.",
        credit: "Anton Hohenstein, Franklin's Reception at the Court of France, 1778, printed in the 1860s. Library of Congress. Public domain.",
        sourceUrl: commons("Franklin's reception at the court of France, 1778. Respectfully dedicated to the people of the United States LCCN2004669623.jpg"),
      },
    },
    {
      id: "last-years",
      title: "Last years",
      years: "1785 to 1790",
      paragraphs: [
        "Philadelphia met his ship with cannon and bells and elected him president of Pennsylvania's executive council three years running. In 1787, at eighty-one, he was carried to the Constitutional Convention in a sedan chair. He spoke little. On the last day he had a speech read for him asking every member who still had objections to doubt a little of his own infallibility and sign.",
        "He had held enslaved people for most of his adult life. In his last years he changed course in public. In 1787 he became president of the Pennsylvania society for the abolition of slavery, and in February 1790 he signed its petition asking the first Congress to end slavery and the slave trade. When a Georgia congressman defended slavery, Franklin, three weeks from death, published a parody in which an Algerian official uses the same arguments to justify enslaving Christians.",
        "He worked on his memoirs until he could no longer hold a pen. They stop in 1757, before the Revolution and before France. He died at home on April 17, 1790, aged eighty-four. About twenty thousand people followed the coffin to Christ Church burial ground.",
      ],
      quote: {
        text: "I should have no objection to a repetition of the same life from its beginning, only asking the advantages authors have in a second edition to correct some faults of the first.",
        source: "Autobiography, Part One (written 1771)",
      },
    },
  ],
  timeline: [
    { year: "1706", event: "Born on Milk Street, Boston, January 17." },
    { year: "1718", event: "Apprenticed to his brother James, a printer." },
    { year: "1722", event: "Writes the Silence Dogood letters at sixteen." },
    { year: "1723", event: "Runs away to Philadelphia." },
    { year: "1724", event: "Sails for London on Governor Keith's empty promise." },
    { year: "1727", event: "Forms the Junto." },
    { year: "1729", event: "Buys the Pennsylvania Gazette." },
    { year: "1730", event: "Marries Deborah Read." },
    { year: "1731", event: "Founds the Library Company of Philadelphia." },
    { year: "1732", event: "First Poor Richard's Almanack." },
    { year: "1736", event: "Founds the Union Fire Company. His son Francis dies of smallpox, aged four." },
    { year: "1743", event: "Proposes the American Philosophical Society." },
    { year: "1748", event: "Retires from business at forty-two." },
    { year: "1751", event: "Experiments and Observations on Electricity published in London. Elected to the Assembly." },
    { year: "1752", event: "The kite experiment." },
    { year: "1753", event: "Copley Medal. Deputy postmaster general for the colonies." },
    { year: "1754", event: "\"Join, or Die\" and the Albany Plan of Union." },
    { year: "1757", event: "To London as agent for Pennsylvania." },
    { year: "1766", event: "Examined in the House of Commons; the Stamp Act is repealed." },
    { year: "1771", event: "Begins the Autobiography." },
    { year: "1774", event: "Humiliated in the Cockpit. Deborah dies in December." },
    { year: "1775", event: "Returns home; delegate to the Continental Congress." },
    { year: "1776", event: "Signs the Declaration of Independence; sails for France." },
    { year: "1778", event: "Signs the alliance with France." },
    { year: "1783", event: "Signs the Treaty of Paris, ending the war." },
    { year: "1785", event: "Returns to Philadelphia." },
    { year: "1787", event: "Constitutional Convention. President of the Pennsylvania abolition society." },
    { year: "1790", event: "Petitions Congress against slavery in February. Dies April 17." },
  ],
  furtherReading: [
    { label: "The Autobiography of Benjamin Franklin", url: "https://www.gutenberg.org/ebooks/148", note: "His own account, free at Project Gutenberg. Start here." },
    { label: "Memoirs of Benjamin Franklin, Volume 2", url: "https://www.gutenberg.org/ebooks/40236", note: "Essays, letters and scientific papers, free at Project Gutenberg." },
    { label: "Founders Online", url: "https://founders.archives.gov/about/Franklin", note: "The US National Archives' searchable edition of his papers." },
    { label: "The Papers of Benjamin Franklin", url: "https://franklinpapers.org/", note: "The Yale edition, digitized." },
    { label: "Benjamin Franklin on Wikipedia", url: "https://en.wikipedia.org/wiki/Benjamin_Franklin", note: "A long general article with full references." },
    { label: "Benjamin Franklin on Grokipedia", url: "https://grokipedia.com/page/Benjamin_Franklin", note: "Another encyclopedia entry, for comparison." },
  ],
  library:
    "When you talk to Franklin here, each question searches 780 passages of his own writing (about 147,000 words): the whole Autobiography, 24 essays including The Way to Wealth and The Whistle, 56 letters, and 19 scientific papers. He answers from those passages and names the one he is drawing on. He cannot yet draw on his political papers or the full Yale edition, and he will say so when a question goes past what he has.",
};

const BIOGRAPHIES: Record<string, Biography> = { franklin };

export function getBiography(slug: string): Biography | undefined {
  return BIOGRAPHIES[slug];
}
