// GENERATED FILE. Do not edit by hand.
// Regenerate with: node scripts/gen-episodes.mjs
//
// Source of truth is content/episodes/<guide>/<book>.series.json, written by
// scripts/episodes-from-plan.mjs. This module exists so the website can render
// the series without reading the filesystem at request time, matching how
// src/lib/figureSources.ts is generated.

export interface Beat {
  /** hook, point1, point2, point3, close */
  role: string;
  /** estimated spoken seconds for this beat alone */
  seconds: number;
  text: string;
}

export interface Episode {
  slug: string;
  title: string;
  /** spoken words in the script */
  words: number;
  /** estimated spoken seconds at 145 wpm, see src/lib/episode.ts */
  seconds: number;
  /** the opening lines, shown as the preview */
  hook: string;
  /** the five beats, with the same timings book.movie cuts visuals on */
  beats: Beat[];
  /** repo-relative path to the script markdown */
  script: string;
  /** repo-relative path to the book.movie handoff, with per-beat timings */
  handoff: string;
}

export interface Series {
  guideSlug: string;
  guideName: string;
  bookSlug: string;
  bookTitle: string;
  episodeCount: number;
  totalSeconds: number;
  /** false when the guide has no ElevenLabs voice, so audio uses the default */
  hasMappedVoice: boolean;
  episodes: Episode[];
}

export const series: Series[] = [
  {
    "guideSlug": "franklin",
    "guideName": "Benjamin Franklin",
    "bookSlug": "autobiography-of-benjamin-franklin",
    "bookTitle": "The Autobiography of Benjamin Franklin",
    "episodeCount": 8,
    "totalSeconds": 879,
    "hasMappedVoice": true,
    "episodes": [
      {
        "slug": "three-puffy-rolls",
        "title": "Three Puffy Rolls",
        "words": 266,
        "seconds": 110,
        "hook": "I arrived in Philadelphia at seventeen with a Dutch dollar and a shilling in copper, wearing the dirtiest clothes I owned, because my good ones were coming round by sea. I was hungry. I went into a baker's and asked for three-penny worth of anything he had.",
        "beats": [
          {
            "role": "hook",
            "seconds": 19,
            "text": "I arrived in Philadelphia at seventeen with a Dutch dollar and a shilling in copper, wearing the dirtiest clothes I owned, because my good ones were coming round by sea. I was hungry. I went into a baker's and asked for three-penny worth of anything he had."
          },
          {
            "role": "point1",
            "seconds": 23,
            "text": "He gave me three great puffy rolls. I had not expected so much bread for so little money and I had no room in my pockets. So I put a roll under each arm and walked up Market Street eating the third. Picture that clearly. Filthy shirt, no lodging, no plan, bread under both arms."
          },
          {
            "role": "point2",
            "seconds": 24,
            "text": "I passed the door of Mr Read. His daughter Deborah was standing in it, and she saw me, and she thought I made a most awkward and ridiculous appearance. She was right. I certainly did. That is not modesty talking. That is my own account, written down near forty years later, when I could easily have left it out."
          },
          {
            "role": "point3",
            "seconds": 24,
            "text": "Some years afterward I married her. The woman who watched me stagger up a strange street with a roll under each arm became my wife for the rest of her life. I did not know that then. I could not have known it. I only knew I was hungry and that I needed work in the morning."
          },
          {
            "role": "close",
            "seconds": 20,
            "text": "Do not confuse your worst afternoon with your reputation. Nobody is keeping the ledger you imagine they are keeping. Walk up the street. Eat the roll. The person who sees you at your most ridiculous may turn out to be the best thing that ever happens to you."
          }
        ],
        "script": "content/episodes/franklin/three-puffy-rolls.md",
        "handoff": "content/episodes/franklin/three-puffy-rolls.handoff.json"
      },
      {
        "slug": "vegetarian-for-books",
        "title": "How I Ate Rice and Bought Books",
        "words": 278,
        "seconds": 115,
        "hook": "At sixteen I read a book by a man named Tryon recommending a vegetable diet, and I determined to go into it. Everyone around me found this irritating and I was frequently chid for my singularity. But I had not taken it up for my health, and not for my conscience either.",
        "beats": [
          {
            "role": "hook",
            "seconds": 22,
            "text": "At sixteen I read a book by a man named Tryon recommending a vegetable diet, and I determined to go into it. Everyone around me found this irritating and I was frequently chid for my singularity. But I had not taken it up for my health, and not for my conscience either."
          },
          {
            "role": "point1",
            "seconds": 26,
            "text": "My brother did not keep house, so he boarded me and his other apprentices with another family, and he paid for it. I taught myself Tryon's way of preparing a few cheap dishes, boiling potatoes and rice, making hasty pudding. Then I proposed that if he gave me half of what he paid weekly for my board, I would feed myself. He agreed instantly."
          },
          {
            "role": "point2",
            "seconds": 24,
            "text": "Here is what he did not calculate. Feeding myself on rice and potatoes cost me a good deal less than half. So I kept the difference, and the difference bought books. I also ate alone at the printing house while the others went out to dinner, which left me the shop to myself and time to read in it."
          },
          {
            "role": "point3",
            "seconds": 24,
            "text": "That is the whole method, and it is not really about food. I found one line in my own accounts where what I preferred and what was cheap happened to point the same direction, and I converted the gap into the only thing I actually wanted. Nobody had to grant me anything. I did not need better wages."
          },
          {
            "role": "close",
            "seconds": 19,
            "text": "Look through your own spending for the place where your taste and the cheap option agree. Take that difference in cash and put it into the thing that compounds. I bought my education at sixteen with money my brother believed he was spending on meat."
          }
        ],
        "script": "content/episodes/franklin/vegetarian-for-books.md",
        "handoff": "content/episodes/franklin/vegetarian-for-books.handoff.json"
      },
      {
        "slug": "errata",
        "title": "Call It an Erratum",
        "words": 251,
        "seconds": 104,
        "hook": "I was a printer by trade, and printers have a particular word for the mistakes that survive into a finished book. We call them errata. When I came to write the account of my own life, I deliberately used that same shop word for the things I had done wrong.",
        "beats": [
          {
            "role": "hook",
            "seconds": 21,
            "text": "I was a printer by trade, and printers have a particular word for the mistakes that survive into a finished book. We call them errata. When I came to write the account of my own life, I deliberately used that same shop word for the things I had done wrong."
          },
          {
            "role": "point1",
            "seconds": 20,
            "text": "I did not call them sins and I did not call them regrets. I wrote that taking unfair advantage of my brother over the indentures was one of the first errata of my life. A plain technical word, borrowed from the trade, applied on purpose to my own conduct."
          },
          {
            "role": "point2",
            "seconds": 23,
            "text": "Consider what the word actually does. A sin needs forgiveness from somebody else. A regret has no remedy at all, it only aches. An erratum is a printing error. It is factual, it is specific, it is locatable on the page, and the printer's response to finding one is not shame. It is a correction."
          },
          {
            "role": "point3",
            "seconds": 24,
            "text": "So I kept a list of mine. Not to punish myself with and not to explain away. I set down what the error was, where it happened, and what the corrected line ought to read. Some I could repair directly by paying a debt or making an apology. Some I could only record honestly and leave standing."
          },
          {
            "role": "close",
            "seconds": 17,
            "text": "Change the word and you change what you do next. Stop calling it a failure. Call it an erratum, write out the corrected line, and set the next edition. No printer burns the book because one page came out wrong."
          }
        ],
        "script": "content/episodes/franklin/errata.md",
        "handoff": "content/episodes/franklin/errata.handoff.json"
      },
      {
        "slug": "the-junto",
        "title": "Write the Rules, Not the Guest List",
        "words": 252,
        "seconds": 104,
        "hook": "In 1727 I gathered most of my ingenious acquaintance into a club for mutual improvement. We called it the Junto and we met on Friday evenings. It ran in one form or another for forty years, and very nearly everything I built in Philadelphia began in that room.",
        "beats": [
          {
            "role": "hook",
            "seconds": 20,
            "text": "In 1727 I gathered most of my ingenious acquaintance into a club for mutual improvement. We called it the Junto and we met on Friday evenings. It ran in one form or another for forty years, and very nearly everything I built in Philadelphia began in that room."
          },
          {
            "role": "point1",
            "seconds": 23,
            "text": "I did not assemble remarkable men, because I had none available. I had a glazier, a surveyor, a shoemaker, a clerk and some printers. What I did instead was write the rules. Every member, in his turn, had to bring one or more queries on Morals, Politics or Natural Philosophy for the company to discuss."
          },
          {
            "role": "point2",
            "seconds": 22,
            "text": "And once in three months each of us had to produce and read an essay of his own writing, on any subject he pleased. That is the requirement people drop when they copy the idea. A conversation club produces conversation. An essay every quarter produces work that still exists after the evening ends."
          },
          {
            "role": "point3",
            "seconds": 20,
            "text": "The strictest rule governed how we argued. Debates were to be conducted in the sincere spirit of inquiry after truth, without fondness for dispute or desire of victory. All expressions of positiveness in opinion, and all direct contradiction, were forbidden outright, and we fined the man who used them."
          },
          {
            "role": "close",
            "seconds": 19,
            "text": "If you want a room like that, do not start by recruiting impressive people. Start by writing the rules. A fixed night, a question everybody owes, something written every quarter, and a standing ban on winning. Ordinary men under good rules will outproduce brilliant men under none."
          }
        ],
        "script": "content/episodes/franklin/the-junto.md",
        "handoff": "content/episodes/franklin/the-junto.handoff.json"
      },
      {
        "slug": "the-subscription-library",
        "title": "Fifty Subscribers at Forty Shillings",
        "words": 259,
        "seconds": 107,
        "hook": "There was no good bookseller in Philadelphia and books came dear from England. I wanted to read a great deal more than I could afford to own, and so did every man in the Junto. The obvious answer was to get rich enough to buy books. I did something else instead.",
        "beats": [
          {
            "role": "hook",
            "seconds": 21,
            "text": "There was no good bookseller in Philadelphia and books came dear from England. I wanted to read a great deal more than I could afford to own, and so did every man in the Junto. The obvious answer was to get rich enough to buy books. I did something else instead."
          },
          {
            "role": "point1",
            "seconds": 22,
            "text": "First we tried the small version. Each member brought his own books into our meeting room so the whole company could use them. It answered well enough for a time, and then it did not, and we each carried our books home again. That failure is the useful part of the story."
          },
          {
            "role": "point2",
            "seconds": 22,
            "text": "So I set on foot my first project of a public nature, a subscription library. I drew up the proposals, had them put into proper form by Brockden the scrivener, and with the help of my friends procured fifty subscribers at forty shillings each to begin with, and ten shillings a year after that."
          },
          {
            "role": "point3",
            "seconds": 22,
            "text": "Fifty men who could not afford a library apiece now had one between them. We afterwards obtained a charter and increased the company to a hundred. That became the mother of all the North American subscription libraries, and it did more for the general conversation of this country than anything I ever printed."
          },
          {
            "role": "close",
            "seconds": 20,
            "text": "You are very likely trying to afford something alone that you could arrange to share. Count the people near you with the same want. Draw up the proposal. Fifty subscribers at forty shillings built the first public library in America, and not one of us was a rich man."
          }
        ],
        "script": "content/episodes/franklin/the-subscription-library.md",
        "handoff": "content/episodes/franklin/the-subscription-library.handoff.json"
      },
      {
        "slug": "out-of-sight",
        "title": "Put Yourself Out of Sight",
        "words": 266,
        "seconds": 110,
        "hook": "When I first went round proposing the library, my applications were often refused, and I began to notice the reason. People do not resist a good project nearly so much as they resist the man who appears to want the credit for it. So I took myself out of the proposal.",
        "beats": [
          {
            "role": "hook",
            "seconds": 21,
            "text": "When I first went round proposing the library, my applications were often refused, and I began to notice the reason. People do not resist a good project nearly so much as they resist the man who appears to want the credit for it. So I took myself out of the proposal."
          },
          {
            "role": "point1",
            "seconds": 24,
            "text": "I stopped presenting the library as my own idea. I put myself as much as I could out of sight and stated it as the scheme of a number of friends, who had asked me to go about and propose it to such people as they judged to be lovers of reading. That was the only thing I changed."
          },
          {
            "role": "point2",
            "seconds": 22,
            "text": "My affair went on a great deal more smoothly from that day forward. I practised the same method ever after on every public thing I attempted, and from frequent success I can heartily recommend it. This is not modesty. It is a calculation about what other men's vanity does when it collides with yours."
          },
          {
            "role": "point3",
            "seconds": 23,
            "text": "The little sacrifice of your own vanity gets amply repaid later. If it stays uncertain for a while whose idea it was, someone vainer than you will step forward and claim it, and then even envy becomes useful, because the room will pluck those borrowed feathers off him and hand them back to their owner."
          },
          {
            "role": "close",
            "seconds": 19,
            "text": "Decide which you actually want, the credit or the thing built. You may well have both, but not in that order. Put yourself out of sight, call it the scheme of a number of friends, and let the work get adopted. The feathers find their way home."
          }
        ],
        "script": "content/episodes/franklin/out-of-sight.md",
        "handoff": "content/episodes/franklin/out-of-sight.handoff.json"
      },
      {
        "slug": "certainly-undoubtedly",
        "title": "I Stopped Saying Certainly",
        "words": 271,
        "seconds": 112,
        "hook": "I was a fierce arguer as a young man and tolerably good at it. I won a great many disputes and persuaded almost nobody. Around the time I began the project of my own improvement I gave up the habit of speaking with certainty, and I never took it up again.",
        "beats": [
          {
            "role": "hook",
            "seconds": 21,
            "text": "I was a fierce arguer as a young man and tolerably good at it. I won a great many disputes and persuaded almost nobody. Around the time I began the project of my own improvement I gave up the habit of speaking with certainty, and I never took it up again."
          },
          {
            "role": "point1",
            "seconds": 21,
            "text": "I made a rule against particular words. When I advanced anything that might possibly be disputed, I would not say certainly, or undoubtedly, or use any other word that gives an opinion the air of being already settled. I took them out of my speech entirely and kept them out."
          },
          {
            "role": "point2",
            "seconds": 25,
            "text": "In their place I said that I conceive a thing to be so, or I apprehend it to be so, or it appears to me at present to be so. When a man asserted something I judged an error, I denied myself the pleasure of contradicting him flatly, and began instead by granting that in certain cases he would be right."
          },
          {
            "role": "point3",
            "seconds": 22,
            "text": "The change felt like a loss and was not one. Conversations stopped being contests. When I was wrong I got corrected early and cheaply, before the error had cost me anything. When I was right, people came round to it without first having to be beaten, which is the reason they stayed there."
          },
          {
            "role": "close",
            "seconds": 23,
            "text": "You are not trying to be right in the room. You are trying to be right in the end, and to bring people with you when you are. Take certainly and undoubtedly out of your mouth for one week. You will lose a few arguments and win a good deal more of what you were after."
          }
        ],
        "script": "content/episodes/franklin/certainly-undoubtedly.md",
        "handoff": "content/episodes/franklin/certainly-undoubtedly.handoff.json"
      },
      {
        "slug": "thirteen-virtues",
        "title": "Thirteen Virtues",
        "words": 283,
        "seconds": 117,
        "hook": "You want to become a better person. Most people wish for it, and stop at the wishing. I tried to engineer it. At twenty years of age, with little money and less schooling, I conceived a bold and arduous project of arriving at moral perfection. Not a sermon. A system.",
        "beats": [
          {
            "role": "hook",
            "seconds": 21,
            "text": "You want to become a better person. Most people wish for it, and stop at the wishing. I tried to engineer it. At twenty years of age, with little money and less schooling, I conceived a bold and arduous project of arriving at moral perfection. Not a sermon. A system."
          },
          {
            "role": "point1",
            "seconds": 24,
            "text": "I listed thirteen virtues: Temperance, Silence, Order, Resolution, Frugality, Industry, Sincerity, Justice, Moderation, Cleanliness, Tranquility, Chastity, and Humility. Not thirteen goals for someday. Thirteen daily practices. I made a little book, a page for each virtue, and marked every failure with a black spot. The book was plain. The rule was plain. The honesty was the hard part."
          },
          {
            "role": "point2",
            "seconds": 26,
            "text": "I focused on one virtue per week, and cycled through the list four times a year. Order gave me the most trouble. My papers would not stay in their places, and my schedule slipped, again and again. I never achieved perfection. I stopped pretending I would. But I was a better man for the attempt, and that was the only score that mattered."
          },
          {
            "role": "point3",
            "seconds": 26,
            "text": "The method matters more than the scorecard. You do not need my thirteen. Take three habits that would change your year if you kept them. Write them down where you will see them. Review them every evening. Mark the misses without drama and without excuses. Improvement is a science, not a mood. Track it, or you are only daydreaming in better language."
          },
          {
            "role": "close",
            "seconds": 21,
            "text": "Well done is better than well said. An investment in knowledge pays the best interest only when knowledge becomes conduct. Begin tonight, not on Monday. One virtue. One page. One honest mark. That is how a printer's apprentice, with two years of school, remakes himself into a man worth knowing."
          }
        ],
        "script": "content/episodes/franklin/thirteen-virtues.md",
        "handoff": "content/episodes/franklin/thirteen-virtues.handoff.json"
      }
    ]
  }
];

/** Every series for a given book slug. */
export function getSeriesForBook(bookSlug: string): Series | undefined {
  return series.find((s) => s.bookSlug === bookSlug);
}

/** Every series featuring a given guide. */
export function getSeriesForGuide(guideSlug: string): Series[] {
  return series.filter((s) => s.guideSlug === guideSlug);
}

/** Total watchable runtime across the shelf, in seconds. */
export function totalRuntime(): number {
  return series.reduce((n, s) => n + s.totalSeconds, 0);
}

/** "14m 39s" */
export function formatRuntime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return s + "s";
  return m + "m " + String(s).padStart(2, "0") + "s";
}
