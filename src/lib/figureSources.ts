// GENERATED FILE, do not edit by hand.
// Regenerate after changing content/knowledge/ or the slug map.
//
// Maps each figure to the corpus episodes that document them, carrying the
// one-line principle and the Key lessons digest for each. This is the
// grounding the chat route injects so a figure's [Source: ...] citations
// point at real files in content/knowledge/ instead of being invented.
// Figures with no corpus episode are marked coverage: "none" so the app
// can be honest rather than hallucinate a citation.

export interface FigureSource {
  /** Repo-relative path, e.g. content/knowledge/founders/003-how-rockefeller-worked.md */
  file: string;
  title: string;
  show: string;
  subject: string;
  /** The book or company the episode draws on, used in the citation. */
  sourceBook: string;
  youtube: string;
  /** One line, under 140 chars: the lesson this episode teaches. */
  principle: string;
  keyLessons: string[];
}

export type Coverage = "full" | "partial" | "none";

export interface FigureCoverage {
  coverage: Coverage;
  sources: FigureSource[];
}

export const figureSources: Record<string, FigureCoverage> = {
  "rockefeller": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/founders/003-how-rockefeller-worked.md",
        title: "How Rockefeller Worked",
        show: "Founders Podcast",
        subject: "John D. Rockefeller",
        sourceBook: "John D.: The Founding Father of the Rockefellers by David Freeman Hawke",
        youtube: "https://www.youtube.com/watch?v=M_TiZJapSLw",
        principle: "Stack advantages into a flywheel: know your numbers, own your biggest cost, keep the deepest war chest, and turn competitors into partners.",
        keyLessons: [
          "Know your numbers like a poet knows words: Rockefeller inspected every line of every bill and thought like an owner before he was one, because \"the good ones know more\": success is an issue of effort and information, not talent.",
          "Find your highest-priority cost and build an edge there: transportation cost more than refining, so he sited refineries next to both rail and water and extracted secret railroad rebates that rivals accepted as fixed: \"all is not as it seems on the outside.\"",
          "Keep the deepest war chest: retain profits instead of paying dividends, borrow aggressively to grow (\"the greatest borrower I ever saw\"), and buy crude in huge lots at the bottom, \"we must try and not lose our nerve when the market gets to the bottom.\"",
          "Stack advantages into a flywheel: raise money to grow output, use size to win transportation rebates, use profits to buy competitors, and repeat, so each advantage makes the next one possible.",
          "Cooperate and control rather than compete: turn beaten rivals into willing, semi-autonomous partners (\"you cannot have a winning cooperation except by willing partners\"), building a company of founders instead of just crushing them.",
          "Change your mind when the facts change: after fighting pipelines with every weapon \"but violence,\" Rockefeller embraced them, even reversing his own rebate game to pay subsidies, because \"you cannot fight a technological phenomenon.\" And never sell the stock: \"let it feed upon itself.\"",
        ],
      },
      {
        file: "content/knowledge/founders/004-john-d-rockefeller-38-letters-rockefeller-wrote-to-his-son.md",
        title: "John D  Rockefeller: 38 Letters Rockefeller Wrote to His Son",
        show: "Founders Podcast",
        subject: "John D. Rockefeller",
        sourceBook: "The 38 Letters from J.D. Rockefeller to His Son by John D. Rockefeller",
        youtube: "https://www.youtube.com/watch?v=wLWBzHbD9jg",
        principle: "Belief comes before ability: destiny is determined by your actions, not your origins, build what you're proud of and never make excuses.",
        keyLessons: [
          "Belief comes before ability: the advice Rockefeller repeats most is relentless self-belief, \"as long as you work hard enough you will succeed\", because your destiny is determined by your actions, not your origins.",
          "Struggle is an asset, not a handicap: great fortunes were built by people who succeeded because of, not in spite of, poverty, since hardship forges rare survival skills, while privileged children fail (\"shirtsleeves to shirtsleeves in three generations\") for lack of them.",
          "Be proud of what you build, not what you consume: \"a truly happy person is one who is able to enjoy his creation,\" and those who only take without giving lose their happiness, which is why he hid his wealth and drilled frugality and struggle into his children.",
          "Treat competition as war and rely on yourself: \"I do not meet competition, I destroy competitors,\" attacking a rival like Benson from every direction at once, \"crutches cannot replace strong and powerful feet.\"",
          "Create your own luck and turn enemies into assets: \"luck is the remnant of design,\" so we make our own luck; and like Alexander sparing Porus, a defeated but formidable rival is worth recruiting rather than destroying.",
          "Choose optimism as a discipline: Rockefeller aimed to be a \"dangerous optimist,\" training his mind to respond positively even in bad situations, because \"what destiny gives us is not the wine of disappointment but the cup of opportunity.\"",
        ],
      },
      {
        file: "content/knowledge/founders/019-rockefellers-autobiography.md",
        title: "Rockefeller's Autobiography",
        show: "Founders Podcast",
        subject: "John D. Rockefeller",
        sourceBook: "Random Reminiscences of Men and Events (by John D. Rockefeller)",
        youtube: "https://www.youtube.com/watch?v=seMvuxRct1Q",
        principle: "Be brutally honest with your numbers, keep a fortress of cash, and compound first-class decisions with partners you keep for decades.",
        keyLessons: [
          "**Once something works, shut up about it.** \"Bad boys move in silence.\" Secrecy covered all of Rockefeller's operations: \"I wonder what general ever sends out a brass band in advance with orders to notify the enemy.\"",
          "**Build a permanent team of A-players; hire talent as found, not as needed.** Rockefeller kept the same core partners for decades because, as Larry Ellison said, \"you do not want turnover on your core team; that knowledge compounds.\"",
          "**Argue frankly until agreement is unanimous.** \"Hear patiently and discuss frankly until the last shred of evidence is on the table.\" When one partner dug in, Rockefeller offered to personally fund the project and absorb the loss, which instantly dissolved his resistance (\"a check separates conviction from conversation\").",
          "**Keep a fortress of cash.** \"We were accustomed to prepare for financial emergencies long before we needed the funds.\" He always moved into battle backed by abundant cash and won bidding contests because his war chest was deeper.",
          "**Know your numbers, and be honest with yourself.** Competitors kept books so poorly \"they did not actually know when they were making money or when they were losing money.\" Real efficiency comes from knowing your facts.",
          "**Build first-class from day one and let it compound.** Flagler insisted on solid refineries, \"building as though the trade was going to last.\" Standard developed \"step by step\" over 35 to 40 years.",
          "**Narrow your focus and serve.** Standard did only oil; Slootman's \"amp it up\" echo is that narrowing focus increases resourcing on the one priority. And \"money comes naturally as a result of service\", so avoid needlessly duplicating existing industries and create the new instead.",
        ],
      },
    ],
  },
  "steve-jobs": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/founders/007-steve-jobs-in-his-own-words-make-something-wonderful.md",
        title: "Steve Jobs In His Own Words (Make Something Wonderful)",
        show: "Founders Podcast",
        subject: "Steve Jobs",
        sourceBook: "Make Something Wonderful: Steve Jobs in His Own Words (The Steve Jobs Archive)",
        youtube: "https://www.youtube.com/watch?v=zGEOQ6I2Sv4",
        principle: "Life is short and the world is malleable, so impose rigor on yourself and make something wonderful that advances human progress.",
        keyLessons: [
          "The world is malleable: Jobs's core conviction was that reality can be reshaped; his gift was seeing \"what was not there, what could be there, what had to be there\" and then setting out to remedy it.",
          "Impose rigor on yourself first: his unbelievable standards were applied first and most strenuously to his own work, before he ever imposed them on anyone else.",
          "Solve the real constraint, then fund it creatively: the Apple I took ~50 hours to hand-build, so they switched to printed circuit boards to cut it to about an hour; Jobs sold his VW bus and Wozniak his HP calculator, and Jobs financed the first Byte Shop order on 30-day supplier credit, making the (barefoot) sale before he even had the parts.",
          "Start your own thing when the incumbents say no: Jobs pitched HP and Atari and both passed (Nolan Bushnell called turning down ~30% of Apple his biggest regret), so they simply started the company themselves.",
          "Learn from mentors and the eminent dead: Jobs sought out Robert Noyce, who mentored young founders to \"restock the stream I fish from\"; so few people can learn from the experience of others, and life is far easier if you can.",
          "There is always something worth saving: returning to an Apple that had just lost $800 million, Jobs saw \"something here worth saving\" and stayed driven by his lifelong mission to \"put something back into the pool of human experience.\"",
        ],
      },
      {
        file: "content/knowledge/founders/020-how-steve-jobs-kept-things-simple.md",
        title: "How Steve Jobs Kept Things Simple",
        show: "Founders Podcast",
        subject: "Steve Jobs",
        sourceBook: "Insanely Simple: The Obsession That Drives Apple's Success (by Ken Segall)",
        youtube: "https://www.youtube.com/watch?v=Mf8MZ8Iy8sE",
        principle: "Wield simplicity as a weapon: blunt talk, small teams, one message per idea, and attack markets full of complex, second-rate products.",
        keyLessons: [
          "**Carry a simple stick.** If an idea was not distilled to its essence, Steve rejected it; if you made two versions of anything, he hit you with the simple stick until there was one. Humans naturally over-complicate, so the leader must eliminate complexity at its source.",
          "**Blunt communication is the simplest communication.** \"Your TV work is great, your print work is [bad]\" tells you exactly what to do. Direct talk makes your standards easy to understand, and it requires putting the quality of the work above being liked.",
          "**Organize like a startup: small groups of smart people.** No committees, one owner per area, and the ultimate decision-maker touches everything. Steve threw non-essential spectators out of meetings; \"simplicity's best friend is small groups of smart people.\"",
          "**The further you get from one, the more complexity you invite in.** One message per ad (Lee Clow's five-paper-balls demo), one product with one button (\"burn\"), one focus per quarter. More things asked of an audience means less remembered.",
          "**Simple is fast.** Trust lets you move fast: Steve canceled a 20-agency search and just called Lee Clow. Like Herb Kelleher's \"we're shooting it next Wednesday,\" if you're too slow, narrow the scope, simplify, and up the intensity.",
          "**Editing your thinking is an act of service.** \"I would have written you a shorter letter but I didn't have the time.\" People find more words confusing, so boil the idea to its essence and use a picture instead of a deck.",
          "**The Hearst principle: attack markets full of second-rate products.** One of Steve's greatest talents was spotting markets full of complex, second-rate products. Cross out everything competitors do, force yourself to find a simpler path (iPod managed in iTunes), and you can leap ahead.",
        ],
      },
    ],
  },
  "jeff-bezos": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/founders/013-lessons-from-jeff-bezoss-shareholder-letters.md",
        title: "Lessons from Jeff Bezos's Shareholder Letters",
        show: "Founders Podcast",
        subject: "Jeff Bezos",
        sourceBook: "Jeff Bezos's Amazon shareholder letters (collected in Invent and Wander: The Collected Writings of Jeff Bezos)",
        youtube: "https://www.youtube.com/watch?v=zt9e6vVBdP4",
        principle: "Obsess over customers and think in decades; patient invention compounds into free cash flow and a franchise rivals cannot copy.",
        keyLessons: [
          "**Customer obsession beats competitor obsession.** Amazon publishes ~14 leadership principles, but David notes they collapse into one: obsess over customers. Bezos studied Akio Morita and Sony and made customer needs, not rivals, the fixed point everything else optimizes around.",
          "**Run the flywheel and say so out loud.** A lower cost structure lets you lower prices, which drives growth, which spreads fixed costs over more sales, which lowers unit costs and funds still more price cuts. Bezos wrote the loop into the letters and added: 'Please expect us to repeat this loop.'",
          "**Long-term orientation is the cheat code.** 'Seek instant gratification and chances are you'll find a crowd there ahead of you.' Because Amazon was willing to work patiently for years and to be misunderstood, it could pursue solutions competitors wouldn't attempt.",
          "**Go against the math when the math is short-term.** Price-elasticity data only predicts this week and this quarter; Bezos lowered prices anyway, judging that returning efficiency and scale economies to customers compounds into far more free cash flow over five and ten years.",
          "**High standards are teachable, and mostly about scope.** A great six-page memo is less about talent than expectation: it takes a week of writing, sharing, setting aside, and re-editing. 'They're trying to perfect a handstand in just two weeks, and we're not coaching them right.'",
          "**Marry the right kind of business.** Bezos looked for four traits, customers love it, it can grow very large, it has strong returns on capital, and it is durable over decades. 'When you find one of these, get married.'",
        ],
      },
    ],
  },
  "elon": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/founders/001-how-elon-works.md",
        title: "How Elon Works",
        show: "Founders Podcast",
        subject: "Elon Musk",
        sourceBook: "Elon Musk by Walter Isaacson",
        youtube: "https://www.youtube.com/watch?v=aStHTTPxlis",
        principle: "Run Elon's algorithm on everything: question every requirement, delete relentlessly, then simplify, accelerate, and automate last.",
        keyLessons: [
          "Run the algorithm in order: question every requirement (each must carry the name of a real person, never a department), delete the part or process, simplify, accelerate the cycle, and automate last, automating or speeding up something that shouldn't exist is the classic mistake.",
          "Cost is the master metric: the word \"cost\" appears 158 times in the book, and the \"idiot index\" (a part's finished cost versus its raw-material cost) exposes where design or process is adding waste to be stripped out.",
          "Go to the problem physically: fly to the source, stand on the factory floor, and never separate yourself from the pain of your decisions, product managers who can't build are \"cavalry generals who don't know how to ride a horse.\"",
          "Be hardcore and put the mission first: Elon set insane deadlines, slept under his desk, and would rather offend or intimidate than let camaraderie slow the mission, \"it's not your job to make people on your team love you.\"",
          "Showmanship is salesmanship: from the fake server tower at Zip2 to Tesla's product theater, one dramatic demonstration transfers belief, because \"the money flows as a function of the stories.\"",
          "If a design is hard to manufacture at volume, the design is flawed, and \"if a timeline is long, it's wrong\": simplify and delete until physics, not the org chart, sets the limit.",
        ],
      },
      {
        file: "content/knowledge/founders/009-how-elon-thinks.md",
        title: "How Elon Thinks",
        show: "Founders Podcast",
        subject: "Elon Musk",
        sourceBook: "The Book of Elon: Elon Musk's Most Useful Ideas in His Own Words by Eric Jorgenson",
        youtube: "https://www.youtube.com/watch?v=nqiuSshC9GA",
        principle: "Reason from physics and first principles, not analogy; be useful, delete relentlessly, and endure the pain the mission demands.",
        keyLessons: [
          "Be useful: measure your life by how many useful things you get done, and judge any product by its utility improvement over the state of the art multiplied by how many people it affects.",
          "Reason from first principles, not analogy: break a problem down to its axiomatic physical truths (a battery's raw materials cost ~$80/kWh, not the assumed $600) and build up from there.",
          "Attack cost with the “idiot index”, the ratio of a finished part's cost to its raw-material cost; a high ratio means the waste is yours to engineer away.",
          "Run the algorithm in strict order: make requirements less dumb, delete the part or process, simplify, accelerate, then automate, never accelerate or automate something that should have been deleted.",
          "The only true currency is time: a maniacal sense of urgency, speed as both offense and defense, and leading from the front line are how you win.",
          "Attract great people and remove organizational boundaries: a company is the vector sum of the people in it, and errors in your org structure always show up in the product.",
        ],
      },
    ],
  },
  "jensen-huang": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/founders/002-how-jensen-works.md",
        title: "How Jensen Works",
        show: "Founders Podcast",
        subject: "Jensen Huang",
        sourceBook: "The Nvidia Way by Tae Kim",
        youtube: "https://www.youtube.com/watch?v=Sywq2Ua4GXw",
        principle: "War on complacency: keep the organization flat, criticize in public so everyone learns, and torture yourself and your team into greatness.",
        keyLessons: [
          "Design the company around yourself, not around best practice: Jensen chose a flat structure (60 direct reports, no one-on-ones, no COO) so information travels fast and people who can't act without being told what to do wash out: \"strategy is not words, strategy is action.\"",
          "Complacency kills: treat success as the enemy (\"we're 30 days from going out of business\"), refuse to dwell on wins, and benchmark work against the \"speed of light\", the physical maximum, rather than competitors or last year.",
          "Criticize in public: Jensen gives feedback in front of everyone so the whole organization learns from a single person's mistake: \"we are not optimizing for not embarrassing somebody, we're optimizing for the company learning.\"",
          "Get information from the edge: the \"Top 5\" email forces every level to report their five priorities and what they see in the market, letting Jensen intercept weak signals (like early machine learning) before they surface in the numbers.",
          "Create markets instead of fighting for share: build where \"there are no customers and therefore no competitors\" (the \"$0 billion market\"), which produces pricing power, Nvidia is the rare chip company whose average selling prices rise over time.",
          "Swarm your greatest opportunity for decades: Jensen bet on CUDA and AI for twenty years, absorbing an 80% stock crash and a gross-margin drop from 45% to 35%, and educated the market himself (free machines, a textbook, hundreds of talks) until it became the standard.",
        ],
      },
    ],
  },
  "peter-thiel": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/founders/008-peter-thiel-on-how-to-build-a-creative-monopoly.md",
        title: "Peter Thiel on How to Build a Creative Monopoly",
        show: "Founders Podcast",
        subject: "Peter Thiel",
        sourceBook: "Zero to One: Notes on Startups, or How to Build the Future by Peter Thiel and Blake Masters",
        youtube: "https://www.youtube.com/watch?v=b9tB9Q1XOM0",
        principle: "Go from zero to one by building a creative monopoly no one can copy, not by competing in an existing market; think for yourself.",
        keyLessons: [
          "Ask the contrarian question: \"What important truth do very few people agree with you on?\" Great companies are built on secrets, valuable truths found in unexpected places that most people have stopped looking for.",
          "Competition is for losers: competitive markets destroy profits, so the aim is to build a monopoly by being uniquely great at something new, not to fight over an existing market.",
          "Reject the post-dot-com dogmas: against \"make incremental advances, stay lean, improve on the competition, don't focus on sales,\" Thiel argues the opposites are more correct: risk boldness over triviality, a bad plan beats no plan, competitive markets destroy profits, and sales matters as much as product.",
          "Be the last mover, not the first: first-mover advantage is a tactic, not a goal; what matters is generating and dominating future cash flows, so the real question is \"will this business still be around a decade from now?\"",
          "Practice definite optimism: like Jobs, make definite multi-year plans rather than listening to focus groups; the future is better than the present only if you plan and work to make it so.",
          "Founders matter, so tolerate the strange ones: companies that create new technology resemble feudal monarchies led by singular founders, and a great founder brings out the best work in everyone, so be more tolerant of founders who seem extreme. (Also: Thiel's law, a startup messed up at its foundation cannot be fixed.)",
        ],
      },
    ],
  },
  "warren-buffett": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/berkshire-shareholder-letters.md",
        title: "Berkshire Hathaway Shareholder Letters, 1977-2024",
        show: "Berkshire Hathaway",
        subject: "Warren Buffett",
        sourceBook: "Berkshire Hathaway Shareholder Letters, 1977-2024 by Warren E. Buffett",
        youtube: "https://www.berkshirehathaway.com/letters/letters.html",
        principle: "Think like an owner, protect the ability to continue, and allocate each dollar where its long-term economics are strongest.",
        keyLessons: [
          "Treat a security as fractional ownership of a business: understand the economics, demand favorable long-term prospects, and partner with honest and competent managers.",
          "Translate accounting into owner earnings by subtracting the capital required to maintain the business's volume and competitive position.",
          "Test retained earnings by whether each retained dollar creates at least one dollar of additional long-term market value.",
          "Stay inside a clearly bounded circle of competence; its size matters less than knowing where it ends.",
          "Prefer a wonderful business at a fair price because time compounds strong economics and exposes weak ones.",
          "Treat market quotations as offers, not instructions: Mr. Market serves the owner but should never guide the owner's judgment.",
          "Maintain a financial fortress with ample liquidity and little dependence on counterparties, leverage, or markets being open at the right moment.",
          "Correct mistakes promptly. A reasonable batting average is possible; delaying an obvious correction is the cardinal sin.",
        ],
      },
    ],
  },
  "charlie-munger": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/berkshire-shareholder-letters.md",
        title: "Vice Chairman's Thoughts: Past and Future",
        show: "Berkshire Hathaway",
        subject: "Charles T. Munger",
        sourceBook: "Berkshire Hathaway 2014 Shareholder Letter by Charles T. Munger",
        youtube: "https://www.berkshirehathaway.com/letters/2014ltr.pdf",
        principle: "Build a rational corporate system around trustworthy people, decentralized operations, centralized capital allocation, and very little debt.",
        keyLessons: [
          "Keep operating subsidiaries autonomous and headquarters tiny, while centralizing only capital allocation and the selection of the chief executive.",
          "Place able, trustworthy managers where they can stay for decades; autonomy and deserved trust attract more of the same people.",
          "Prefer good businesses at fair prices and retain earnings only when they can create more than a dollar of value per dollar retained.",
          "Use cash for acquisitions when practical, avoid excessive debt, and preserve the ability to act when rare opportunities arrive.",
          "Avoid acquisition departments and bureaucratic processes whose incentives create activity instead of good judgment.",
          "Reserve substantial unstructured time for reading and thinking, then act decisively when a rare, intelligible opportunity appears.",
        ],
      },
      {
        file: "content/knowledge/founders/011-400-pages-of-warren-buffett-and-charlie-munger-in-their-own-.md",
        title: "400 Pages of Warren Buffett and Charlie Munger In Their Own Words",
        show: "Founders Podcast",
        subject: "Warren Buffett and Charlie Munger",
        sourceBook: "Buffett and Munger Unscripted: Three Decades of Investment and Business Insights from the Berkshire Hathaway Shareholder Meetings by Alex Morris",
        youtube: "https://www.youtube.com/watch?v=t47NBQqlzbk",
        principle: "Think in opportunity costs, concentrate on a few wonderful businesses you understand, and let focus and compounding do the work.",
        keyLessons: [
          "Make decisions by opportunity cost: intelligent people think in terms of their alternatives, so you only act on something better than what you already have, which “simplifies life a great deal.”",
          "Concentrate, don't diversify: the whole secret of investment is finding the few places where it is safe and wise to not diversify, then “going in heavy”, while keeping a fortress of cash for the rare times “it rains gold.”",
          "Study extreme examples and ask “what in the hell is going on here?”, Munger calls this the way to wisdom (e.g., how State Farm became a top-three U.S. net worth starting from no capital).",
          "Learning means changing behavior, not memorizing: their costliest mistakes were of omission: selling Disney and Intel (Noyce) too early, and never buying Google or Amazon despite seeing the evidence firsthand at Geico.",
          "Work with talented fanatics and keep headquarters lean: find the “.400 hitters” and don't tell them how to swing; bloat and float ruin businesses, not downsizing.",
          "Build or own a business that is natural to you with a durable brand and mind-share: owning See's taught them the power of brands, which is what later led them to Coca-Cola.",
        ],
      },
      {
        file: "content/knowledge/founders/015-li-lu-and-charlie-munger-and-warren-buffett.md",
        title: "Li Lu and Charlie Munger and Warren Buffett",
        show: "Founders Podcast",
        subject: "Li Lu",
        sourceBook: "Li Lu's lectures, interviews, and writings (incl. his foreword to Poor Charlie's Almanack)",
        youtube: "https://www.youtube.com/watch?v=8TnhiapOfpE",
        principle: "Do one thing you love well, then concentrate: buy wonderful businesses cheaply and bet big on your few best ideas, the way Munger taught.",
        keyLessons: [
          "**The whole career in two steps: study Buffett and Munger, then do that.** Munger pulled Buffett from buying fair businesses at wonderful prices toward wonderful businesses at fair prices; Li Lu followed the identical path after Munger became his partner and lifelong mentor.",
          "**A stock is fractional ownership of a real business.** Li Lu does the primary-source work, reading every page, visiting the stores, talking to managers (as with Timberland), until he understands the business well enough to earn a genuine margin of safety.",
          "**Think in opportunity costs, then concentrate.** Measure every decision against your best available alternative; do that and you will not over-diversify. Wise investors bet heavily and rarely, pouring time and capital into their few best ideas.",
          "**Intrinsic passion is the durable edge.** 'If you could ever find something you can do well that you really like, this will be your best investment.' Intense interest in a subject, Munger's phrase, is indispensable to excellence and compounds enormous value over time.",
          "**Reject the Wall Street way of thinking.** Munger told Li Lu that his problems were practically all of Wall Street's problems; abandoning that mindset and reorganizing his firm around ownership and patience is what finally removed his worries.",
          "**Play the long game in life, not just in markets.** At fifty, Li Lu still loves the game and stays fresh by making younger friends as new teachers, echoing Norman Lear: 'I'm always the same age as the people I talk to.'",
        ],
      },
    ],
  },
  "marc-andreessen": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/003-marc-andreessen-the-world-is-more-malleable-than-you-think.md",
        title: "Marc Andreessen: The World Is More Malleable Than You Think",
        show: "David Senra Interview Show",
        subject: "Marc Andreessen",
        sourceBook: "Andreessen Horowitz, Netscape",
        youtube: "https://www.youtube.com/watch?v=qBVe3M2g_SA",
        principle: "The world is far more malleable than it looks, determined founders thinking from first principles can bend reality to their will.",
        keyLessons: [
          "The world is far more malleable than you think: pursue something with maximum effort, drive and energy and the world recalibrates around you. Jim Clark was the \"ultra version,\" reinventing himself from a \"self-described loser at 38\" into the founder of three billion-dollar companies.",
          "Zero introspection: great founders don't dwell on the past (introspection and therapy are a modern manufactured construct), and low neuroticism, not getting emotionally fazed, is a superpower.",
          "Founders beat managers (the core thesis): managers can run a status quo (\"soup is soup\") but can't adapt to change, while founders can learn to run at scale, \"you're much more likely to build something important by starting with a founder and training them on management than the reverse.\" Incumbent, manager-run institutions are collapsing because they can't adapt.",
          "Interrogate inherited assumptions from first principles: every industry accumulates unquestioned practices that \"made sense in 1970 or 1930.\" CAA beat incumbents by moving the 9am staff meeting to 7am and calling not just its own clients but rivals' clients, \"mediocrity is invisible until passion shows up and exposes it.\"",
          "Barbell / \"death of the middle\": across relationship businesses (investment banks, private equity, talent agencies) the middle gets stretched like taffy, win as a light solo operator or a scaled platform, never the mushy middle. a16z built scaled venture because startups had shifted from selling \"tools\" to competing directly in incumbent industries (Airbnb, Uber, Tesla).",
          "Every new technology triggers the same moral panic (\"it will ruin society and the children\") (bicycle face, jazz, comic books, the Walkman, hip-hop, the internet) and inventors are often the worst predictors of their own technology's use (Edison thought the phonograph was for recorded sermons).",
          "Elon's management method, which Marc calls a new school: go straight to the source of truth (the engineer), countering the IBM \"big gray cloud\" where twelve management layers each lied upward until the CEO knew nothing. Map the company as a production line, find the single weekly bottleneck, and personally fix it: \"maneuver warfare\" cycle time of hours, not months.",
        ],
      },
    ],
  },
  "tobi-lutke": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/011-tobi-l-tke-21-years-of-building-shopify.md",
        title: "Tobi Lütke: 21 Years of Building Shopify",
        show: "David Senra Interview Show",
        subject: "Tobi Lütke",
        sourceBook: "Shopify",
        youtube: "https://www.youtube.com/watch?v=ZSM2uFnJ5bs",
        principle: "Don't cosplay orthodoxy: build from your own axioms and intuition; differentiation, not imitation, is the only path to excellence.",
        keyLessons: [
          "A company is social technology, a socially acceptable \"excuse\" to go all-in and run the counterfactual to the world you see, means-tested by the market (and self-financing when the market pulls the real product out of your project).",
          "Stop cosplaying. Imitation caps you, so engineer the company from your own axioms: Shopify OS models the org with a SAT solver / desired-state system, making tradeoffs legible (50 more salespeople = fewer engineers) and removing politics.",
          "Hire for spikiness, not well-roundedness (Ogilvy: talent lives among \"non-conformist dissenters\"). Seek high-agency \"founders\" and put these wonderfully discontent \"irritants\" on top: don't cocoon them in \"founder daycare.\"",
          "Rivalry, not competition, mimicry never reaches excellence (Agassi/Sampras). \"Make it different, even if it's worse\" (Dyson, Edwin Land): from a blank slate you own the first version and can iterate past a copied 7/10 (the SpaceX Raptor evolution as a team masterpiece by subtraction).",
          "Create environments, don't prescribe. No \"corporate babyproofing\"; change the environment so the right thing is intuitive, then trade accountability for autonomy through prototype→build \"phase transitions.\" The way you do anything is how you do everything, down to Norman doors.",
          "Change your identity deliberately. The brain is a \"retrospective narrative alignment mechanism,\" so affirmations and message-in-a-bottle spaced repetition genuinely work; and change your mind the moment better information arrives, consistency isn't the job.",
          "Control costs and build a company worth working for. He built a $200B company in his wife's childhood bedroom (his father-in-law once covered payroll); talent takes care of itself because there aren't many truly great companies, so tie every person's work back to the mission.",
        ],
      },
    ],
  },
  "todd-graves": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/019-how-todd-graves-built-raising-canes.md",
        title: "How Todd Graves Built Raising Cane's",
        show: "David Senra Interview Show",
        subject: "Todd Graves",
        sourceBook: "Raising Cane's",
        youtube: "https://www.youtube.com/watch?v=B5rRIdQKB0A",
        principle: "Do one thing better than anyone and keep control of your baby; the distracted never beat the focused, and money follows service.",
        keyLessons: [
          "**Focus isn't simple: it's what lets you obsess over every detail.** A single product means Cane's can perfect the bird's species and weight, a 24-hour brine, crinkle fries (with the black sugar-tips removed), pull-apart bread, and tea sourced from three countries, the \"cravability\" that drives repeat business. Cutting quality to save a penny is \"death by a thousand cuts\" in a business that makes ~10 cents on the dollar.",
          "**The distracted don't beat the focused.** Competitors add items, LTOs, and 100 sauces; Cane's keeps a 2:35 drive-thru where \"every two seconds faster is a point on sales\" (~$60M on $6B). \"Frequency beats variety\", people don't want the homework of a giant menu; \"do one thing and do it better than anybody else\" (the In-N-Out model, same menu since 1948).",
          "**Bad advice is fuel.** He got the worst grade in his business class (the concept \"won't work\") and was rejected by every bank, \"the best thing an aspiring entrepreneur can be told is 'I don't think you can do that.'\" \"Nothing ever happens unless someone pursues a vision fanatically.\"",
          "**How bad do you actually want it?** To fund the first store he worked 95-hour boilermaker weeks, hitchhiked to Alaska, and fished sockeye salmon on a boat where men were scalped and boats sank, \"I wasn't thinking about salmon, I was thinking about my chicken finger dream.\" He and his partner swore a campfire oath: \"retreat is not an option.\"",
          "**Never sell; keep control and stay in the details.** Private equity \"takes founders out of the deal,\" and a founder treats the business as personal (\"it's your baby\"), Trader Joe's Joe Coulombe and Kinko's Paul Orfalea both publicly regretted selling. Delegation is a myth: \"you don't delegate: you hire great people, supplement them up to a 95, then back off only once they exceed you,\" and \"if we lose the details we lose everything\" (Disney).",
          "**Purpose over money; money follows service.** \"God made me good at chicken fingers to help people\" (75,000 crew). Be sales-driven, not profit-driven, \"sales cures all woes\", because \"money comes naturally as a result of service\" (Henry Ford). The business must be \"natural\" to the creator, not merely authentic (his co-founder left because fry-cooking didn't turn him on).",
          "**Survival is the win: turn disasters into assets.** Over-levered with subordinated debt at 28 stores, Katrina knocked out 21 of them; he rallied the team, reopened in New Orleans 30 days after the storm as the only restaurant in town, and swore never to over-lever again. He ran the same playbook in COVID (three drive-thru lanes): \"victory in our industry is spelled survival\" (Jobs).",
        ],
      },
    ],
  },
  "brad-jacobs": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/012-how-brad-jacobs-built-8-billion-dollar-companies.md",
        title: "How Brad Jacobs Built 8 Billion-Dollar Companies",
        show: "David Senra Interview Show",
        subject: "Brad Jacobs",
        sourceBook: "QXO, XPO, United Rentals, United Waste",
        youtube: "https://www.youtube.com/watch?v=3WXZg4_xcGs",
        principle: "Treat problems as opportunities, get the major trend right, hire people smarter than you, and repeat one disciplined playbook everywhere.",
        keyLessons: [
          "Problems are opportunities and workloads, embrace them and run to the fire. A relentlessly positive inner monologue is a real advantage, one Jacobs rebuilt through two years of cognitive therapy after perfectionism drove him into clinical depression.",
          "Get the major, long-term trend right (his mentor Ludwig Jesselson). For two million years that trend has been technology, so rule out industries AI/automation will soon disrupt (his Chegg call) and invest heavily in tech even in \"boring\" ones: Carnegie's steel, Walmart's $500M 1979 computer bet, Zara as \"a technology company with stores attached.\"",
          "Run the repeatable playbook: pick a large, growing, fragmented industry you can buy into at reasonable (not cheap) prices, buy well (a spread between your cost of capital and where you deploy it), then double EBITDA in 3–5 years via pricing, procurement, compensation, and technology.",
          "People are everything, the CEO's most important job is recruiting superlative people. Use the \"would I feel terror if they quit?\" test to sort A/B/C players, and screen hard for raw intelligence plus human qualities (honest, hardworking, collegial, all-in).",
          "Align incentives ruthlessly: make everyone a partner with equity that vests over five years (most in the last two). \"Show me the incentive and I'll show you the outcome\" (Munger), and always understand what actually motivates the other person.",
          "Build intense, unfiltered feedback loops. Crowdsource meeting agendas (pre-reads, not PowerPoints; rate questions 1–10, discuss only 8+), ask the frontlines \"what's the stupidest thing we do?\", and go public partly for the free, brutal advice of the smartest allocators.",
          "Be absolutely brutal with your time, WATWAM (\"waste of time, waste of money\"). Run every decision through two levers (grow the top line faster than the market and expand margins), then go all in, because you only get one shot at life.",
        ],
      },
    ],
  },
  "john-mackey": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/023-john-mackey-44-years-of-building-whole-foods.md",
        title: "John Mackey: 44 Years of Building Whole Foods",
        show: "David Senra Interview Show",
        subject: "John Mackey",
        sourceBook: "Whole Foods Market",
        youtube: "https://www.youtube.com/watch?v=U8zqsiePKsg",
        principle: "Build as a missionary, not a mercenary: never fight the low-cost rival on price, compound in your niche, and turn competitors into allies.",
        keyLessons: [
          "**Missionary vs. mercenary co-founders: buy out the mercenary.** His first partner, Mark, wanted to keep one profitable store and \"not screw it up\"; Mackey wanted to change how America eats. That philosophical mismatch was irreconcilable, so he bought Mark out. \"Missionary founders make better, longer-term decisions.\" (He notes Rockefeller called buying out his early partners one of the best decisions of his life.)",
          "**Never fight the low-cost provider on price.** Conventional supermarkets made \"the drastic mistake of trying to compete on price\" with Walmart (sterile warehouse stores, cheap lighting, labor cut to the bone) and still lost. Whole Foods went the opposite way: quality, service, beautiful stores, differentiated mix. Compete on a different axis entirely.",
          "**Compound quietly while rivals are distracted.** The supermarkets were \"hypnotized by Walmart\" and ignored Whole Foods for 20–25 years (until Columbus Circle opened in 2004). That neglect was the gift: \"We were running downfield wide open for the touchdown pass\", time to scale and compound before anyone copied him. (No patents in retail; scale was the only moat.)",
          "**VCs are \"hitchhikers with credit cards.\"** Useful to get somewhere you couldn't reach alone, but they play a blockbuster/exponential game and pressure founders to scale too fast, often wrecking a perfectly good business. Once Whole Foods went public and had its own capital, \"they got out of the car.\"",
          "**Turn rivals into a network of \"secret allies.\"** Mackey sought out the handful of other natural-foods pioneers, flew to meet them, and built the Natural Foods Network: missionaries who literally traded financial statements and information, made each other better, each owned a geographic niche so they never competed head-on, and many of whom he ultimately acquired.",
          "**Grow by acquisition to buy a geographic platform.** Building a team cold in a new region is slow and expensive; instead he bought a small existing chain (six or seven stores) in LA, Boston, DC, Florida, and North Carolina to get an instant team and local know-how, then expanded from that platform.",
          "**De-risk the pitch with working prototypes, and watch costs hardest in the good times.** Studying Mrs. Gooch's (doing ~10x SaferWay's sales by adding fresh meat and produce) revealed the scale opportunity and let him tell investors \"it's working in LA, Boston, San Diego, why won't it work in Austin?\" He told David that if Founders had existed when he was young, Whole Foods might still be independent: he'd have prioritized cost control, since booms make everyone stop watching spend.",
        ],
      },
    ],
  },
  "jimmy-iovine": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/006-jimmy-iovine-building-interscope-records-beats-by-dre.md",
        title: "Jimmy Iovine: Building Interscope Records & Beats by Dre",
        show: "David Senra Interview Show",
        subject: "Jimmy Iovine",
        sourceBook: "Interscope Records, Beats by Dre",
        youtube: "https://www.youtube.com/watch?v=niqahsc9jfo",
        principle: "Marketing is empathy at scale; win by attaching yourself to the very best people and telling them the brutal truth.",
        keyLessons: [
          "**Marketing is empathy.** \"Understanding what somebody else is feeling on a massive scale\"; make the product great enough and the product itself becomes the marketing, the way Steve Jobs did it.",
          "**Bet your career on proximity to the best.** Iovine deliberately engineered and produced for Lennon, Springsteen, Petty, Bono, and Dr. Dre, absorbing world-class standards by being in the room.",
          "**Brutal honesty is an edge.** People wanted Jimmy in the room because he would tell them the truth no one else would.",
          "**Serve the customer the incumbents abandoned.** Beats grew from noticing the music industry had stopped serving its own customers, so they vertically integrated culture, fashion, and hardware to reach them.",
          "**Know when you can't scale alone.** He sold Beats Music to Apple because streaming demanded capital and scale he couldn't match against Spotify; control gave way to the right partner.",
          "**Fear and obsession are fuel, but they cost you.** \"The bend in the pipe\" drives the work, yet the tortured path exacts a price, so peace, therapy, and knowing what \"enough\" is matter.",
          "**Chase great, not famous.** Fame has replaced greatness as the culture's currency, and that is a trap.",
        ],
      },
    ],
  },
  "daniel-ek": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/009-daniel-ek-spotify-david-senra.md",
        title: "Daniel Ek, Spotify | David Senra",
        show: "David Senra Interview Show",
        subject: "Daniel Ek",
        sourceBook: "Spotify",
        youtube: "https://www.youtube.com/watch?v=qiXH0y2V3_8",
        principle: "Optimize for impact over happiness; happiness is a trailing indicator of impact, and greatness requires building a company true to yourself.",
        keyLessons: [
          "Optimize for impact over happiness, happiness trails impact. The Dara Khosrowshahi/Uber story crystallizes it: \"Since when is life about happiness? It's about impact.\"",
          "Belief comes before ability. Ek says he doesn't know he's \"good,\" only that he's \"different\" and has an insane belief he can get good if he works hard enough (the Morita/Sony-in-firebombed-Tokyo parallel).",
          "Knowing yourself is the hardest and most important founder skill; advice is useless unless it's tied to who you are. There are many founder archetypes: Ek's is \"coach, not player,\" with a collaborative style, not a Jobs-style dictator.",
          "Build a \"seamless web of deserved trust\" (Munger). Trust is one of the greatest economic forces because it compounds but doesn't scale; surround yourself with people who tell you the truth, the \"mirror\" (Sony hired a paid critic who became president).",
          "Practice extreme intellectual humility. Ek cold-calls leaders and shadows them (he sat through a week of Zuckerberg's meetings, took notes, offered to get coffee) to absorb the culture firsthand and learn what he doesn't know.",
          "The value of a company is the sum of all problems solved (his co-founder Martin's line). Focus on the problem, not the solution; money comes as a result of service (Henry Ford), so hunt for the biggest problems worth a decade of your life.",
          "Manage energy, not time. There are no morning-ritual rules; know your own rhythm. Judge people on their best idea, not their worst (\"high-temperature\" people preserve creativity), and treat quality as less, focus, and the aspiration toward an impossible perfection.",
        ],
      },
    ],
  },
  "evan-spiegel": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/018-evan-spiegel-snapchat-building-a-multi-billion-dollar-compan.md",
        title: "Evan Spiegel, Snapchat: Building a Multi-Billion Dollar Company",
        show: "David Senra Interview Show",
        subject: "Evan Spiegel",
        sourceBook: "Snap Inc. (Snapchat)",
        youtube: "https://www.youtube.com/watch?v=Sr6n-9mzYnk",
        principle: "No moat exists in software, so invest only in what is hard to copy: network effects, owned hardware, and a clear product vision.",
        keyLessons: [
          "**There is no moat in software, so invest in what is hard to copy.** Facebook's Poke clone was the wake-up call; ever since, Snap has built network effects, the AR/lens platform, a creator ecosystem, and owned hardware, \"we've been engaged in trench warfare with monopolies for 15 years.\" The corollary: AI is \"the best thing that's ever happened to Snapchat\" because it erases the resource gap against rivals with \"infinite resources but no new ideas.\"",
          "**Network-effect value isn't node count, it's whether the people you actually talk to are on it.** \"You don't need 500 friends on Snapchat, you just need your best friend\"; one close friend can be half your communication, which let Snapchat accrue value fast against far larger networks.",
          "**Vision is seeing the product before it exists.** \"If I can't see it, then we're off track.\" Like Land and Jobs staring at an empty table, he practices \"technology in service of a product vision\", organizing the team to invent whatever the vision requires, rather than chasing a technology. It's why Snap bet on AR while everyone else bet on VR, and shipped vertical video and Spectacles years early.",
          "**The hard part is delivery and consistency, not the vision.** \"A lot of people have different visions for the future… the hard part is delivering it.\" Stories went unused for the first six months before exploding; determination and consistency separated Snap from everyone who merely \"saw\" the future.",
          "**Kind is not nice.** Snap's values are \"kind, smart, creative,\" and kind comes first: \"nice is about making people feel good; kind is about wanting the best for them,\" which requires hard feedback. Fear \"is almost the opposite of creativity,\" so a kind culture is the most fertile ground for it.",
          "**The best way to have a good idea is to have lots of ideas.** Weekly design reviews churn through hundreds of concepts of which fewer than 1% ship; \"the most toxic thing is people attached to an idea.\" Focus is his \"primary role\", and to surface problems he stole Walmart's Friday \"In It to Win It\" meeting so any leader can raise a broken \"shopping-cart ball bearing\" company-wide.",
          "**The motive is control and creation, not money.** He sold ~$10M of stock early so \"money was no longer a consideration,\" then refused multi-billion-dollar offers at 22 because selling meant compromising the vision: \"you should never sell your best idea.\" Reframe stress as opportunity (Herb Kelleher: \"I don't handle it, I like it\"), and be your own \"explainer chief,\" because the founder is \"the guardian of the company's soul.\"",
        ],
      },
    ],
  },
  "james-dyson": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/founders/014-the-stubborn-genius-of-james-dyson.md",
        title: "The Stubborn Genius of James Dyson",
        show: "Founders Podcast",
        subject: "James Dyson",
        sourceBook: "Against the Odds and Invention: A Life of Learning Through Failure (James Dyson's two autobiographies)",
        youtube: "https://www.youtube.com/watch?v=hagy0fhiPpY",
        principle: "Demand difference and retain total control, then out-persist everyone: determination, not cleverness, is what builds a real breakthrough.",
        keyLessons: [
          "**Difference for the sake of it, plus retention of total control.** Dyson's whole philosophy in one line: invent, engineer, prototype, manufacture, market, and sell it yourself; take no shareholders and never assign your patents. He learned it the hard way after losing his first invention, the Ballbarrow, by giving up control.",
          "**Persistence, not brilliance, is the engine.** 'Aim not to be clever but to be dogged.' A clever person doesn't build 5,127 prototypes over 14 years of crushing debt; a determined one does. 'There is no such thing as a quantum leap, only dogged persistence, and in the end you make it look like a quantum leap.'",
          "**Use history as fuel.** Dyson studied engineer-heroes like Brunel, Frank Whittle, Soichiro Honda, and Alec Issigonis, both for design ideas and to steady himself through struggle, even writing his own encyclopedia, A History of Great Inventions.",
          "**Sell with one clear message.** A consumer can barely absorb one new idea, let alone several (Lee Clow's paper-ball demo for Steve Jobs makes the same point). Appeal to a specific need rather than an all-purpose product, and tell the story of how it's made, Dyson's 'story leaflet' hung on every machine.",
          "**Hire unsullied, determined people over experienced ones.** 'Experience tells you how things should be done'; when pioneering, that's a hindrance. Dyson hires young graduates with open minds and screens for determination, like Ross, who carried every brick for his house down a slope by hand.",
          "**Chase intrinsic excellence and stay permanently dissatisfied.** Markets for genuinely differentiated, excellent products are larger than anyone predicts (Sony sold 400M Walkmans). Never sacrifice quality for speed, and keep improving, because 'it can always be better.'",
        ],
      },
      {
        file: "content/knowledge/interviews/004-james-dyson-5-127-prototypes.md",
        title: "James Dyson: 5,127 Prototypes",
        show: "David Senra Interview Show",
        subject: "James Dyson",
        sourceBook: "Dyson",
        youtube: "https://www.youtube.com/watch?v=Se64B8TKfjA",
        principle: "Progress comes from doggedness, not cleverness, treat failure as the most interesting teacher and iterate relentlessly until it works.",
        keyLessons: [
          "Failure is more interesting than success: failure forces you to ask \"why did it go wrong?\", whereas success you never examine. You have to enjoy failure to improve things: his 5,127 vacuum prototypes over roughly eleven years were \"a hugely enjoyable struggle.\"",
          "Naivety is an asset: the experienced person knows why not to do something, but the naive young engineer thinks harder because they don't know it's \"impossible.\" Back the person who \"wants it the most,\" not the most experienced. He founded a university that hires paid 17- and 18-year-olds for their naive questions.",
          "Distrust experts and pursue difference for its own sake: Ford said filling your competitors' ranks with experts is the best sabotage because \"they know so much about why something won't work.\" Dyson's organizing principle is \"it has to be different\": he'd \"be different even if it was worse,\" though it also has to end up better.",
          "The entrenched professional resists longer than the independent consumer: retailers laughed at his products while consumers bought them by mail, and incumbents rejected the bagless cyclone partly because they earned $500M a year on bags. He turned every reasonless rejection into fuel: \"these guys don't want to change, so I'm going to make it work.\"",
          "Protect the fragile early idea and back your intuition against everyone, intuition isn't guesswork but thousands of absorbed experiences synthesized into a decision you can't fully rationalize, and everyone (partners, friends) will try to blow the idea away.",
          "Build with your own hands and change one variable at a time: engineers who build and test their own prototypes gain a \"visceral\" understanding a spreadsheet can't give, and changing fifteen things at once means you never learn which one mattered.",
          "Focus is the one trait that separates these people: \"concentrate on one thing at a time,\" choose the single most important thing and accept that some things won't get done. He refuses to sell motors to other companies (guaranteed money) rather than split his engineers' focus, \"life is for living, not for making money\", and holds that \"I aim not to be clever but to be dogged.\"",
        ],
      },
    ],
  },
  "brian-armstrong": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/interviews/024-brian-armstrong-when-washington-tried-to-kill-coinbase.md",
        title: "Brian Armstrong: When Washington Tried to Kill Coinbase",
        show: "David Senra Interview Show",
        subject: "Brian Armstrong",
        sourceBook: "Coinbase",
        youtube: "https://www.youtube.com/watch?v=WcrPOElyjiI",
        principle: "A long-term mission simplifies the hardest calls, even suing your regulator, and a founder's edge is knowing he could rebuild from scratch.",
        keyLessons: [
          "**A long-term mission simplifies the hardest decisions.** After the SEC stonewalled Coinbase (30 meetings, \"just tell us the rules,\" met only with \"go talk to your lawyer\" and then an enforcement action the next day) Coinbase did something almost no company does: it proactively sued its own regulator (under the Administrative Procedures Act). Brian knew it would scare investors short-term, but the mission made the call clear, and he'd checked that others (SpaceX vs. NASA, Palantir) had sued the government and won.",
          "**A real founder's edge is knowing he could rebuild it from scratch.** When his 2020 culture stand risked mass resignations, he was calm: \"I started it when it was just me on a laptop... I could go back to being on my laptop again if I had to.\" He cites Lee Kuan Yew's \"iron in my veins\" speech, the willingness to rebuild Singapore from nothing. That confidence is what lets a founder hold a hard line a caretaker CEO never could.",
          "**Draw a hard line on culture and accept the losses.** After 2020's unrest, Brian published a mission-first post: Coinbase focuses on economic freedom, not \"whatever the current hot social issue is,\" and politics stays out of the workplace. People begged him not to post it; he offered a generous exit package to anyone not aligned. Only ~5% left (he'd braced for 50%), the opposition was \"a very vocal 1% minority.\"",
          "**Pick something you'd do for 20 years even with little success.** Coming off side hustles (tutoring, rentals) and reading Seth Godin's \"The Dip\" and Tim Ferriss, he literally wrote on paper the one thing he'd pursue for two decades regardless of outcome, tech entrepreneurship: then sold his rental properties and moved all-in to Silicon Valley.",
          "**The best ideas come from lived pain, not theory.** A year in Argentina (watching hyperinflation gut a country that had been \"the Paris of South America,\" fallen from a top-10 economy to ~100th) plus his Airbnb job exposing broken global money movement (7–12% fees; literally wiring $100 to see how much arrived) is what made the Bitcoin white paper land as the answer.",
          "**Talk to customers and ship the smallest thing they'll actually use.** The first Coinbase app couldn't buy or sell Bitcoin, and users didn't retain. He emailed three signups; one said, \"I just don't have any Bitcoin.\" Adding a simple buy button (YC's \"talk to customers, build the product, on repeat\") is what created product-market fit: \"the boulder was rolling down the hill and you were chasing it.\"",
          "**Do the unglamorous thing to get unblocked, then raise on proof.** To open a bank account he paid $30k for a five-page legal opinion that he \"may not be a money transmitter,\" wrote the bank integration himself (FTP-ing files into an antiquated system), and got in via a YC intro to Silicon Valley Bank. When surging demand consumed his entire balance daily and the bank said \"raise money now,\" he closed a $25M round (USV and Ribbit) with a single up-and-to-the-right graph and no pitch deck.",
        ],
      },
    ],
  },
  "sam-walton": {
    coverage: "none",
    sources: [],
  },
  "naval-ravikant": {
    coverage: "none",
    sources: [],
  },
  "franklin": {
    coverage: "none",
    sources: [],
  },
  "adam-neumann": {
    coverage: "none",
    sources: [],
  },
  "alexander": {
    coverage: "none",
    sources: [],
  },
  "bob-marley": {
    coverage: "none",
    sources: [],
  },
  "deutsch": {
    coverage: "none",
    sources: [],
  },
  "lee-kuan-yew": {
    coverage: "none",
    sources: [],
  },
  "marcus-aurelius": {
    coverage: "none",
    sources: [],
  },
  "marie-curie": {
    coverage: "none",
    sources: [],
  },
  "ricky-gervais": {
    coverage: "none",
    sources: [],
  },
  "seneca": {
    coverage: "none",
    sources: [],
  },
  "vervaeke": {
    coverage: "partial",
    sources: [
      {
        file: "content/knowledge/vervaeke/001-awakening-from-the-meaning-crisis-introduction.md",
        title: "Ep. 1 - Awakening from the Meaning Crisis - Introduction",
        show: "Awakening from the Meaning Crisis",
        subject: "John Vervaeke",
        sourceBook: "Awakening from the Meaning Crisis: Introduction",
        youtube: "https://www.youtube.com/watch?v=54l8_ewcOlY",
        principle: "The meaning crisis, the mental health crisis, and cultural nihilism share one root cause, and wisdom (not belief, not a program) is the trainable cognitive skill that addresses it.",
        keyLessons: [
          "**Positive and negative cultural trends share one explanation.** The mindfulness revolution, renewed interest in Stoicism and other \"how to be a stoic\"-style wisdom traditions, psychedelic research producing dramatic treatment-resistant results, and the academic surge around \"meaning in life\" are one cluster. Rising suicide, institutional distrust, nihilism, and the popularity of zombie and superhero mythology are the other. Vervaeke argues neither cluster makes sense alone; both make sense together as symptoms of the same underlying meaning crisis.",
          "**Wisdom is not the same as intelligence, and foolishness is not the same as ignorance.** \"Ignorance is a lack of knowledge; foolishness is a lack of wisdom.\" Foolishness is when the very cognitive machinery that makes you adaptively intelligent also makes you self-destructive — the capacity for self-deception is \"endemic,\" not an occasional bug, and it rides on the same processes that make people capable in the first place.",
          "**The series is organized around three questions, repeated as the spine of the whole project:** what is meaning, why do people hunger for it, and how do you cultivate the wisdom to realize it. \"Realizing\" is used deliberately in both senses: becoming aware of meaning, and making it real.",
          "**\"Meaning\" is a metaphor borrowed from language, and the metaphor needs unpacking.** People say a life is meaningful the way a sentence is meaningful — the pieces fit together, connect you to the world, make an impact. Some of the most meaningful experiences people report are the ones they can't put into words at all, which is a clue that more than one kind of \"knowing\" is involved.",
          "**There are kinds of knowing beyond having true beliefs, and the culture has mostly forgotten them.** Knowing *how* to catch a baseball, knowing what it's like to *be* in a situation, knowing what it's like to participate in a relationship — these aren't reducible to justified true belief, but a belief-centric culture treats them as if they were, which Vervaeke ties directly to why people are so drawn to ideology as a stand-in for lost ways of knowing.",
          "**Altered states of consciousness are not a curiosity, they're a cognitive-scientific throughline.** From flow states to shamanic ritual to psychedelic-occasioned mystical experience, Vervaeke frames the human drive to alter consciousness as connected to intelligence itself, citing even non-human examples (Caledonian crows tumbling down roofs to induce dizziness) as evidence the pattern runs deeper than culture.",
          "**The historical anchor point is the Upper Paleolithic transition (~40,000 BCE)**, when representational art, calendars, and projectile weapons appear together — evidence, in Vervaeke's account, of a cognitive shift that's continuous with earlier evolution but still marks a real threshold in how humans made meaning.",
        ],
      },
      {
        file: "content/knowledge/vervaeke/036-ep-28-convergence-to-relevance-realization.md",
        title: "Ep. 28 - Awakening from the Meaning Crisis - Convergence To Relevance Realization",
        show: "Awakening from the Meaning Crisis",
        subject: "John Vervaeke",
        sourceBook: "Awakening from the Meaning Crisis: Convergence To Relevance Realization",
        youtube: "https://www.youtube.com/watch?v=Yp6F80Nx0lc",
        principle: "Categorization, memory, problem-solving, and communication all reduce to the same operation: zeroing in on what's relevant, which is a skill of intelligent ignoring, not the application of any definition.",
        keyLessons: [
          "**Even Newell and Simon fell prey to the essentialist heuristic.** Vervaeke argues they assumed \"all problems were essentially the same,\" which made problem *formulation* look trivial — but most real-world problems are ill-defined, and what's missing in an ill-defined problem is precisely the relevance realization a good formulation supplies.",
          "**The mutilated chessboard shows reframing defeats brute search.** Formulated as a \"covering strategy\" the problem explodes combinatorially; reframed as a \"parity strategy\" — noticing the two removed squares share a color — \"the solution becomes obvious.\" That shift from a bad formulation to a good one is what Vervaeke calls insight.",
          "**Categories aren't built on shared essence — Nelson Goodman's point.** Any two objects, even a bison and a lawnmower, share \"an indefinitely large number\" of true properties, so logical similarity can't explain why we group things. What we actually track is which shared properties are *relevant*, a psychological judgment, not a logical fact.",
          "**Barsalou's example makes the same point concrete.** Wife, kids, works of art, gasoline, and explosive material aren't a category — until someone says \"there's a fire,\" and suddenly \"flammable stuff is dangerous\" and they snap into one. Nothing logically shared changed; only the relevance judgment did.",
          "**Dennett's robot-and-bomb thought experiment exposes the frame problem.** A robot that only checks intended effects gets blown up; one built to also check every side effect just freezes, endlessly cataloguing irrelevant facts like the wagon's \"position... with respect to Mars.\" Vervaeke's conclusion: relevance realization \"is not the application of a definition,\" it's \"intelligently ignoring\" almost everything rather than evaluating and rejecting it.",
          "**Murray Shanahan's frame problem has a solved half and an open half.** The narrow logical/computational version is solved, Vervaeke says, but the deeper \"relevance problem\" remains — and Shanahan speculates consciousness itself may be how agents cope with it.",
          "**Grice's maxims of conversation collapse into one, via Sperber and Wilson.** Grice showed a speaker always conveys more than they say (his stranded-driver-asking-for-gas example) by way of four maxims — truth, quantity, manner, relevance. Vervaeke walks through how Sperber and Wilson's *Relevance* reduces all four to one: even \"truth\" softens to a duty of sincerity, and sincerity itself just means conveying what's relevant to the conversation, not everything in your mind.",
          "**The episode's payoff is a convergence argument, not a single new claim.** Selective attention, working memory (citing Lynn Hasher's research), long-term memory organization, problem-solving, and communication all \"feed back\" into each other, and Vervaeke closes by proposing that this same machinery — relevance realization — is what will explain insight, wisdom, and meaning as networks of relevance connection between mind and body, mind and world, and mind and itself.",
        ],
      },
      {
        file: "content/knowledge/vervaeke/090-four-kinds-of-knowing.md",
        title: "Four Kinds of Knowing and Personality, Formal Cause, and Purpose with Sam Tideman",
        show: "Voices with Vervaeke",
        subject: "John Vervaeke",
        sourceBook: "Voices with Vervaeke: Four Kinds of Knowing and Personality, Formal Cause, and Purpose with Sam Tideman",
        youtube: "https://www.youtube.com/watch?v=TrW3DOIkP78",
        principle: "The four kinds of knowing each have their own medium, standard of realness, and memory, and wisdom is getting them into right relationship rather than privileging just one.",
        keyLessons: [
          "**Each kind of knowing has its own vehicle, standard, and memory system.** Propositional knowing runs on belief and is judged by truth, drawing on semantic memory (\"you know that 2 plus 2 equals four... there's no episode associated with it\"). Procedural knowing produces skills, not beliefs, and is judged by power, stored in procedural memory. Perspectival knowing is \"knowing via consciousness\" — a state of mind matched to a situation, judged by \"presence,\" and carried in episodic memory. Participatory knowing is different in kind: it's not a belief or a state you're aware of, but who you are — an \"agent-arena\" relationship stored as the \"weird kind of memory we call our self.\"",
          "**Participatory knowing is Vervaeke's revival of the old conformity theory of knowledge** — to know something at this level is to share \"the same idos, the same structural functional organization\" with the thing known. He extends it beyond humans to animals doing niche construction, and argues character itself is participatory: \"your character is mostly unconscious to you,\" and it determines which affordances even show up for you — \"an honest person just will not see opportunities to steal.\"",
          "**Vervaeke floats a personality hypothesis, credited to guest Sam Tideman**, that people gravitate to one of the four Ps as their felt sense of \"realness\": propositional as conviction, procedural as power/empowerment, perspectival as presence, participatory as belonging or fittedness. He maps this onto real Christian disputes — Protestants arguing propositional correctness, Orthodox emphasizing correct liturgical procedure, Catholics stressing participatory apostolic succession, charismatics prizing perspectival experience — and names the resulting cross-talk \"modal confusion,\" where \"one of them is actually talking about the procedural without realizing it.\"",
          "**Isolating perspectival knowing from the others produces \"spiritual bypassing.\"** Citing Alan Wallace-style Buddhist framing that it's \"not altered states of consciousness, it's altered traits of character,\" Vervaeke warns that seeking peak experiences while skipping the procedural and participatory work that would change you is a trap: \"feeling close to God is not the same thing as growing more godlike,\" just as romantic infatuation isn't the same as \"learning to be a good spouse.\"",
          "**The deepest kind of understanding, for Vervaeke, is the coordination of all four kinds of knowing**, not mastery of any single one. He describes a long-term love relationship as the paradigm case — shared states of mind, transmitted skills, developed beliefs, and identity-binding all reinforcing each other — and argues institutions (churches included) that fail to cultivate all four \"in a developmental manner\" do their people \"a disservice,\" leaving the neglected Ps as unpoliced territory where self-deception operates.",
          "**In the second half, Vervaeke pivots to formal causation**, arguing (via Spinoza's conatus and a \"post-nominalist neoplatonist\" reading of Aristotle) that self-organizing, entropy-resisting structures — Mount Everest's shape, the Great Lakes' basin, planetary roundness — are evidence for real formal causes in nature, without needing to reintroduce full Aristotelian final causation: \"formal causes are being instantiated... in Mount Everest.\"",
          "**Pushed by Tideman on whether purpose scales all the way up to a cosmic redemptive arc, Vervaeke resists**, arguing pure pragmatism about purpose is self-undermining (\"pragmatism ultimately needs a non-pragmatic account of truth... or else you just get an infinite regress\") and that purpose is fundamentally a temporal notion that can't apply to eternity: \"God has no purpose, God can't possibly have a purpose.\" He instead lands closer to Aristotle's unmoved mover — the eternal draws everything toward it by formal, not final, causation, calling this \"vertical purpose\" working through \"horizontal purpose.\"",
        ],
      },
      {
        file: "content/knowledge/vervaeke/092-ecology-of-practices.md",
        title: "After Socrates: Episode 10a - Ecology of Practices",
        show: "After Socrates",
        subject: "John Vervaeke",
        sourceBook: "After Socrates: Episode 10a - Ecology of Practices",
        youtube: "https://www.youtube.com/watch?v=eldatUWfyfo",
        principle: "No single practice — not circling, not meditation, not text-study — cultivates wisdom on its own; they have to be deliberately sequenced and scaffolded into each other.",
        keyLessons: [
          "**The episode itself is the argument.** Instead of just claiming that practices need to combine, Vervaeke opens by telling the group \"we're going to go through a series of practices, it's a pedagogical program... designed to scaffold you into the culminating practice which is dialectic into dialogos\" — the ecology is demonstrated live, not just asserted.",
          "**Each practice is assigned a distinct job, in a fixed order.** Socratic humility comes first because it \"opened this up to wonder\" and gave \"the first taste of the vertical dimension\"; only after that does the group move into \"the horizontal dimension\" of cultivating phylia through the noticing practice — one practice can't do both at once.",
          "**The three guests each embody a different practice-lineage that had to be brought into relation with the others, not treated as sufficient alone.** Sengstock's circling is \"a kind of yoga... of the we space,\" Barrett's authentic-relating work is the interpersonal scaffolding, and Mastropietro's dialogos work grew out of diagnosing the meaning crisis in *Zombies in Western Culture* — three separate traditions Vervaeke is explicitly stitching together.",
          "**Taylor Barrett describes the design process as literal scaffolding-building**, \"taking the authentic relating, taking the circling practice... it all slots and it all fits and mov[es] up into these more complex practices\" — circling and authentic relating are treated as components to be assembled, not competing final answers.",
          "**Even the culminating practice is itself layered, not monolithic.** \"Philosophical fellowship\" — the group's structured encounter with a passage from Martin Buber — is built from sub-stages in sequence: slow reading, chanting a pivotal phrase, short speech (three sentences), engaged speech, then free speech, each deepening the group's contact with \"the sage\" beyond what the previous stage alone could reach.",
          "**Self-cultivation has to precede relational and textual work.** The sequence runs individual centering and contemplative practice first, then interpersonal noticing and curiosity exercises, and only then a shared encounter with a wisdom text — Vervaeke frames dialogue with a sage as something that \"affords\" a return to it, not a starting point you can jump to cold.",
          "**Guy Sengstock's own history shows one practice discovering its limits.** He describes circling as having \"spread all over the world quite quickly,\" but says it needed to be understood alongside dialogos and Heideggerian phenomenology before it \"linked into\" the wisdom project Vervaeke is building — popularity and depth on their own weren't the same as sufficiency.",
          "**Chris Mastropietro frames dialogos as a second stage after diagnosis, not a replacement for it.** Having spent years articulating \"the symptomology of th[e] crisis\" in written work, he describes turning next to \"this new and yet so very old practice of using dialogue\" as a further, distinct step — diagnosis and dialogic practice are separate moves in the same larger ecology.",
        ],
      },
      {
        file: "content/knowledge/vervaeke/040-spirituality-of-relevance-realization.md",
        title: "Ep. 33 - Awakening from the Meaning Crisis - The Spirituality of RR: Wonder/Awe/Mystery/Sacredness",
        show: "Awakening from the Meaning Crisis",
        subject: "John Vervaeke",
        sourceBook: "Awakening from the Meaning Crisis: The Spirituality of RR: Wonder/Awe/Mystery/Sacredness",
        youtube: "https://www.youtube.com/watch?v=_zkLevmQe90",
        principle: "Wonder and awe are not ornaments on top of cognition — they are how relevance realization discloses its own sacred, pre-conceptual ground to us.",
        keyLessons: [
          "**\"Religio\" names the ground beneath belief, not religion itself.** Vervaeke deliberately reaches for the word religio over religion, tracing it to \"Religare,\" which he glosses as \"to bind together, to bind together, to connect.\" He uses it to name the whole pre-egoic, pre-conceptual, pre-propositional machinery of relevance realization that has to already be running before concepts, beliefs, or a stable self can exist at all.",
          "**Wonder and curiosity are two different cognitive modes, not two words for the same thing.** Curiosity operates in \"the having mode\" — focused, problem-solving, aimed at \"a focal object\" (\"what is that, what does that do, how does that work\"). Wonder operates in \"the being mode,\" pulling you toward \"the gestalt\" and the \"inexhaustible[ness]\" of reality rather than any one object. As Vervaeke puts it, \"wonder isn't about solving a problem, wonder is about remembering... your being.\"",
          "**Meaning is experienced like an atmosphere, not like an object.** Building on an essay on \"secular wonder,\" Vervaeke describes ordinary experience as being \"immersed... in a bubble of meaningfulness,\" an \"atmosphere of significance and import\" that \"you participate in... you contribute to... but you did not make.\" Wonder and awe are how that atmosphere discloses itself to us, precisely because it can never be objectified or \"made a focal object.\"",
          "**The \"framing\" that makes experience possible can't itself become an object of experience.** Vervaeke's own example: he can picture \"John Vervaeke\" and an image of himself, but \"what's not there is whatever it is that's generating that... image\" — \"I can never see the eye, I'm always seeing by means of the eye.\" He calls this a genuine phenomenological mystery, and is careful to distinguish it from something being theoretically inexplicable — those are not the same claim.",
          "**Pushed too far, the same opening that produces wonder tips into horror.** The \"trajectory of trans-framing\" that generates insight after insight, and eventually wonder and awe, is not guaranteed to stabilize. If it doesn't, and is \"pushed too far,\" it becomes \"deeply meaningful in a negative sense of horror\" — wonder/awe and horror/absurdity sit on the same continuum for Vervaeke, not opposite categories.",
          "**\"Sacredness\" and \"the sacred\" are two separable claims fused together by the word religion.** One is a metaphysical proposal — grounding sacredness in \"being supernatural,\" a historically Western line he traces \"through people like Aquinas.\" The other is a psycho-existential proposal — Schleiermacher's move toward describing sacredness as a lived experience (he cites \"absolute dependence\") that doesn't itself require a supernatural claim.",
          "**Sacredness functions as a \"meta-meaning\" system, following Clifford Geertz.** Sacredness isn't one meaning system alongside law, morality, or fashion — it's the precondition that lets those systems work at all. Lose it, as in severe culture shock or what Vervaeke calls \"domicide,\" and \"none of those other meaning systems can work for you... they'll be absurd.\" Part of what sacredness does is keep \"homing us against horror.\"",
          "**But the sacred also has a transgressive pull that pure \"homing\" can't explain.** Vervaeke argues Geertz's protective function is necessary but not sufficient, pointing to Rudolf Otto's account of \"the numinous\" (from Otto's \"the idea of the holy\") as evidence the sacred also opens onto \"the transgressive side,\" capable of carrying us as far as \"the horizon of horror,\" not only toward comfort and belonging.",
        ],
      },
      {
        file: "content/knowledge/vervaeke/058-the-nature-of-wisdom.md",
        title: "Ep. 45 - Awakening from the Meaning Crisis - The Nature of Wisdom",
        show: "Awakening from the Meaning Crisis",
        subject: "John Vervaeke",
        sourceBook: "Awakening from the Meaning Crisis: The Nature of Wisdom",
        youtube: "https://www.youtube.com/watch?v=DxLogRVfBv8",
        principle: "Wisdom is not a virtue you possess but a trainable ecology of psycho-technologies that reciprocally optimize relevance realization against self-deception.",
        keyLessons: [
          "**Existing psychological theories of wisdom are \"product theories,\" not process theories.** Reviewing Grossmann's doubts theory and Sternberg's balance theory, Vervaeke's core complaint is the same in both cases: they describe the features a wise person ends up having without explaining the developmental process of becoming wise, and neither properly integrates participatory knowing — which is why neither can account for transformative experience or altered states as part of wisdom.",
          "**His own theory (with Leo Ferraro) maps wisdom onto four kinds of knowing, and he now revises how they relate.** Propositional knowing (facts), procedural knowing (skills), perspectival knowing (situational salience), and participatory knowing (identity, \"agent arena attunement\") aren't parallel — he now argues procedural knowledge grounds propositional knowledge, perspectival knowing grounds the cultivation of skill, and the whole stack is ultimately \"grounded in your participatory knowing.\"",
          "**Sophrosyne — the fourth cardinal virtue alongside wisdom, justice, and courage — is not willpower.** He contrasts \"Tom,\" who resists lying through visible self-control, with \"Susan,\" for whom lying is genuinely \"unthinkable\" — not suppressed, just absent as an option. Vervaeke sides with the view that \"Susan is more honest than Tom,\" because for her honesty has become second nature rather than a battle won.",
          "**A sage's salience landscape is inverted, not just disciplined.** Just as a child is helplessly pulled toward toys while an adult simply isn't tempted, Vervaeke argues the sage's attention naturally organizes away from self-deception and toward what's real — summarized as being \"tempted to the good\" rather than restraining oneself from the bad.",
          "**Wisdom cultivation is organized around three \"M's\": morality, meaning in life, and mastery.** Mastery here means \"a terrific capacity for caring and coping with reality,\" cashed out as rules (from propositional knowing), routines (procedural), and roles (perspectival) — all under the governance of sophrosyne.",
          "**Understanding is distinct from knowledge and even from possessing a correct explanation.** Following recent philosophy-of-understanding literature, Vervaeke argues understanding is \"grasping the significance\" of what you know — which is why a model can be literally false (the classic simplified atom diagram) and still be highly effective for understanding, because effectiveness, not truth per se, is the real standard.",
          "**Basic understanding becomes \"profound understanding\" along two axes.** Horizontally, it generates plausibility by making cross-contextual connections and applying an \"optimal grip\" to new domains; vertically, it aligns propositional, procedural, perspectival, and participatory knowing with each other — \"grounding downward\" and \"emergence upward\" at the same time.",
          "**Agnes Callard's concept of \"aspiration\" explains how you can rationally reach for values you don't yet hold.** Using her music-appreciation-class paradox — a good student already loves music for its own sake, but if they already loved it they wouldn't need the class — Vervaeke argues you need a temporary \"placeholder\" value to bridge your current self to the self you're aspiring to become, which he ties to gnosis and to why claiming to have already achieved wisdom is \"kind of a mistake.\"",
        ],
      },
    ],
  },

};

export function getFigureSources(slug: string): FigureCoverage {
  return figureSources[slug] ?? { coverage: "none", sources: [] };
}

/** Roughly 4 chars per token; the grounding block is capped well under 2k tokens. */
const MAX_GROUNDING_CHARS = 7000;

/**
 * Build the "## Your documented record" block appended to a figure's system
 * prompt. Emits the principle plus Key lessons for each mapped episode, with
 * the exact citation string to use, and returns "" when there is no coverage
 * so uncovered figures simply run on their system prompt as before.
 *
 * TODO(semantic-retrieval): this returns the whole digest for the figure,
 * which is cheap, deterministic, and cacheable. When the corpus grows past
 * what fits in the cap, swap the body of this function for a top-k retrieval
 * over embedded transcript chunks keyed on the user's question. Keep this
 * signature (slug in, prompt-ready string out) so the chat route does not
 * change; add an optional `question` param for the retrieval variant.
 */
export function buildGroundingBlock(slug: string): string {
  const { coverage, sources } = getFigureSources(slug);
  if (coverage === "none" || !sources.length) return "";

  const header = [
    "## Your documented record (cite these)",
    "",
    "The following is drawn from recorded episodes about you. Ground your answers in it.",
    "When you use one of these lessons, cite it with the exact citation line given.",
    "Never cite a source that is not listed here.",
    "",
  ].join("\n");

  let out = header;
  for (const s of sources) {
    const citation = `[Source: "${s.sourceBook}"]`;
    const head = `### ${s.title} (${s.show})\nCite as: ${citation}\nPrinciple: ${s.principle}\n`;
    if (out.length + head.length > MAX_GROUNDING_CHARS) break;
    out += head;
    for (const lesson of s.keyLessons) {
      const line = `- ${lesson}\n`;
      if (out.length + line.length > MAX_GROUNDING_CHARS) break;
      out += line;
    }
    out += "\n";
  }
  return out.trimEnd();
}
