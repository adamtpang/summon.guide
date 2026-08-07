// GENERATED FILE, do not edit by hand.
// Regenerate with: node scripts/gen-source-corpus.mjs
// Rerun after adding episodes to a channel's corpusPaths, or after
// registering a new "channel" book in books.ts.
//
// This grounds /chat/source/<slug>, chat with a channel's own corpus rather
// than with a person. Contrast with figureSources.ts, which grounds a
// guide's persona in a curated subset of episodes; this holds the FULL
// corpus for the channel itself, keyed by the books.ts slug.

export interface SourceEpisode {
  /** Repo-relative path under content/knowledge/ */
  file: string;
  title: string;
  /** One line: the lesson this episode teaches. */
  principle: string;
  keyLessons: string[];
  youtube: string;
  /** Interview guest, if this episode is an interview rather than solo narration. */
  guest?: string;
}

export interface SourceCorpus {
  title: string;
  host: string;
  episodes: SourceEpisode[];
}

export const sourceCorpus: Record<string, SourceCorpus> = {
  "founders-podcast": {
    "title": "Founders Podcast",
    "host": "David Senra",
    "episodes": [
      {
        "file": "content/knowledge/founders/001-how-elon-works.md",
        "title": "How Elon Works",
        "principle": "Run Elon's algorithm on everything: question every requirement, delete relentlessly, then simplify, accelerate, and automate last.",
        "keyLessons": [
          "Run the algorithm in order: question every requirement (each must carry the name of a real person, never a department), delete the part or process, simplify, accelerate the cycle, and automate last — automating or speeding up something that shouldn't exist is the classic mistake.",
          "Cost is the master metric: the word \"cost\" appears 158 times in the book, and the \"idiot index\" (a part's finished cost versus its raw-material cost) exposes where design or process is adding waste to be stripped out.",
          "Go to the problem physically: fly to the source, stand on the factory floor, and never separate yourself from the pain of your decisions — product managers who can't build are \"cavalry generals who don't know how to ride a horse.\"",
          "Be hardcore and put the mission first: Elon set insane deadlines, slept under his desk, and would rather offend or intimidate than let camaraderie slow the mission — \"it's not your job to make people on your team love you.\"",
          "Showmanship is salesmanship: from the fake server tower at Zip2 to Tesla's product theater, one dramatic demonstration transfers belief, because \"the money flows as a function of the stories.\"",
          "If a design is hard to manufacture at volume, the design is flawed, and \"if a timeline is long, it's wrong\" — simplify and delete until physics, not the org chart, sets the limit."
        ],
        "youtube": "https://www.youtube.com/watch?v=aStHTTPxlis",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/002-how-jensen-works.md",
        "title": "How Jensen Works",
        "principle": "War on complacency: keep the organization flat, criticize in public so everyone learns, and torture yourself and your team into greatness.",
        "keyLessons": [
          "Design the company around yourself, not around best practice: Jensen chose a flat structure (60 direct reports, no one-on-ones, no COO) so information travels fast and people who can't act without being told what to do wash out — \"strategy is not words, strategy is action.\"",
          "Complacency kills: treat success as the enemy (\"we're 30 days from going out of business\"), refuse to dwell on wins, and benchmark work against the \"speed of light\" — the physical maximum — rather than competitors or last year.",
          "Criticize in public: Jensen gives feedback in front of everyone so the whole organization learns from a single person's mistake — \"we are not optimizing for not embarrassing somebody, we're optimizing for the company learning.\"",
          "Get information from the edge: the \"Top 5\" email forces every level to report their five priorities and what they see in the market, letting Jensen intercept weak signals (like early machine learning) before they surface in the numbers.",
          "Create markets instead of fighting for share: build where \"there are no customers and therefore no competitors\" (the \"$0 billion market\"), which produces pricing power — Nvidia is the rare chip company whose average selling prices rise over time.",
          "Swarm your greatest opportunity for decades: Jensen bet on CUDA and AI for twenty years, absorbing an 80% stock crash and a gross-margin drop from 45% to 35%, and educated the market himself (free machines, a textbook, hundreds of talks) until it became the standard."
        ],
        "youtube": "https://www.youtube.com/watch?v=Sywq2Ua4GXw",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/003-how-rockefeller-worked.md",
        "title": "How Rockefeller Worked",
        "principle": "Stack advantages into a flywheel: know your numbers, own your biggest cost, keep the deepest war chest, and turn competitors into partners.",
        "keyLessons": [
          "Know your numbers like a poet knows words: Rockefeller inspected every line of every bill and thought like an owner before he was one, because \"the good ones know more\" — success is an issue of effort and information, not talent.",
          "Find your highest-priority cost and build an edge there: transportation cost more than refining, so he sited refineries next to both rail and water and extracted secret railroad rebates that rivals accepted as fixed — \"all is not as it seems on the outside.\"",
          "Keep the deepest war chest: retain profits instead of paying dividends, borrow aggressively to grow (\"the greatest borrower I ever saw\"), and buy crude in huge lots at the bottom — \"we must try and not lose our nerve when the market gets to the bottom.\"",
          "Stack advantages into a flywheel: raise money to grow output, use size to win transportation rebates, use profits to buy competitors, and repeat — so each advantage makes the next one possible.",
          "Cooperate and control rather than compete: turn beaten rivals into willing, semi-autonomous partners (\"you cannot have a winning cooperation except by willing partners\"), building a company of founders instead of just crushing them.",
          "Change your mind when the facts change: after fighting pipelines with every weapon \"but violence,\" Rockefeller embraced them — even reversing his own rebate game to pay subsidies — because \"you cannot fight a technological phenomenon.\" And never sell the stock: \"let it feed upon itself.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=M_TiZJapSLw",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/004-john-d-rockefeller-38-letters-rockefeller-wrote-to-his-son.md",
        "title": "John D  Rockefeller: 38 Letters Rockefeller Wrote to His Son",
        "principle": "Belief comes before ability: destiny is determined by your actions, not your origins — build what you're proud of and never make excuses.",
        "keyLessons": [
          "Belief comes before ability: the advice Rockefeller repeats most is relentless self-belief — \"as long as you work hard enough you will succeed\" — because your destiny is determined by your actions, not your origins.",
          "Struggle is an asset, not a handicap: great fortunes were built by people who succeeded because of, not in spite of, poverty, since hardship forges rare survival skills — while privileged children fail (\"shirtsleeves to shirtsleeves in three generations\") for lack of them.",
          "Be proud of what you build, not what you consume: \"a truly happy person is one who is able to enjoy his creation,\" and those who only take without giving lose their happiness — which is why he hid his wealth and drilled frugality and struggle into his children.",
          "Treat competition as war and rely on yourself: \"I do not meet competition, I destroy competitors,\" attacking a rival like Benson from every direction at once — \"crutches cannot replace strong and powerful feet.\"",
          "Create your own luck and turn enemies into assets: \"luck is the remnant of design,\" so we make our own luck; and like Alexander sparing Porus, a defeated but formidable rival is worth recruiting rather than destroying.",
          "Choose optimism as a discipline: Rockefeller aimed to be a \"dangerous optimist,\" training his mind to respond positively even in bad situations, because \"what destiny gives us is not the wine of disappointment but the cup of opportunity.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=wLWBzHbD9jg",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/005-the-billionaire-who-automates-everything-thomas-peterffy.md",
        "title": "The Billionaire Who Automates Everything: Thomas Peterffy",
        "principle": "Automate everything so the business runs on math, not intuition, and route around every arbitrary rule between you and growth.",
        "keyLessons": [
          "Automate the work itself: as a $65-a-week draftsman he taught himself the office's unused desktop computer and turned 20-minute calculations into 30-second ones, the same instinct that later produced Wall Street's first fully automated trading system in 1987, after 16 years of trial and error.",
          "Trade on math, not intuition: \"I'm a computer programmer and so are all the most important people in my company.\" He built pricing systems, including a partial differential equation for options, while rivals still relied on traders' gut feel.",
          "If a smart person figured something out, so can you: watching his psychiatrist boss Jereki become \"the dean of the American gold market\" taught Peterffy that expertise is learnable (\"I realized if he can figure it out, so can I\") and gave him the confidence to leave and start his own firm.",
          "Route around arbitrary rules: banned analytical devices, a severed data line, and a hostile clique of specialists each produced a novel workaround, from color-coded screens readable 30 feet away, to hijacking a data feed with an oscilloscope, to a mechanical \"spider\" that typed orders to satisfy NASDAQ's keyboard rule.",
          "Charge less to win more: like Costco, Interactive Brokers makes more money by charging less, driving fees so low that rivals stopped competing on price ($3.7B profit on $5.2B revenue in 2024).",
          "Common sense over credentials: \"I've never read a business book\"; his whole story, he says, is hard work and common sense, plus a relentless focus on saving customers money and making markets more efficient."
        ],
        "youtube": "https://www.youtube.com/watch?v=Q5WIv9vGKpA",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/006-how-bill-gates-works.md",
        "title": "How Bill Gates Works",
        "principle": "Build a business that fits your innate talents, then win through fanatical focus, ruthless cost control, and decades of endurance.",
        "keyLessons": [
          "Design the company around your innate talents: Gates chose pure software (no factories, no wires, \"just brain power and time\") because it rewarded his ability to focus intensely for 36 hours straight, the working style he minted as a teenager sneaking out at night to code.",
          "Be a demon on costs: Gates tracked every penny, wanted a one-year cash buffer (\"enough money so that if nobody paid us for a year, we would be okay\"), and berated his partners for not watching spend, even while Microsoft printed cash.",
          "Own it, don't license it: Gates insisted the DOS deal with Seattle Computer Products be an outright sale for \"complete ownership and control,\" and years earlier fought to keep \"best efforts\" in the MITS contract, a clause that later saved the company in arbitration.",
          "Hire young, brilliant, high-energy people: a great programmer outproduces an average one 10-to-1 and a genius maybe 50-to-1, so Gates wanted \"freshly minted\" talent before they were \"ruined\" elsewhere, and surrounded himself with equally intense people like Steve Ballmer.",
          "Seek conflict and paid critics: Gates thrived on hashing things out and respected anyone who could overcome his skepticism; like Akio Morita's paid critic, a sharp reviewer once \"raised my work to levels I didn't know existed.\"",
          "Never rest on a win: with 20,000 employees and a $20B net worth, Gates still saw the glass \"7/8 empty\" and insisted \"there is no finish line\" and \"we never talk about the things we've been successful at.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=IMXm123V3Co",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/007-steve-jobs-in-his-own-words-make-something-wonderful.md",
        "title": "Steve Jobs In His Own Words (Make Something Wonderful)",
        "principle": "Life is short and the world is malleable, so impose rigor on yourself and make something wonderful that advances human progress.",
        "keyLessons": [
          "The world is malleable: Jobs's core conviction was that reality can be reshaped; his gift was seeing \"what was not there, what could be there, what had to be there\" and then setting out to remedy it.",
          "Impose rigor on yourself first: his unbelievable standards were applied first and most strenuously to his own work, before he ever imposed them on anyone else.",
          "Solve the real constraint, then fund it creatively: the Apple I took ~50 hours to hand-build, so they switched to printed circuit boards to cut it to about an hour; Jobs sold his VW bus and Wozniak his HP calculator, and Jobs financed the first Byte Shop order on 30-day supplier credit, making the (barefoot) sale before he even had the parts.",
          "Start your own thing when the incumbents say no: Jobs pitched HP and Atari and both passed (Nolan Bushnell called turning down ~30% of Apple his biggest regret), so they simply started the company themselves.",
          "Learn from mentors and the eminent dead: Jobs sought out Robert Noyce, who mentored young founders to \"restock the stream I fish from\"; so few people can learn from the experience of others, and life is far easier if you can.",
          "There is always something worth saving: returning to an Apple that had just lost $800 million, Jobs saw \"something here worth saving\" and stayed driven by his lifelong mission to \"put something back into the pool of human experience.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=zGEOQ6I2Sv4",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/008-peter-thiel-on-how-to-build-a-creative-monopoly.md",
        "title": "Peter Thiel on How to Build a Creative Monopoly",
        "principle": "Go from zero to one by building a creative monopoly no one can copy, not by competing in an existing market; think for yourself.",
        "keyLessons": [
          "Ask the contrarian question: \"What important truth do very few people agree with you on?\" Great companies are built on secrets, valuable truths found in unexpected places that most people have stopped looking for.",
          "Competition is for losers: competitive markets destroy profits, so the aim is to build a monopoly by being uniquely great at something new, not to fight over an existing market.",
          "Reject the post-dot-com dogmas: against \"make incremental advances, stay lean, improve on the competition, don't focus on sales,\" Thiel argues the opposites are more correct: risk boldness over triviality, a bad plan beats no plan, competitive markets destroy profits, and sales matters as much as product.",
          "Be the last mover, not the first: first-mover advantage is a tactic, not a goal; what matters is generating and dominating future cash flows, so the real question is \"will this business still be around a decade from now?\"",
          "Practice definite optimism: like Jobs, make definite multi-year plans rather than listening to focus groups; the future is better than the present only if you plan and work to make it so.",
          "Founders matter, so tolerate the strange ones: companies that create new technology resemble feudal monarchies led by singular founders, and a great founder brings out the best work in everyone, so be more tolerant of founders who seem extreme. (Also: Thiel's law, a startup messed up at its foundation cannot be fixed.)"
        ],
        "youtube": "https://www.youtube.com/watch?v=b9tB9Q1XOM0",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/009-how-elon-thinks.md",
        "title": "How Elon Thinks",
        "principle": "Reason from physics and first principles, not analogy; be useful, delete relentlessly, and endure the pain the mission demands.",
        "keyLessons": [
          "Be useful: measure your life by how many useful things you get done, and judge any product by its utility improvement over the state of the art multiplied by how many people it affects.",
          "Reason from first principles, not analogy: break a problem down to its axiomatic physical truths (a battery's raw materials cost ~$80/kWh, not the assumed $600) and build up from there.",
          "Attack cost with the “idiot index” — the ratio of a finished part's cost to its raw-material cost; a high ratio means the waste is yours to engineer away.",
          "Run the algorithm in strict order: make requirements less dumb, delete the part or process, simplify, accelerate, then automate — never accelerate or automate something that should have been deleted.",
          "The only true currency is time: a maniacal sense of urgency, speed as both offense and defense, and leading from the front line are how you win.",
          "Attract great people and remove organizational boundaries — a company is the vector sum of the people in it, and errors in your org structure always show up in the product."
        ],
        "youtube": "https://www.youtube.com/watch?v=nqiuSshC9GA",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/010-how-larry-ellison-thinks.md",
        "title": "How Larry Ellison Thinks",
        "principle": "You can't get rich doing what everyone else does: pick a contrarian bet, burn the boats, obsess over costs, and engineer every process.",
        "keyLessons": [
          "You can't get rich by doing the same thing as everyone else: Ellison is only comfortable out on the limb where few or no one else is, and takes the highest-risk path only when it raises the odds of winning.",
          "Burn the boats: once a course is plotted, commit totally so it is win or die — he did this going all-in on the relational database in 1977 and again on internet computing.",
          "Make cost control an obsession: like Carnegie, Walton, and Rockefeller, Ellison knew prices and profits are cyclical but cost savings are permanent and a durable competitive advantage.",
          "Watch incentives relentlessly: Oracle's 1991 near-death came from letting salespeople write their own contracts and paying higher commissions on partner deals than direct ones — perverse incentives produce perverse behavior.",
          "Engineer the entire business, not just the product: after nearly failing, Ellison applied engineering discipline to sales, pricing, and HR, collapsing 70 HR systems and 200 pricing people down to a handful.",
          "Storytelling and positioning are leverage: by picking a fight with Microsoft and IBM, Ellison repositioned Oracle from “just another database company” into a software heavyweight in the public mind."
        ],
        "youtube": "https://www.youtube.com/watch?v=z__KpHVSglE",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/011-400-pages-of-warren-buffett-and-charlie-munger-in-their-own-.md",
        "title": "400 Pages of Warren Buffett and Charlie Munger In Their Own Words",
        "principle": "Think in opportunity costs, concentrate on a few wonderful businesses you understand, and let focus and compounding do the work.",
        "keyLessons": [
          "Make decisions by opportunity cost: intelligent people think in terms of their alternatives, so you only act on something better than what you already have — which “simplifies life a great deal.”",
          "Concentrate, don't diversify: the whole secret of investment is finding the few places where it is safe and wise to not diversify, then “going in heavy” — while keeping a fortress of cash for the rare times “it rains gold.”",
          "Study extreme examples and ask “what in the hell is going on here?” — Munger calls this the way to wisdom (e.g., how State Farm became a top-three U.S. net worth starting from no capital).",
          "Learning means changing behavior, not memorizing: their costliest mistakes were of omission — selling Disney and Intel (Noyce) too early, and never buying Google or Amazon despite seeing the evidence firsthand at Geico.",
          "Work with talented fanatics and keep headquarters lean: find the “.400 hitters” and don't tell them how to swing; bloat and float ruin businesses, not downsizing.",
          "Build or own a business that is natural to you with a durable brand and mind-share: owning See's taught them the power of brands, which is what later led them to Coca-Cola."
        ],
        "youtube": "https://www.youtube.com/watch?v=t47NBQqlzbk",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/012-how-spacex-works.md",
        "title": "How SpaceX Works",
        "principle": "Atoms are cheap, process is pricey: redesign the whole stack around cost and validate it with fast, failure-driven iteration.",
        "keyLessons": [
          "Atoms are cheap, process is pricey: raw materials are ~2% of a rocket's price, so treat “fixed” costs as variables and redesign the entire stack around cost (the “idiot index”).",
          "The three tactics only work together: first principles identifies the waste, vertical integration (building ~80% in-house) provides the control to eliminate it, and standardization (one Falcon 9 platform) creates the volume that makes that control profitable.",
          "Use reality as your validation tool: you can't think your way to perfect solutions for problems you don't yet understand, so build-test-learn with cheap prototypes and treat failures as data (“push the envelope such that it blows up”).",
          "Separate development from operations: the same company runs fail-fast Starship, “ascent can't fail” Falcon 9, and “can never fail” crewed Dragon — different risk profiles that talk to each other.",
          "A high production rate solves many ills: iteration only works if you can afford many attempts, which is why cheap, weldable stainless steel and high-volume in-house Raptor production beat precious carbon-fiber prototypes.",
          "People are the real moat: an audacious mission filters for missionaries, forcing functions prevent drift, and a CEO who talks directly to engineers removes signal loss — the structure, not the hero, is what's hard to copy."
        ],
        "youtube": "https://www.youtube.com/watch?v=owZ6xh_gOdY",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/013-lessons-from-jeff-bezoss-shareholder-letters.md",
        "title": "Lessons from Jeff Bezos's Shareholder Letters",
        "principle": "Obsess over customers and think in decades; patient invention compounds into free cash flow and a franchise rivals cannot copy.",
        "keyLessons": [
          "**Customer obsession beats competitor obsession.** Amazon publishes ~14 leadership principles, but David notes they collapse into one: obsess over customers. Bezos studied Akio Morita and Sony and made customer needs, not rivals, the fixed point everything else optimizes around.",
          "**Run the flywheel and say so out loud.** A lower cost structure lets you lower prices, which drives growth, which spreads fixed costs over more sales, which lowers unit costs and funds still more price cuts. Bezos wrote the loop into the letters and added: 'Please expect us to repeat this loop.'",
          "**Long-term orientation is the cheat code.** 'Seek instant gratification and chances are you'll find a crowd there ahead of you.' Because Amazon was willing to work patiently for years and to be misunderstood, it could pursue solutions competitors wouldn't attempt.",
          "**Go against the math when the math is short-term.** Price-elasticity data only predicts this week and this quarter; Bezos lowered prices anyway, judging that returning efficiency and scale economies to customers compounds into far more free cash flow over five and ten years.",
          "**High standards are teachable, and mostly about scope.** A great six-page memo is less about talent than expectation: it takes a week of writing, sharing, setting aside, and re-editing. 'They're trying to perfect a handstand in just two weeks, and we're not coaching them right.'",
          "**Marry the right kind of business.** Bezos looked for four traits, customers love it, it can grow very large, it has strong returns on capital, and it is durable over decades. 'When you find one of these, get married.'"
        ],
        "youtube": "https://www.youtube.com/watch?v=zt9e6vVBdP4",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/014-the-stubborn-genius-of-james-dyson.md",
        "title": "The Stubborn Genius of James Dyson",
        "principle": "Demand difference and retain total control, then out-persist everyone: determination, not cleverness, is what builds a real breakthrough.",
        "keyLessons": [
          "**Difference for the sake of it, plus retention of total control.** Dyson's whole philosophy in one line: invent, engineer, prototype, manufacture, market, and sell it yourself; take no shareholders and never assign your patents. He learned it the hard way after losing his first invention, the Ballbarrow, by giving up control.",
          "**Persistence, not brilliance, is the engine.** 'Aim not to be clever but to be dogged.' A clever person doesn't build 5,127 prototypes over 14 years of crushing debt; a determined one does. 'There is no such thing as a quantum leap, only dogged persistence, and in the end you make it look like a quantum leap.'",
          "**Use history as fuel.** Dyson studied engineer-heroes like Brunel, Frank Whittle, Soichiro Honda, and Alec Issigonis, both for design ideas and to steady himself through struggle, even writing his own encyclopedia, A History of Great Inventions.",
          "**Sell with one clear message.** A consumer can barely absorb one new idea, let alone several (Lee Clow's paper-ball demo for Steve Jobs makes the same point). Appeal to a specific need rather than an all-purpose product, and tell the story of how it's made, Dyson's 'story leaflet' hung on every machine.",
          "**Hire unsullied, determined people over experienced ones.** 'Experience tells you how things should be done'; when pioneering, that's a hindrance. Dyson hires young graduates with open minds and screens for determination, like Ross, who carried every brick for his house down a slope by hand.",
          "**Chase intrinsic excellence and stay permanently dissatisfied.** Markets for genuinely differentiated, excellent products are larger than anyone predicts (Sony sold 400M Walkmans). Never sacrifice quality for speed, and keep improving, because 'it can always be better.'"
        ],
        "youtube": "https://www.youtube.com/watch?v=hagy0fhiPpY",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/015-li-lu-and-charlie-munger-and-warren-buffett.md",
        "title": "Li Lu and Charlie Munger and Warren Buffett",
        "principle": "Do one thing you love well, then concentrate: buy wonderful businesses cheaply and bet big on your few best ideas, the way Munger taught.",
        "keyLessons": [
          "**The whole career in two steps: study Buffett and Munger, then do that.** Munger pulled Buffett from buying fair businesses at wonderful prices toward wonderful businesses at fair prices; Li Lu followed the identical path after Munger became his partner and lifelong mentor.",
          "**A stock is fractional ownership of a real business.** Li Lu does the primary-source work, reading every page, visiting the stores, talking to managers (as with Timberland), until he understands the business well enough to earn a genuine margin of safety.",
          "**Think in opportunity costs, then concentrate.** Measure every decision against your best available alternative; do that and you will not over-diversify. Wise investors bet heavily and rarely, pouring time and capital into their few best ideas.",
          "**Intrinsic passion is the durable edge.** 'If you could ever find something you can do well that you really like, this will be your best investment.' Intense interest in a subject, Munger's phrase, is indispensable to excellence and compounds enormous value over time.",
          "**Reject the Wall Street way of thinking.** Munger told Li Lu that his problems were practically all of Wall Street's problems; abandoning that mindset and reorganizing his firm around ownership and patience is what finally removed his worries.",
          "**Play the long game in life, not just in markets.** At fifty, Li Lu still loves the game and stays fresh by making younger friends as new teachers, echoing Norman Lear: 'I'm always the same age as the people I talk to.'"
        ],
        "youtube": "https://www.youtube.com/watch?v=8TnhiapOfpE",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/016-how-roger-federer-works.md",
        "title": "How Roger Federer Works.",
        "principle": "Play the long game: master your emotions, build a team you fully trust, and compound excellence over decades, not seasons.",
        "keyLessons": [
          "**Mental discipline is the real differentiator.** A rival's taunt, 'Roger will be the favorite for the first two hours, and I'll be the favorite after that,' was Federer's wake-up call to stop throwing rackets and master his temper. At the top, the gap between players is mostly mental.",
          "**Carry more self-belief than your current results justify.** Federer held 'a higher belief in himself than his ability at that time would demonstrate,' publicly declaring he'd bring home an Olympic gold before he was clearly good enough to.",
          "**Build a small circle you trust completely.** Surround yourself with people you fully trust so you never have to worry about anything else. Trust takes a while to earn, 'but once you're in, nothing is second guessed.'",
          "**Great people keep changing.** Like Steve Jobs across his two Apple decades (per Ed Catmull), Federer transformed from a hot-headed teenager into a model professional; the one-note caricature is misleading, and the capacity to grow is what sustains greatness.",
          "**Being nice compounds.** 'It's nice to be important, but more important to be nice.' Federer treats fans, sponsors, and CEOs as if he has all the time in the world, a long-term relationship strategy rather than a photo op.",
          "**Optimize for the long run in business too.** Because his Uniqlo deal excluded footwear, Federer could take equity in the Swiss shoemaker On; when it went public his stake was worth roughly $300 million, his biggest win, 23 years after he turned pro. 'I never fell out of love with the sport.'"
        ],
        "youtube": "https://www.youtube.com/watch?v=g2-duG1-Jxc",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/017-napoleon-the-mind-of-napoleon.md",
        "title": "Napoleon (The Mind of Napoleon)",
        "principle": "Fix your destiny, then bend the world to it with relentless action; plan timidly by imagining every danger, then act with total boldness.",
        "keyLessons": [
          "**Thought is only valuable as a step to action.** \"Hesitation is fatal. Once an action is begun it must be followed through with the utmost exertion of the will.\" Figure out your destiny, then impose it on the world with maximum energy.",
          "**Luck is manufactured, not received.** \"A consecutive series of great actions never is the result of chance and luck; it is always a product of planning and genius.\" Luck is \"the ability to exploit accidents.\"",
          "**Study humans as they actually are, not as you wish them to be.** \"Men are moved by two levers only: fear and self-interest.\" The marketing corollary: stop talking about yourself and appeal to the customer's self-interest.",
          "**Be your own minister of propaganda.** \"The masses must be guided without their noticing it.\" Napoleon dictated his own bulletins; Steve Jobs approved every billboard. If your product improves lives, you have an obligation to master its marketing.",
          "**Timid in planning, bold in action.** \"There is no man more pusillanimous than I when I am planning.\" He exaggerated every danger in advance, then once committed, \"everything is forgotten except what leads to success.\" Boldness is the common trait of every great captain.",
          "**Read history like game tape.** He studied Alexander, Caesar, Hannibal and Frederick to copy the traits he wanted and avoid the mistakes he didn't. \"Do everything and you will win\"; the less clever man, \"by neglecting one thing, sometimes misses everything.\"",
          "**Someone will out-sacrifice you (a cautionary tale).** General Mack lost because he assumed rules of fair play; Napoleon respected none. Presume a rival will devote all their time, money, relationships and ethics to one goal, and be hard to kill."
        ],
        "youtube": "https://www.youtube.com/watch?v=AuRDLXuLZE8",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/018-the-life-of-jesus.md",
        "title": "The Life of Jesus",
        "principle": "Lead an inward revolution of love and self-transformation, winning people through reason and example rather than spectacle or force.",
        "keyLessons": [
          "**Recruiting your team is the first and most important act.** Jesus's early move was to choose twelve apostles: \"the first and most important step when starting anything is recruiting the people who are going to help you on your mission.\" They spread the teaching and physically protected him.",
          "**Demand total commitment.** \"This mission is only for the fully committed.\" Jesus was adamant the men he called put the mission first, even ahead of family, and was never in doubt about its danger.",
          "**Persuade by reason, not spectacle.** He repeatedly kept healings private because he \"detested being thought of as a kind of holy magician.\" He wanted people to accept truth because it was reasonable, not because they were dazzled by signs.",
          "**Teach constantly, and make it memorable.** He taught on as many as 400 occasions in three years, combining hard maxims with parables (the Good Samaritan, the Prodigal Son) because lessons \"won't be applied if they aren't remembered.\"",
          "**Find the one radically inclusive idea.** He turned ordinary compassion into \"a huge overarching gospel of love,\" love of mankind as a whole (philanthropia), a concept that did not exist in his day. \"There was nothing exclusive about Jesus.\"",
          "**The revolution is inward, spread by imitation.** His new Ten Commandments (true personality, universality, equality, love, mercy, balance, an open mind, truth, judicious use of power, courage) change the world by changing the individual first.",
          "**Challenging the status quo is dangerous.** John the Baptist was beheaded and Jesus was killed for speaking against the powerful. \"Speaking out against the powerful in any age is dangerous and life-threatening.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=F1lmA_bYZow",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/019-rockefellers-autobiography.md",
        "title": "Rockefeller's Autobiography",
        "principle": "Be brutally honest with your numbers, keep a fortress of cash, and compound first-class decisions with partners you keep for decades.",
        "keyLessons": [
          "**Once something works, shut up about it.** \"Bad boys move in silence.\" Secrecy covered all of Rockefeller's operations: \"I wonder what general ever sends out a brass band in advance with orders to notify the enemy.\"",
          "**Build a permanent team of A-players; hire talent as found, not as needed.** Rockefeller kept the same core partners for decades because, as Larry Ellison said, \"you do not want turnover on your core team; that knowledge compounds.\"",
          "**Argue frankly until agreement is unanimous.** \"Hear patiently and discuss frankly until the last shred of evidence is on the table.\" When one partner dug in, Rockefeller offered to personally fund the project and absorb the loss, which instantly dissolved his resistance (\"a check separates conviction from conversation\").",
          "**Keep a fortress of cash.** \"We were accustomed to prepare for financial emergencies long before we needed the funds.\" He always moved into battle backed by abundant cash and won bidding contests because his war chest was deeper.",
          "**Know your numbers, and be honest with yourself.** Competitors kept books so poorly \"they did not actually know when they were making money or when they were losing money.\" Real efficiency comes from knowing your facts.",
          "**Build first-class from day one and let it compound.** Flagler insisted on solid refineries, \"building as though the trade was going to last.\" Standard developed \"step by step\" over 35 to 40 years.",
          "**Narrow your focus and serve.** Standard did only oil; Slootman's \"amp it up\" echo is that narrowing focus increases resourcing on the one priority. And \"money comes naturally as a result of service\", so avoid needlessly duplicating existing industries and create the new instead."
        ],
        "youtube": "https://www.youtube.com/watch?v=seMvuxRct1Q",
        "guest": ""
      },
      {
        "file": "content/knowledge/founders/020-how-steve-jobs-kept-things-simple.md",
        "title": "How Steve Jobs Kept Things Simple",
        "principle": "Wield simplicity as a weapon: blunt talk, small teams, one message per idea, and attack markets full of complex, second-rate products.",
        "keyLessons": [
          "**Carry a simple stick.** If an idea was not distilled to its essence, Steve rejected it; if you made two versions of anything, he hit you with the simple stick until there was one. Humans naturally over-complicate, so the leader must eliminate complexity at its source.",
          "**Blunt communication is the simplest communication.** \"Your TV work is great, your print work is [bad]\" tells you exactly what to do. Direct talk makes your standards easy to understand, and it requires putting the quality of the work above being liked.",
          "**Organize like a startup: small groups of smart people.** No committees, one owner per area, and the ultimate decision-maker touches everything. Steve threw non-essential spectators out of meetings; \"simplicity's best friend is small groups of smart people.\"",
          "**The further you get from one, the more complexity you invite in.** One message per ad (Lee Clow's five-paper-balls demo), one product with one button (\"burn\"), one focus per quarter. More things asked of an audience means less remembered.",
          "**Simple is fast.** Trust lets you move fast: Steve canceled a 20-agency search and just called Lee Clow. Like Herb Kelleher's \"we're shooting it next Wednesday,\" if you're too slow, narrow the scope, simplify, and up the intensity.",
          "**Editing your thinking is an act of service.** \"I would have written you a shorter letter but I didn't have the time.\" People find more words confusing, so boil the idea to its essence and use a picture instead of a deck.",
          "**The Hearst principle: attack markets full of second-rate products.** One of Steve's greatest talents was spotting markets full of complex, second-rate products. Cross out everything competitors do, force yourself to find a simpler path (iPod managed in iTunes), and you can leap ahead."
        ],
        "youtube": "https://www.youtube.com/watch?v=Mf8MZ8Iy8sE",
        "guest": ""
      },
      {
        "file": "content/knowledge/interviews/001-rick-rubin-on-finding-your-life-s-work.md",
        "title": "Rick Rubin on Finding Your Life’s Work",
        "principle": "Strip a work down until only its essential magic remains, then protect that fragile moment instead of thinking it to death.",
        "keyLessons": [
          "\"Less is more, but to get less you have to do more\": once a work is stripped to essentials, nothing is hidden, so every remaining element must be ruthlessly curated. One guitar where you can hear the fingers on the strings has more personality than a generic \"wall of guitars.\"",
          "His credit reads \"reduced by,\" not \"produced by\" — the job is taking apart, not building up. He imposed Beatles-style song structure on early rap, turning spoken-word monologue into actual songs.",
          "The ruthless edit: to land a work at 70%, first force it down to 40%, then add back only what's needed — you understand the work better after over-reducing. With bands he records 40–50 songs and votes down to the few \"you can't live without.\"",
          "Constraints are a friend: invent a \"palette\" of rules unique to each project. For Johnny Cash it was voice plus guitar (fingers, no pick), with every song chosen only through the lens of the mythic \"man in black.\"",
          "The \"lazy workaholic\": his natural demeanor is to do nothing, so he forces himself to show up — but he's addicted to the unpredictable \"moment of magic,\" and once it appears the whole job is protecting that fragile thing (like the golf \"yips,\" thinking about it kills it).",
          "Show up like it's a job; inspiration only visits those already doing the work — Eminem records 9-to-5, and \"if you don't show up, it won't happen.\"",
          "Be a \"professional listener\": listen to understand, not to reply, with no judgment and no comparing to your own views. Sustain success by staying grounded, knowing \"it's not from me,\" and treating each work as a diary entry of who you were in that moment — nothing to be self-critical about."
        ],
        "youtube": "https://www.youtube.com/watch?v=g6MEDOY7tHo",
        "guest": "Rick Rubin"
      },
      {
        "file": "content/knowledge/interviews/002-the-man-behind-grand-theft-auto-6-strauss-zelnick.md",
        "title": "The Man Behind Grand Theft Auto 6: Strauss Zelnick",
        "principle": "Sustained success comes from being rational over decades and serving creative talent — hits are unexpected and can't be manufactured.",
        "keyLessons": [
          "Take-Two was \"a hostile takeover with no money\": tipped by Carl Icahn to \"read the bylaws,\" they exploited a plain-vanilla Delaware charter (written consent plus physically showing up to vote at the annual meeting) to seize a company they had no capital to buy shares in.",
          "You can't fight a business's underlying economics: a \"studio system\" (talent on the payroll — video games, early recorded music) is structurally good; a \"boutique system\" (talent auctions its services — movies since the 1955 consent decree) is \"heads I win, tails you lose.\" Per Buffett, brilliant management plus a bad business leaves the business's reputation intact.",
          "Study history to read the present: he realized his ambition should have been to run \"a movie studio in 1927,\" and the modern equivalent was the young, fast-growing video-game industry that Hollywood had written off after Atari's E.T. disaster.",
          "Turnaround playbook: only take it on if you're \"the first team in\"; don't fire people on arrival (you don't yet know who is valuable). Attack third-party vendor costs first — a top-10 vendor survey saves money immediately and builds credibility because no one got fired — then right-size headcount only after months.",
          "Rationality beats \"magical thinking,\" and the CEO's job is to serve the talent: \"I don't matter; the hit-makers matter.\" Give creative people resources and freedom and back them in the breach — he greenlit a $50M-plus remake of a finished game that became Borderlands.",
          "Specific goals and visualization (not woo): \"the universe rewards the specific ask and punishes the vague wish\" — it works because it forces you to concentrate hard and exclusively on what you want. He set a $20B goal in 2001 (about $1B after a decade, roughly $40B eventually), and tells staff to ask weekly whether they created more value than they cost.",
          "Hits are unexpected, so AI makes assets, not hits: \"asset creation is necessary but insufficient for hit creation.\" Clones don't sell — thousands of games ship yearly and only zero-to-five become hits."
        ],
        "youtube": "https://www.youtube.com/watch?v=1ZgUcrR0K7I",
        "guest": "Strauss Zelnick"
      },
      {
        "file": "content/knowledge/interviews/003-marc-andreessen-the-world-is-more-malleable-than-you-think.md",
        "title": "Marc Andreessen: The World Is More Malleable Than You Think",
        "principle": "The world is far more malleable than it looks — determined founders thinking from first principles can bend reality to their will.",
        "keyLessons": [
          "The world is far more malleable than you think: pursue something with maximum effort, drive and energy and the world recalibrates around you. Jim Clark was the \"ultra version,\" reinventing himself from a \"self-described loser at 38\" into the founder of three billion-dollar companies.",
          "Zero introspection: great founders don't dwell on the past (introspection and therapy are a modern manufactured construct), and low neuroticism — not getting emotionally fazed — is a superpower.",
          "Founders beat managers (the core thesis): managers can run a status quo (\"soup is soup\") but can't adapt to change, while founders can learn to run at scale — \"you're much more likely to build something important by starting with a founder and training them on management than the reverse.\" Incumbent, manager-run institutions are collapsing because they can't adapt.",
          "Interrogate inherited assumptions from first principles: every industry accumulates unquestioned practices that \"made sense in 1970 or 1930.\" CAA beat incumbents by moving the 9am staff meeting to 7am and calling not just its own clients but rivals' clients — \"mediocrity is invisible until passion shows up and exposes it.\"",
          "Barbell / \"death of the middle\": across relationship businesses (investment banks, private equity, talent agencies) the middle gets stretched like taffy — win as a light solo operator or a scaled platform, never the mushy middle. a16z built scaled venture because startups had shifted from selling \"tools\" to competing directly in incumbent industries (Airbnb, Uber, Tesla).",
          "Every new technology triggers the same moral panic (\"it will ruin society and the children\") — bicycle face, jazz, comic books, the Walkman, hip-hop, the internet — and inventors are often the worst predictors of their own technology's use (Edison thought the phonograph was for recorded sermons).",
          "Elon's management method, which Marc calls a new school: go straight to the source of truth (the engineer), countering the IBM \"big gray cloud\" where twelve management layers each lied upward until the CEO knew nothing. Map the company as a production line, find the single weekly bottleneck, and personally fix it — \"maneuver warfare\" cycle time of hours, not months."
        ],
        "youtube": "https://www.youtube.com/watch?v=qBVe3M2g_SA",
        "guest": "Marc Andreessen"
      },
      {
        "file": "content/knowledge/interviews/004-james-dyson-5-127-prototypes.md",
        "title": "James Dyson: 5,127 Prototypes",
        "principle": "Progress comes from doggedness, not cleverness — treat failure as the most interesting teacher and iterate relentlessly until it works.",
        "keyLessons": [
          "Failure is more interesting than success: failure forces you to ask \"why did it go wrong?\", whereas success you never examine. You have to enjoy failure to improve things — his 5,127 vacuum prototypes over roughly eleven years were \"a hugely enjoyable struggle.\"",
          "Naivety is an asset: the experienced person knows why not to do something, but the naive young engineer thinks harder because they don't know it's \"impossible.\" Back the person who \"wants it the most,\" not the most experienced — he founded a university that hires paid 17- and 18-year-olds for their naive questions.",
          "Distrust experts and pursue difference for its own sake: Ford said filling your competitors' ranks with experts is the best sabotage because \"they know so much about why something won't work.\" Dyson's organizing principle is \"it has to be different\" — he'd \"be different even if it was worse,\" though it also has to end up better.",
          "The entrenched professional resists longer than the independent consumer: retailers laughed at his products while consumers bought them by mail, and incumbents rejected the bagless cyclone partly because they earned $500M a year on bags. He turned every reasonless rejection into fuel — \"these guys don't want to change, so I'm going to make it work.\"",
          "Protect the fragile early idea and back your intuition against everyone — intuition isn't guesswork but thousands of absorbed experiences synthesized into a decision you can't fully rationalize, and everyone (partners, friends) will try to blow the idea away.",
          "Build with your own hands and change one variable at a time: engineers who build and test their own prototypes gain a \"visceral\" understanding a spreadsheet can't give, and changing fifteen things at once means you never learn which one mattered.",
          "Focus is the one trait that separates these people: \"concentrate on one thing at a time,\" choose the single most important thing and accept that some things won't get done. He refuses to sell motors to other companies (guaranteed money) rather than split his engineers' focus — \"life is for living, not for making money\" — and holds that \"I aim not to be clever but to be dogged.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=Se64B8TKfjA",
        "guest": "James Dyson"
      },
      {
        "file": "content/knowledge/interviews/005-how-elon-thinks.md",
        "title": "How Elon Thinks",
        "principle": "Attack problems the future needs solved, reason from first principles, and treat time as the only true currency.",
        "keyLessons": [
          "**Choose work by necessity, not risk-adjusted return.** Elon starts companies around problems that \"need to happen\" for the future and accepts he may lose the money, the opposite of the dealmaker mindset (\"we have enough dealmakers; we need people making products and building companies\").",
          "**Run \"the algorithm\" in order.** Question every requirement (and know the name of the person who set it), delete the part or process, then simplify and optimize, accelerate cycle time, and automate last, so you never automate waste.",
          "**Break bottlenecks with a war room and first principles.** The Starlink turnaround (10x too expensive at one-tenth the needed volume) came from putting trusted engineers in a room and relentlessly asking why each part, process, and requirement exists.",
          "**Treat time as the ultimate currency.** Attack the single binding bottleneck, avoid serialized dependencies, and compress cycle time with urgency (the PayPal launch forced onto Thanksgiving weekend).",
          "**Organize the whole company around one metric.** A single question everyone can check (\"is this getting better?\") keeps the team honest and blocks distraction by secondary objectives.",
          "**Manufacturing is the moat.** \"We must make stuff\"; vertical integration and religious cost control let you pursue opportunities competitors can't, and can even increase revenue.",
          "**Failure is nearly meaningless unless it's catastrophic.** Look fear directly in the eye and it disappears; feel the fear and do it anyway."
        ],
        "youtube": "https://www.youtube.com/watch?v=CdBcZSau5iA",
        "guest": "Eric Jorgenson"
      },
      {
        "file": "content/knowledge/interviews/006-jimmy-iovine-building-interscope-records-beats-by-dre.md",
        "title": "Jimmy Iovine: Building Interscope Records & Beats by Dre",
        "principle": "Marketing is empathy at scale; win by attaching yourself to the very best people and telling them the brutal truth.",
        "keyLessons": [
          "**Marketing is empathy.** \"Understanding what somebody else is feeling on a massive scale\"; make the product great enough and the product itself becomes the marketing, the way Steve Jobs did it.",
          "**Bet your career on proximity to the best.** Iovine deliberately engineered and produced for Lennon, Springsteen, Petty, Bono, and Dr. Dre, absorbing world-class standards by being in the room.",
          "**Brutal honesty is an edge.** People wanted Jimmy in the room because he would tell them the truth no one else would.",
          "**Serve the customer the incumbents abandoned.** Beats grew from noticing the music industry had stopped serving its own customers, so they vertically integrated culture, fashion, and hardware to reach them.",
          "**Know when you can't scale alone.** He sold Beats Music to Apple because streaming demanded capital and scale he couldn't match against Spotify; control gave way to the right partner.",
          "**Fear and obsession are fuel, but they cost you.** \"The bend in the pipe\" drives the work, yet the tortured path exacts a price, so peace, therapy, and knowing what \"enough\" is matter.",
          "**Chase great, not famous.** Fame has replaced greatness as the culture's currency, and that is a trap."
        ],
        "youtube": "https://www.youtube.com/watch?v=niqahsc9jfo",
        "guest": "Jimmy Iovine"
      },
      {
        "file": "content/knowledge/interviews/007-jason-fried-your-only-competition-is-your-costs.md",
        "title": "Jason Fried: Your Only Competition Is Your Costs",
        "principle": "Your only competition is your costs: keep them low enough that a few customers are enough, and stay independent.",
        "keyLessons": [
          "**Your only real competition is your costs.** Keep them low enough that a modest number of customers is \"enough,\" so no competitor can force your hand.",
          "**Build the product you want to use.** Fried has made products for himself since age 15 (starting with FileMaker Pro); being the customer is the only method he trusts.",
          "**Stay small and lean on purpose.** Fewer people, tiny independent units, and six-week horizons make the business anti-fragile and keep decisions compounding.",
          "**Choose \"enough\" over growth.** Question \"the reward for good work is more work\"; if you miss a big opportunity, \"so what?\", as long as you keep doing the thing you love.",
          "**Fight bloat with ruthless editing.** Rewrite and cut rather than pile on features, and know what should never change.",
          "**Authenticity beats marketing tricks.** Success is pride in the work, and independence comes from profitability, not valuation or an exit.",
          "**Longevity is the moat.** Build by intuition, stay close to customers, and simply outlast everyone."
        ],
        "youtube": "https://www.youtube.com/watch?v=BdDCtMA1gSw",
        "guest": "Jason Fried"
      },
      {
        "file": "content/knowledge/interviews/008-dana-white-the-man-behind-the-ufc.md",
        "title": "Dana White: The Man Behind the UFC",
        "principle": "Own your content and its story, keep no Plan B, and let loyalty, not middlemen, build the empire.",
        "keyLessons": [
          "**Own what you create.** Because the UFC paid for The Ultimate Fighter itself, it owned the show outright; control of the asset, not just airtime, was the point of the napkin deal with Spike.",
          "**Let the audience judge.** The fatal flaw Dana spotted in The Contender was that it edited the fights; you let fans decide whether a fight is good, you don't tell them.",
          "**Be the chief storyteller.** A founder should never read a lawyer's canned statement; Dana is the most authentic fan of his own product, which is why his post-fight press conferences sell it.",
          "**There is no Plan B.** The \"let's keep going\" moment after Fertitta nearly sold, and the refusal to keep a fallback, carried them through nearly dying (events cost $2M while revenue covered half).",
          "**Loyalty is the most important thing.** He did the first 12 events with Joe Rogan for free, kept every employee through COVID, and fired a sponsor who tried to tell him how to vote.",
          "**Excellence is the capacity to take pain.** Surviving the years the company bled money is the moat; each time critics said the UFC had peaked (Spike, Fox, ESPN, Paramount), they were wrong.",
          "**Build a team that reads your mind, and ignore critics who've built nothing.** Stay obsessively close to the product (ringside, watching a screen); as Dana puts it, \"who the f--- are you and what have you done?\""
        ],
        "youtube": "https://www.youtube.com/watch?v=35IY2ILCAio",
        "guest": "Dana White"
      },
      {
        "file": "content/knowledge/interviews/009-daniel-ek-spotify-david-senra.md",
        "title": "Daniel Ek, Spotify | David Senra",
        "principle": "Optimize for impact over happiness; happiness is a trailing indicator of impact, and greatness requires building a company true to yourself.",
        "keyLessons": [
          "Optimize for impact over happiness — happiness trails impact. The Dara Khosrowshahi/Uber story crystallizes it: \"Since when is life about happiness? It's about impact.\"",
          "Belief comes before ability. Ek says he doesn't know he's \"good,\" only that he's \"different\" and has an insane belief he can get good if he works hard enough (the Morita/Sony-in-firebombed-Tokyo parallel).",
          "Knowing yourself is the hardest and most important founder skill; advice is useless unless it's tied to who you are. There are many founder archetypes — Ek's is \"coach, not player,\" with a collaborative style, not a Jobs-style dictator.",
          "Build a \"seamless web of deserved trust\" (Munger). Trust is one of the greatest economic forces because it compounds but doesn't scale; surround yourself with people who tell you the truth — the \"mirror\" (Sony hired a paid critic who became president).",
          "Practice extreme intellectual humility. Ek cold-calls leaders and shadows them — he sat through a week of Zuckerberg's meetings, took notes, offered to get coffee — to absorb the culture firsthand and learn what he doesn't know.",
          "The value of a company is the sum of all problems solved (his co-founder Martin's line). Focus on the problem, not the solution; money comes as a result of service (Henry Ford), so hunt for the biggest problems worth a decade of your life.",
          "Manage energy, not time — there are no morning-ritual rules; know your own rhythm. Judge people on their best idea, not their worst (\"high-temperature\" people preserve creativity), and treat quality as less, focus, and the aspiration toward an impossible perfection."
        ],
        "youtube": "https://www.youtube.com/watch?v=qiXH0y2V3_8",
        "guest": "Daniel Ek"
      },
      {
        "file": "content/knowledge/interviews/010-ivanka-trump-on-building-an-authentic-life.md",
        "title": "Ivanka Trump on Building an Authentic Life",
        "principle": "Know who you are before you build; a life and company authentic to you escapes competition and is the least replicable thing you can make.",
        "keyLessons": [
          "Escape competition through authenticity (Naval): \"if you're competing it's because you're copying.\" Know yourself first, then build for yourself — the common thread she saw across Rick Rubin, Dana White, and Ed Catmull.",
          "The reset: after government she refused to reconnect old wires — deliberately not restarting her fashion brand or the family business — spent ~6 months saying no, and rebuilt around mission-driven \"soul projects.\" Achievement no longer drives her.",
          "Instinct isn't innate — it's honed through reps and micro-wins (her early Brooklyn real-estate jobs); you can't outsource the major decisions of your personal or professional life.",
          "Engineer stillness. A contemplative morning routine (ocean, prayer, reflection) is a deliberate discipline against device-driven reactivity — the Eureka ideas come precisely because you're alone with your thoughts.",
          "Books are mentorship: an 80-year-old distills a lifetime into a $30 book — \"mentors in books and historical context\" (the Elon anecdote; Carnegie's free libraries and Kelly Johnson). Man's Search for Meaning and Shoe Dog recur.",
          "No contract protects you from a bad partner — partner on character. A handshake with a good person beats the most ironclad contract with a bad one, and \"less and better\" means finding the one thread that matters (Sam Zell's \"there's one,\" via Jay Pritzker).",
          "Find opportunity where others see nothing: Planet Harvest turns the 40% of cosmetically-rejected produce into an asset (\"contrarian by being obvious\"). Back fragile, audacious new ideas and bet on the founder, not just the idea."
        ],
        "youtube": "https://www.youtube.com/watch?v=VhsiMd9ZFNk",
        "guest": "Ivanka Trump"
      },
      {
        "file": "content/knowledge/interviews/011-tobi-l-tke-21-years-of-building-shopify.md",
        "title": "Tobi Lütke: 21 Years of Building Shopify",
        "principle": "Don't cosplay orthodoxy — build from your own axioms and intuition; differentiation, not imitation, is the only path to excellence.",
        "keyLessons": [
          "A company is social technology — a socially acceptable \"excuse\" to go all-in and run the counterfactual to the world you see, means-tested by the market (and self-financing when the market pulls the real product out of your project).",
          "Stop cosplaying. Imitation caps you, so engineer the company from your own axioms: Shopify OS models the org with a SAT solver / desired-state system, making tradeoffs legible (50 more salespeople = fewer engineers) and removing politics.",
          "Hire for spikiness, not well-roundedness (Ogilvy: talent lives among \"non-conformist dissenters\"). Seek high-agency \"founders\" and put these wonderfully discontent \"irritants\" on top — don't cocoon them in \"founder daycare.\"",
          "Rivalry, not competition — mimicry never reaches excellence (Agassi/Sampras). \"Make it different, even if it's worse\" (Dyson, Edwin Land): from a blank slate you own the first version and can iterate past a copied 7/10 (the SpaceX Raptor evolution as a team masterpiece by subtraction).",
          "Create environments, don't prescribe. No \"corporate babyproofing\"; change the environment so the right thing is intuitive, then trade accountability for autonomy through prototype→build \"phase transitions.\" The way you do anything is how you do everything — down to Norman doors.",
          "Change your identity deliberately. The brain is a \"retrospective narrative alignment mechanism,\" so affirmations and message-in-a-bottle spaced repetition genuinely work; and change your mind the moment better information arrives — consistency isn't the job.",
          "Control costs and build a company worth working for. He built a $200B company in his wife's childhood bedroom (his father-in-law once covered payroll); talent takes care of itself because there aren't many truly great companies — so tie every person's work back to the mission."
        ],
        "youtube": "https://www.youtube.com/watch?v=ZSM2uFnJ5bs",
        "guest": "Tobi Lütke"
      },
      {
        "file": "content/knowledge/interviews/012-how-brad-jacobs-built-8-billion-dollar-companies.md",
        "title": "How Brad Jacobs Built 8 Billion-Dollar Companies",
        "principle": "Treat problems as opportunities, get the major trend right, hire people smarter than you, and repeat one disciplined playbook everywhere.",
        "keyLessons": [
          "Problems are opportunities and workloads — embrace them and run to the fire. A relentlessly positive inner monologue is a real advantage, one Jacobs rebuilt through two years of cognitive therapy after perfectionism drove him into clinical depression.",
          "Get the major, long-term trend right (his mentor Ludwig Jesselson). For two million years that trend has been technology, so rule out industries AI/automation will soon disrupt (his Chegg call) and invest heavily in tech even in \"boring\" ones — Carnegie's steel, Walmart's $500M 1979 computer bet, Zara as \"a technology company with stores attached.\"",
          "Run the repeatable playbook: pick a large, growing, fragmented industry you can buy into at reasonable (not cheap) prices, buy well (a spread between your cost of capital and where you deploy it), then double EBITDA in 3–5 years via pricing, procurement, compensation, and technology.",
          "People are everything — the CEO's most important job is recruiting superlative people. Use the \"would I feel terror if they quit?\" test to sort A/B/C players, and screen hard for raw intelligence plus human qualities (honest, hardworking, collegial, all-in).",
          "Align incentives ruthlessly: make everyone a partner with equity that vests over five years (most in the last two). \"Show me the incentive and I'll show you the outcome\" (Munger) — and always understand what actually motivates the other person.",
          "Build intense, unfiltered feedback loops. Crowdsource meeting agendas (pre-reads, not PowerPoints; rate questions 1–10, discuss only 8+), ask the frontlines \"what's the stupidest thing we do?\", and go public partly for the free, brutal advice of the smartest allocators.",
          "Be absolutely brutal with your time — WATWAM (\"waste of time, waste of money\"). Run every decision through two levers (grow the top line faster than the market and expand margins), then go all in, because you only get one shot at life."
        ],
        "youtube": "https://www.youtube.com/watch?v=3WXZg4_xcGs",
        "guest": "Brad Jacobs"
      },
      {
        "file": "content/knowledge/interviews/013-the-marketing-genius-of-steve-stoute.md",
        "title": "The Marketing Genius of Steve Stoute",
        "principle": "Run toward the unknown when it beats the known, and give creators ownership: if artists knew their fans, they wouldn't need a label.",
        "keyLessons": [
          "**Bet on the education, not the paycheck.** At 29, at the peak of a ~$2M-a-year music career, Stoute took a $150K job (plus 20% equity he didn't even value) at the Arnell Group purely to learn advertising from the inside: \"I wasn't even betting on the equity. I was really betting on the education.\" He immersed himself \"not by studying it, by quitting and doing it.\"",
          "**When the unknown is a better option than the known, run toward the darkness.** The CD business was extracting $16.99 for one good single and would inevitably \"cave in\"; advertising still looked at people through \"black, white, Hispanic\" instead of shared values. He ran at the unknown because the known was going the wrong way.",
          "**Everything is advertising, and the formats are arbitrary.** A music video is just a TV commercial for a song; he had music-video director Hype Williams shoot a Reebok spot when nobody thought that was allowed. Sell shared values (skateboarding, the culture), not demographics — \"black consumers are the best consumers in the world because they buy products that aren't marketed to them.\"",
          "**Own the customer and the IP.** Labels never negotiated fan data from Spotify because direct artist-to-fan contact would make them obsolete. UnitedMasters was built to invert the economics and give artists ownership plus CRM/direct-to-fan tools: \"If the artists knew who their fans were, they wouldn't need a record company at all.\"",
          "**Bet on yourself over the guaranteed check.** An 18-year-old LeBron walked away from a $10M signing bonus to bet on himself; Russ turned down $200M for his catalog; Ryan Coogler made *Sinners*' rights revert to him. Ownership compounds — \"his unborn grandkids are already rich.\"",
          "**Repetition is persuasive.** You can't buy a single ad on Stoute's or Senra's podcasts — partners commit to a year or many years — because awareness compounds: \"If I got a 50/50 shot because you already heard it, I love those odds.\"",
          "**How you do anything is how you do everything.** Signing Kobe to a rap deal, Stoute watched him shoot 1,000 shots and study Jordan tape; great athletes keep pristine lockers because \"how they play on the court is how they make sure their locker looks.\" Build at the convergence of culture, technology, and storytelling — held together by empathy and a willingness to not take credit."
        ],
        "youtube": "https://www.youtube.com/watch?v=kpgn7DCiJPE",
        "guest": "Steve Stoute"
      },
      {
        "file": "content/knowledge/interviews/014-tony-xu-of-doordash-surviving-1-000-days-of-startup-hell.md",
        "title": "Tony Xu of DoorDash: Surviving 1,000 Days of Startup Hell",
        "principle": "The data you can't see is what kills you: do the work yourself, run relentless experiments, and control what you can control.",
        "keyLessons": [
          "**Ship the most minimal MVP imaginable to test demand.** PaloAltoDelivery.com was built in 43 minutes: a $9 URL, a static page of eight PDF menus, a Google Voice number that rang the four founders' cell phones, and Square dongles for payment. Prove people care before you build anything real.",
          "**Do things that don't scale, and do the work yourself.** The founders did every delivery. That's how you discover a delivery decomposes into ~20 steps, each with hidden delays — \"it's always the data that you can't see that kills you\" (you dodge the truck you can see; the one you can't is the one that hits you).",
          "**Chase organic need, not obvious density.** They started in suburban Palo Alto, not dense San Francisco — and found deliveries were *faster* there (easy parking, single-family homes, hub-and-spoke layout). Product-market fit is someone wanting your product organically (busy moms, young families), not demand inflated by discounts and marketing.",
          "**Build a system that learns.** DoorDash runs tens of thousands of experiments; ~95% fail before a customer ever sees them, but the 5% that work compound for everyone the next year. The loop: do things that don't scale → form hypotheses → experiment → ship → engineer the winners, keeping the loop as tight as possible.",
          "**Earn trust every day; the scoreboard resets to zero.** After a September 2013 Stanford-game meltdown (late on every order, weeks from broke), they refunded every customer unasked — ~40% of the bank account — then baked cookies and delivered them at 5 a.m. \"We'd rather die trying to be excellent than live to be mediocre.\"",
          "**Control your psychology through the hell.** Through three years and 100+ investor rejections (he stopped counting at 50) while every internal metric improved, Xu obsessed only over what he could control — grow share AND get profitable AND don't run out of cash, an \"and\" not an \"or\" — leaned on genuine friendships and a mission bigger than himself, and kept constants like exercise and date nights. He still doesn't watch the stock price.",
          "**Hire Rhodes Scholars who are also Navy SEALs.** He screened for bias for action: the interview was $20 and 8 hours to acquire 100 customers (with a plane ticket offered to quit on the spot); engineers were interviewed while doing deliveries in his Honda. Look for lowest-level detail, holding opposing ideas at once, \"followership,\" and an obsession with getting 1% better. Run the core business and invent the next one as two separate systems — a mid-air engine transplant on the big airplane while launching paper airplanes that search for product-market fit."
        ],
        "youtube": "https://www.youtube.com/watch?v=a8LWEMD9VJA",
        "guest": "Tony Xu"
      },
      {
        "file": "content/knowledge/interviews/015-michael-dell-dell-technologies-david-senra.md",
        "title": "Michael Dell, Dell Technologies | David Senra",
        "principle": "Take things apart until you understand them: curiosity finds the structural cost edge, and belief comes before ability.",
        "keyLessons": [
          "**Take things apart to understand them.** Dell disassembled the IBM PC — often before ever turning it on — and saw that none of the chips, disk drives, or power supply were made by IBM; they were all off-the-shelf parts. He mapped the cost of every component against IBM's markup. Curiosity that \"peels the onion\" and keeps asking the next question is the engine of the whole business.",
          "**Win on a structural cost advantage.** Compaq's operating costs were 36% of revenue; Dell's were 18%. Selling direct, Dell shipped a faster computer for $795 while Compaq sold a worse one for $1,500 through retail. As *Hardball* puts it: drive down your cost faster than competitors can and use the savings to upset their strategies.",
          "**Engineer a negative cash conversion cycle.** With almost no capital, Dell shrank inventory to ~5 days while rivals carried ~90 days across dealers and distributors — and got paid by customers before paying suppliers, so growth *generated* cash. Since component prices keep falling, five-day inventory costs less than ninety-day (you could read the week-code stamped on a chip, e.g. \"4292\" = 42nd week of 1992), giving fresher tech and a tighter feedback loop on top. Advantages stacked on advantages.",
          "**Belief comes before ability.** At 19, with $1,000 in a University of Texas dorm room, Dell set out to beat IBM, the first $100B company on earth. \"Was I a little full of myself? Sure. I think you have to be to do anything important.\" The formula is naivety (you don't yet know why it can't work) plus confidence — never arrogance, and never silencing the little \"what if it doesn't work?\" voice.",
          "**Most founders aren't beaten by competitors — they sabotage themselves.** Fatal errors, overzealous expansion, design mistakes, misreading the competitive landscape (and Munger's \"ladies, liquor, leverage\"). Guard against it by making mistakes small and fixing them fast — beware the Osborne effect, where announcing a better product kills sales of the one you have.",
          "**Reinvent or die, and if there's no crisis, make one.** Dell told the whole company that within five years a faster, more capable competitor would put them out of business \"and the only way to prevent that is we are going to become that company\" — then reset Dell around AI after ChatGPT. He's navigated six or seven technology shifts in 41 years, and the timeframes keep shrinking. Distrust experts (Ford: \"fill your competitor's ranks with experts\"); create the future through iteration, not prediction.",
          "**If you have an edge, shut up about it — bad boys move in silence.** Being dismissed as a \"mail order company\" and a \"garage operation\" was rocket fuel; competitors who misunderstood Dell's direct model couldn't respond to it. Don't educate your competitors, and let being underestimated compound in your favor."
        ],
        "youtube": "https://www.youtube.com/watch?v=9WSsLSq40Yw",
        "guest": "Michael Dell"
      },
      {
        "file": "content/knowledge/interviews/016-building-pixar-working-with-steve-jobs-and-cultivating-creat.md",
        "title": "Building Pixar, Working With Steve Jobs, and Cultivating Creativity | Ed Catmull",
        "principle": "Put the problem, never who's right, at the center: candor works only when you strip authority from feedback and manage the room's dynamics.",
        "keyLessons": [
          "**Build a mechanism for candor — the Brain Trust.** Most companies claim to seek truth but are \"full of [it]\": leaders end up surrounded by people telling them what they want to hear. The Brain Trust keeps every discussion about the *problem*, never about who's right, and gives feedback with no authority attached — directors critique each other's films but can't mandate a single change.",
          "**Manage the dynamics, not the movie.** Catmull defined his job as \"observe and manage the dynamics\" so people work well together. People with power — real or perceived — must \"shut the hell up for the first 10 to 15 minutes\" so they don't set the tone. Do it right and, once or twice per film, \"magic happens\": ego leaves the room and the group hits flow.",
          "**Value disagreement; there's no upside in being wrong.** Steve Jobs fired two Pixar board members in ten years because they never disagreed — \"if they don't disagree with me, they aren't bringing any value.\" Jobs was even banned from the Brain Trust because his powerful, articulate voice would dominate the room; he served instead as an \"outside force\" at board screenings, jarring loose the fragile idea built up in a director's head.",
          "**Embrace that early work always sucks — and judge by the spirit of the team.** Every film starts ugly and broken. The signal to keep going isn't the cut; it's whether the team is working well together, \"laughing and angsting\" together. Pixar finished 21 of the 22 films it started. And take the *hard* problem: difficulty is what makes a result non-derivative — \"a movie about a rat that wants to cook; nobody's going to copy it.\"",
          "**The director can't lose the team, and quality is the best business plan.** A director can fail many ways, but the one fatal failure is losing the team's faith; most behind-the-scenes work is shoring directors up. Pixar had no mission statement (\"a mission statement is an answer when we should always be asking questions\") and was often the highest-cost producer — the opposite of Jack Welch's growth-rate-over-quality model that left GE and Boeing fragile.",
          "**\"How much of this was me?\" is the wrong question.** Trying to answer it is \"an act of separation\" — bad for the work and bad for your soul. The right question is \"how much can I do *with* others?\" Share knowledge freely (in his Lucasfilm interview the first question was \"who else should we be talking to?\" — he named people while insecure rivals hoarded), and assume you're wrong half the time so you catch bad decisions sooner.",
          "**Refuse to let anyone feel second-class, and keep the tent wide.** Pixar worked hard to make technical people and artists genuine peers — \"we're all on this to make really great movies.\" These problems are subtle and fester in silence (the sense of fun that faded as founders had kids and went home early); fix them with bottom-up signals and instigators, not top-down edicts, and don't make a new rule after every mistake, which only teaches people to ask permission for everything. George Lucas modeled the positive-sum mindset — wanting the entire industry healthy, not just his own film."
        ],
        "youtube": "https://www.youtube.com/watch?v=6ffhW9WAUv0",
        "guest": "Ed Catmull"
      },
      {
        "file": "content/knowledge/interviews/017-caa-co-founder-michael-ovitz-failure-is-not-an-option.md",
        "title": "CAA Co-founder Michael Ovitz: Failure Is Not an Option",
        "principle": "Your edge is frame of reference—a lifetime of meetings and outcomes; compound it with integrity, follow-up, and refusing to fail.",
        "keyLessons": [
          "**Frame of reference is the compounding edge.** Longevity multiplies meetings, experiences, and outcomes until \"I've seen the movie before\"—an 80-year-old isn't twice as wise as a 40-year-old, he's \"10x.\" Ovitz runs a mental \"primitive AI\" that scans each new person against everyone he has ever met, which is how he spotted Nobu and Wolfgang Puck years before fame (\"he filled the room\").",
          "**Build the business on integrity.** In 1974 Hollywood, answering \"I don't know, I'm going to call you back\" instead of bluffing was unheard of; CAA ran on kept-word deals with no contracts and no leverage because \"it's so easy to trap people that lie—they never get the story right twice.\" Everyone took notes on everything; \"follow-up was the key to everything. You didn't even have to be smart.\"",
          "**In the mailroom, out-work everyone; running the company, do the opposite.** He beat 20 rivals by showing up at 6:30 for a 9:30 start and hoarding knowledge to \"eradicate every one of them.\" But leading CAA he flipped it: share everything, no egos, no politics, call even the mailroom staff \"partners\"—\"you can't be in your own rowboat, you've got to be on the big boat.\"",
          "**Curiosity is self-enrichment, not a means to money.** He subscribed to 210 magazines—including women's fashion titles, because \"the stylists are six months ahead of the curve\"—so he could talk cars with Paul Newman or film with any director. \"Knowledge is power… you have an edge that cannot be beaten.\" Learning from history is leverage.",
          "**Dominate the market—be a monopolist.** \"You have to be number one and have the lion's share.\" CAA held 46 of the top 50 filmmakers and ~75% of the talent; he sold studios to Sony (Morita) partly to move CAA up the ecosystem, and reframed businesses the way Vanderbilt did (\"his business was transportation, not sailing\") and Coke did (35 seasonal, demographically-tailored commercials instead of six).",
          "**Failure is not an option and fear is the enemy.** Coming from the San Fernando Valley made it binary—\"I don't want to go back to the Valley\" was the most powerful motivator. \"Fear is the killer and enemy of business.\" In America, failure is a badge of honor: \"I'd rather be a do-something president who's criticized than a do-nothing president no one can criticize.\"",
          "**Learn directly from masters and spot how the greats absorb feedback.** He got \"a master's degree in film\" living above Scorsese and learned investment banking by doing deals with Herb Allen. His model is Morita, who turned a college senior's brutal 10-page product critique into a job offer (Ohga became Sony's president)—and David Rockefeller, who raised every dollar for MoMA's expansion without ever asking a trustee for a dime."
        ],
        "youtube": "https://www.youtube.com/watch?v=yhh-J0zVsik",
        "guest": "Michael Ovitz"
      },
      {
        "file": "content/knowledge/interviews/018-evan-spiegel-snapchat-building-a-multi-billion-dollar-compan.md",
        "title": "Evan Spiegel, Snapchat: Building a Multi-Billion Dollar Company",
        "principle": "No moat exists in software, so invest only in what is hard to copy—network effects, owned hardware, and a clear product vision.",
        "keyLessons": [
          "**There is no moat in software, so invest in what is hard to copy.** Facebook's Poke clone was the wake-up call; ever since, Snap has built network effects, the AR/lens platform, a creator ecosystem, and owned hardware—\"we've been engaged in trench warfare with monopolies for 15 years.\" The corollary: AI is \"the best thing that's ever happened to Snapchat\" because it erases the resource gap against rivals with \"infinite resources but no new ideas.\"",
          "**Network-effect value isn't node count—it's whether the people you actually talk to are on it.** \"You don't need 500 friends on Snapchat, you just need your best friend\"; one close friend can be half your communication, which let Snapchat accrue value fast against far larger networks.",
          "**Vision is seeing the product before it exists.** \"If I can't see it, then we're off track.\" Like Land and Jobs staring at an empty table, he practices \"technology in service of a product vision\"—organizing the team to invent whatever the vision requires—rather than chasing a technology. It's why Snap bet on AR while everyone else bet on VR, and shipped vertical video and Spectacles years early.",
          "**The hard part is delivery and consistency, not the vision.** \"A lot of people have different visions for the future… the hard part is delivering it.\" Stories went unused for the first six months before exploding; determination and consistency separated Snap from everyone who merely \"saw\" the future.",
          "**Kind is not nice.** Snap's values are \"kind, smart, creative,\" and kind comes first: \"nice is about making people feel good; kind is about wanting the best for them,\" which requires hard feedback. Fear \"is almost the opposite of creativity,\" so a kind culture is the most fertile ground for it.",
          "**The best way to have a good idea is to have lots of ideas.** Weekly design reviews churn through hundreds of concepts of which fewer than 1% ship; \"the most toxic thing is people attached to an idea.\" Focus is his \"primary role\"—and to surface problems he stole Walmart's Friday \"In It to Win It\" meeting so any leader can raise a broken \"shopping-cart ball bearing\" company-wide.",
          "**The motive is control and creation, not money.** He sold ~$10M of stock early so \"money was no longer a consideration,\" then refused multi-billion-dollar offers at 22 because selling meant compromising the vision—\"you should never sell your best idea.\" Reframe stress as opportunity (Herb Kelleher: \"I don't handle it, I like it\"), and be your own \"explainer chief,\" because the founder is \"the guardian of the company's soul.\""
        ],
        "youtube": "https://www.youtube.com/watch?v=Sr6n-9mzYnk",
        "guest": "Evan Spiegel"
      },
      {
        "file": "content/knowledge/interviews/019-how-todd-graves-built-raising-canes.md",
        "title": "How Todd Graves Built Raising Cane's",
        "principle": "Do one thing better than anyone and keep control of your baby; the distracted never beat the focused, and money follows service.",
        "keyLessons": [
          "**Focus isn't simple—it's what lets you obsess over every detail.** A single product means Cane's can perfect the bird's species and weight, a 24-hour brine, crinkle fries (with the black sugar-tips removed), pull-apart bread, and tea sourced from three countries—the \"cravability\" that drives repeat business. Cutting quality to save a penny is \"death by a thousand cuts\" in a business that makes ~10 cents on the dollar.",
          "**The distracted don't beat the focused.** Competitors add items, LTOs, and 100 sauces; Cane's keeps a 2:35 drive-thru where \"every two seconds faster is a point on sales\" (~$60M on $6B). \"Frequency beats variety\"—people don't want the homework of a giant menu; \"do one thing and do it better than anybody else\" (the In-N-Out model, same menu since 1948).",
          "**Bad advice is fuel.** He got the worst grade in his business class (the concept \"won't work\") and was rejected by every bank—\"the best thing an aspiring entrepreneur can be told is 'I don't think you can do that.'\" \"Nothing ever happens unless someone pursues a vision fanatically.\"",
          "**How bad do you actually want it?** To fund the first store he worked 95-hour boilermaker weeks, hitchhiked to Alaska, and fished sockeye salmon on a boat where men were scalped and boats sank—\"I wasn't thinking about salmon, I was thinking about my chicken finger dream.\" He and his partner swore a campfire oath: \"retreat is not an option.\"",
          "**Never sell; keep control and stay in the details.** Private equity \"takes founders out of the deal,\" and a founder treats the business as personal (\"it's your baby\")—Trader Joe's Joe Coulombe and Kinko's Paul Orfalea both publicly regretted selling. Delegation is a myth: \"you don't delegate—you hire great people, supplement them up to a 95, then back off only once they exceed you,\" and \"if we lose the details we lose everything\" (Disney).",
          "**Purpose over money; money follows service.** \"God made me good at chicken fingers to help people\" (75,000 crew). Be sales-driven, not profit-driven—\"sales cures all woes\"—because \"money comes naturally as a result of service\" (Henry Ford). The business must be \"natural\" to the creator, not merely authentic (his co-founder left because fry-cooking didn't turn him on).",
          "**Survival is the win—turn disasters into assets.** Over-levered with subordinated debt at 28 stores, Katrina knocked out 21 of them; he rallied the team, reopened in New Orleans 30 days after the storm as the only restaurant in town, and swore never to over-lever again. He ran the same playbook in COVID (three drive-thru lanes)—\"victory in our industry is spelled survival\" (Jobs)."
        ],
        "youtube": "https://www.youtube.com/watch?v=B5rRIdQKB0A",
        "guest": "Todd Graves"
      },
      {
        "file": "content/knowledge/interviews/020-the-future-of-software-ai-cognition-s-scott-wu.md",
        "title": "The Future of Software & AI | Cognition’s Scott Wu",
        "principle": "A startup has no right to win except by a concentrated first-principles bet on the future, run like hell—and a refusal to sell.",
        "keyLessons": [
          "**A startup has no right to win—so plant a flag and run like hell.** With none of the resources, people, or brand of the incumbents, the only way to win is to \"put a stake into what you think the future is and run like hell towards that.\" Cognition's stake—AI as a co-worker, not a chatbot or autocomplete—was contrarian in 2024 but became the industry's direction.",
          "**Think from first principles in the 1% of times things actually change.** Pattern-matching (\"it's always been like this\") works 99% of the time and fails exactly when it matters. AI agents' autonomous work-length has doubled every few months (from ~10-20 seconds to hours); ask \"why can't that be days, weeks, a year?\"—then reason about the world that implies.",
          "**Release early to plant the flag.** The viral March-2024 Devin demo drew heavy hate but scored 13% on SWE-bench versus a 3-4% state of the art; being first to credibly own \"the AI software engineer\" mattered for brand, recruiting, and customers—even though \"a lot of things we were wrong about.\"",
          "**Find the natural first PMF task, then do whatever it takes.** Not the hardest problems and not the trivial ones, but repetitive-yet-not-scriptable work (migrations, version upgrades). The first paying win—Nubank—meant flying the entire company to Brazil: \"we didn't deploy a team, we deployed the whole company.\"",
          "**Focus and be Switzerland.** Care about software end-to-end more than anyone (Daniel Ek: \"we're just going to care way more about music than they are\"), stay neutral across model labs, and route each subtask to the best or cheapest model—a \"compound model system\" incentive-aligned with customers on ROI, not token spend.",
          "**Infinite opportunity means stay independent.** \"All business is an idea that makes somebody else's life better\" (Branson), so there are infinite niches and \"10 more generations of product experiences to come\"; the nihilists who say \"the labs will do everything\" simply \"aren't founders\"—founders are rationally optimistic, believing they'll succeed with no evidence they should.",
          "**There is no price—one life, go.** Like Jobs refusing $2T to leave Apple or Todd Graves turning down acquisitions, the motive isn't money (Wu has no car, rents an apartment, \"I like eating sushi\"). What drives him is potential: \"we'd rather find out\" whether they could have built the generational thing than live with never having pushed all the way."
        ],
        "youtube": "https://www.youtube.com/watch?v=PYobZzjW_ic",
        "guest": "Scott Wu"
      },
      {
        "file": "content/knowledge/interviews/021-bootstrapping-a-business-to-5-billion-in-free-cash-flow-appl.md",
        "title": "Bootstrapping a Business to $5 Billion in Free Cash Flow | AppLovin’s Adam Foroughi",
        "principle": "Ruthless efficiency—a few A-players plus a product that makes customers measurably richer—beats VC money, headcount, and a sales force.",
        "keyLessons": [
          "**Buy your own stock when conviction and price diverge.** When AppLovin fell 92% (from $115 to $9, a $3.8B market cap against $1B+ of EBITDA — roughly 5x cash flow), Foroughi levered up and deployed ~$6B in buybacks, buying directly from private-equity holders he knew would sell. That returned ~$50–60B. \"I never believed in saving cash for a rainy day.\"",
          "**The product was the recommendation algorithm, not the app.** After a dating app and a fashion app \"stunk,\" the third app (App discovery) also flopped — but its recommendation engine drove insane download rates. He stripped away the consumer layer and relaunched the algo as an ad platform in March 2012; by November it was at a $1M/month run rate.",
          "**Make the advertiser an arbitrageur.** Rather than chase brand budgets like AdMob (\"handwavy,\" sales-driven, \"the biggest cut goes to the folks wining and dining the client\"), AppLovin sold performance to developers: spend $1, know with certainty you made more than $1. The only limit on a customer's scaling becomes the cash in their bank account. \"I want to be in the business of no sales, high-value product.\"",
          "**Bootstrap until you have conviction; don't sell investors an idea you don't believe.** He set the company up as an LLC for tax-efficient bootstrapping, funded it himself through 18 months of pivots, and didn't take VC money until product-market fit was proven — then had no board for six years (until KKR in 2018).",
          "**Hire people with a chip on their shoulder.** He deliberately recruited \"outcasts\" with a reason to push hard — like Raph, a high-school dropout who lived in the office and has worked alongside him for 18 years. Foroughi's own chip: his family was uprooted from Iran, where his father had lost a real-estate empire. \"If life was really easy for them, those were not people I was going to introduce to the company.\"",
          "**Stay lean and refuse to backfill.** Every new hire needs his personal approval; killing automatic backfills cut hiring from hundreds a year to tens. A ~$140B company runs on a four-person C-suite (CEO, CFO, CTO, General Counsel) — no CRO, no COO. Put A+ leaders with zero tolerance for mediocrity in charge and they police talent for you.",
          "**AI makes the gap non-linear — one great engineer beats a hundred.** With over 80% of code now LLM-written, \"your 10x engineer might be 100x more efficient.\" He won't hire a sales force ahead of that leverage; AXON 2.0 (deep learning, April 2023) was the inflection that took the stock from ~$9 to a ~$250B peak."
        ],
        "youtube": "https://www.youtube.com/watch?v=SCBFXL_Sn44",
        "guest": "Adam Foroughi"
      },
      {
        "file": "content/knowledge/interviews/022-my-conversation-with-patrick-oshaughnessy-founder-of-colossu.md",
        "title": "My Conversation With Patrick O'Shaughnessy, Founder of Colossus & Positive Sum | David Senra",
        "principle": "Betting on talented people before the world does is the highest-return act; grow without goals and run on clean fuel, not resentment.",
        "keyLessons": [
          "**Championing undiscovered talent is the highest-return act.** Patrick's favorite thing in the world is to \"audition people to see if there's something I see that no one else sees,\" build a relationship, then \"help everyone else see what I think I see.\" He feels others' wins \"deep in my soul\" in a way his own accolades never register.",
          "**Growth without goals.** \"Everything interesting I've ever done came out of left field.\" Patrick keeps neither long-term nor short-term goals; his most-read essay was literally titled \"Growth Without Goals.\" He stays radically open to opportunity instead of chasing a big hairy audacious goal.",
          "**The point of existence is to help other people.** A passage in the Upanishads hit him \"like a hammer to the face\": those who feed the hungry are protected, those who don't are consumed. When a listener tallied years of \"what's the kindest thing anyone's ever done for you?\" answers, two-thirds were the same — \"someone bet on me before I deserved it.\"",
          "**Be a professional learner — steal the best ideas and just apply them.** Patrick built OSAM's software by taking ideas from three people (Daniel Ek on building software, Brett Victor on what great software is, Chetan Puttagunta at Benchmark on selling it), \"not thinking too hard about what they tell me and just doing it.\" Podcasting is the unfair advantage: study someone, talk for hours, take the idea.",
          "**Seek understanding, not speed.** David reads at \"25 pages an hour\" — he wants \"understanding of how things actually are, not how humans say they are.\" Autobiographies of the old and dying matter because they're \"not incentivized to lie,\" and their stories aren't about them — \"it's about you.\"",
          "**Make your own recipe from the ingredients of great lives.** Don't try to live like one person; \"screw base rates — the most interesting stuff is outliers by definition.\" Take ingredients from many studied lives and compose something new rather than inheriting their pitfalls.",
          "**Clean fuel beats dirty fuel.** Nearly every founder David studies ran on \"dirty fuel\" (resentment, something to prove) — it works but consumes the person (LBJ never escaped it; Springsteen only did after 25 years of therapy). Make ambition generative: \"I'll be successful because I love it... money will come as a result because it's an act of service.\"",
          "**Relationships run the world.** A four-hour dinner with Daniel Ek is what pushed David to start the show; deep personal relationships open doors money can't (filming this episode free at the Aman). Go for fewer, deeper relationships — \"at least a hundred hours of conversation\" to truly know someone."
        ],
        "youtube": "https://www.youtube.com/watch?v=E8B-P1oGuz4",
        "guest": "Patrick O'Shaughnessy"
      },
      {
        "file": "content/knowledge/interviews/023-john-mackey-44-years-of-building-whole-foods.md",
        "title": "John Mackey: 44 Years of Building Whole Foods",
        "principle": "Build as a missionary, not a mercenary—never fight the low-cost rival on price, compound in your niche, and turn competitors into allies.",
        "keyLessons": [
          "**Missionary vs. mercenary co-founders — buy out the mercenary.** His first partner, Mark, wanted to keep one profitable store and \"not screw it up\"; Mackey wanted to change how America eats. That philosophical mismatch was irreconcilable, so he bought Mark out. \"Missionary founders make better, longer-term decisions.\" (He notes Rockefeller called buying out his early partners one of the best decisions of his life.)",
          "**Never fight the low-cost provider on price.** Conventional supermarkets made \"the drastic mistake of trying to compete on price\" with Walmart — sterile warehouse stores, cheap lighting, labor cut to the bone — and still lost. Whole Foods went the opposite way: quality, service, beautiful stores, differentiated mix. Compete on a different axis entirely.",
          "**Compound quietly while rivals are distracted.** The supermarkets were \"hypnotized by Walmart\" and ignored Whole Foods for 20–25 years (until Columbus Circle opened in 2004). That neglect was the gift: \"We were running downfield wide open for the touchdown pass\" — time to scale and compound before anyone copied him. (No patents in retail; scale was the only moat.)",
          "**VCs are \"hitchhikers with credit cards.\"** Useful to get somewhere you couldn't reach alone, but they play a blockbuster/exponential game and pressure founders to scale too fast, often wrecking a perfectly good business. Once Whole Foods went public and had its own capital, \"they got out of the car.\"",
          "**Turn rivals into a network of \"secret allies.\"** Mackey sought out the handful of other natural-foods pioneers, flew to meet them, and built the Natural Foods Network — missionaries who literally traded financial statements and information, made each other better, each owned a geographic niche so they never competed head-on, and many of whom he ultimately acquired.",
          "**Grow by acquisition to buy a geographic platform.** Building a team cold in a new region is slow and expensive; instead he bought a small existing chain (six or seven stores) in LA, Boston, DC, Florida, and North Carolina to get an instant team and local know-how, then expanded from that platform.",
          "**De-risk the pitch with working prototypes, and watch costs hardest in the good times.** Studying Mrs. Gooch's (doing ~10x SaferWay's sales by adding fresh meat and produce) revealed the scale opportunity and let him tell investors \"it's working in LA, Boston, San Diego — why won't it work in Austin?\" He told David that if Founders had existed when he was young, Whole Foods might still be independent — he'd have prioritized cost control, since booms make everyone stop watching spend."
        ],
        "youtube": "https://www.youtube.com/watch?v=U8zqsiePKsg",
        "guest": "John Mackey"
      },
      {
        "file": "content/knowledge/interviews/024-brian-armstrong-when-washington-tried-to-kill-coinbase.md",
        "title": "Brian Armstrong: When Washington Tried to Kill Coinbase",
        "principle": "A long-term mission simplifies the hardest calls—even suing your regulator—and a founder's edge is knowing he could rebuild from scratch.",
        "keyLessons": [
          "**A long-term mission simplifies the hardest decisions.** After the SEC stonewalled Coinbase — 30 meetings, \"just tell us the rules,\" met only with \"go talk to your lawyer\" and then an enforcement action the next day — Coinbase did something almost no company does: it proactively sued its own regulator (under the Administrative Procedures Act). Brian knew it would scare investors short-term, but the mission made the call clear, and he'd checked that others (SpaceX vs. NASA, Palantir) had sued the government and won.",
          "**A real founder's edge is knowing he could rebuild it from scratch.** When his 2020 culture stand risked mass resignations, he was calm: \"I started it when it was just me on a laptop... I could go back to being on my laptop again if I had to.\" He cites Lee Kuan Yew's \"iron in my veins\" speech — the willingness to rebuild Singapore from nothing. That confidence is what lets a founder hold a hard line a caretaker CEO never could.",
          "**Draw a hard line on culture and accept the losses.** After 2020's unrest, Brian published a mission-first post: Coinbase focuses on economic freedom, not \"whatever the current hot social issue is,\" and politics stays out of the workplace. People begged him not to post it; he offered a generous exit package to anyone not aligned. Only ~5% left (he'd braced for 50%) — the opposition was \"a very vocal 1% minority.\"",
          "**Pick something you'd do for 20 years even with little success.** Coming off side hustles (tutoring, rentals) and reading Seth Godin's \"The Dip\" and Tim Ferriss, he literally wrote on paper the one thing he'd pursue for two decades regardless of outcome — tech entrepreneurship — then sold his rental properties and moved all-in to Silicon Valley.",
          "**The best ideas come from lived pain, not theory.** A year in Argentina (watching hyperinflation gut a country that had been \"the Paris of South America,\" fallen from a top-10 economy to ~100th) plus his Airbnb job exposing broken global money movement (7–12% fees; literally wiring $100 to see how much arrived) is what made the Bitcoin white paper land as the answer.",
          "**Talk to customers and ship the smallest thing they'll actually use.** The first Coinbase app couldn't buy or sell Bitcoin, and users didn't retain. He emailed three signups; one said, \"I just don't have any Bitcoin.\" Adding a simple buy button — YC's \"talk to customers, build the product, on repeat\" — is what created product-market fit: \"the boulder was rolling down the hill and you were chasing it.\"",
          "**Do the unglamorous thing to get unblocked, then raise on proof.** To open a bank account he paid $30k for a five-page legal opinion that he \"may not be a money transmitter,\" wrote the bank integration himself (FTP-ing files into an antiquated system), and got in via a YC intro to Silicon Valley Bank. When surging demand consumed his entire balance daily and the bank said \"raise money now,\" he closed a $25M round (USV and Ribbit) with a single up-and-to-the-right graph and no pitch deck."
        ],
        "youtube": "https://www.youtube.com/watch?v=WcrPOElyjiI",
        "guest": "Brian Armstrong"
      },
      {
        "file": "content/knowledge/interviews/025-from-near-death-to-a-20b-nvidia-deal-jonathan-ross-groq.md",
        "title": "From Near Death to a $20B NVIDIA Deal | Jonathan Ross, Groq",
        "principle": "Faster inference makes AI models smarter, and leaders move faster by declaring intent rather than asking opinions and inviting pessimism.",
        "keyLessons": [
          "**Speed is capability, not just convenience.** The same AlphaGo model jumped hundreds of Elo points simply by running on faster hardware, because more compute per move lets it explore second-best branches that occasionally win (the famous move 37).",
          "**Declare \"I intend to\" instead of asking for opinions.** Switching from \"should I do this?\" to stating intent stopped his team from talking him out of opportunities (he had let them kill multiple LLM deals) while still surfacing the objections that genuinely mattered.",
          "**Turn a cash crisis into shared ownership.** Weeks from running out of money, instead of laying off the engineers he needed to hit a critical milestone, he offered war-bond-style salary-for-equity swaps; about 80% participated, nearly half took minimum wage, buying roughly two months of runway and putting \"everyone's hands on the steering wheel.\"",
          "**Hire for negatives, grow for positives.** Keep a versioned \"people spec\" and, when selecting talent, screen for disqualifying negatives (squandering luck, maximalist design) because one person's negative infects the whole team; developing people means showing positives instead.",
          "**Hire reality quotient over IQ, then name the dominant game.** Look for people who recognize reality and can spot the game that actually wins (Facebook's monthly active users vs MySpace's sign-ups), then connect everyone's work to one brutally clear goal, like Groq's \"25 million tokens per second\" printed on a challenge coin.",
          "**Fewer constraints, more room to surprise you.** The less you constrain a talented person or an AI agent, the more freedom they have to find a better answer, but you must crisply distill the single thing that actually matters.",
          "**Manufacture discontent and seize your luck.** The best founders stay deliberately dissatisfied and grab the lucky breaks others dismiss; a founder's real job is full-time change management, making disruptive change feel like no change at all."
        ],
        "youtube": "https://www.youtube.com/watch?v=hwY4bfZN8E8",
        "guest": "Jonathan Ross"
      },
      {
        "file": "content/knowledge/interviews/026-roblox-s-david-baszucki-built-the-biggest-playground-on-eart.md",
        "title": "Roblox’s David Baszucki Built the Biggest Playground on Earth",
        "principle": "Build a perpetual motion machine: a closed-loop system where users become creators and an owned economy compounds virally for decades.",
        "keyLessons": [
          "**Build a perpetual motion machine.** Design a closed loop (download Studio, build an experience, publish it, others play) that grows on its own through user-generated content and word of mouth, not paid acquisition; the afternoon Studio went live, the variety of user creations went viral within hours.",
          "**Follow intuition over logic.** His two-year sabbatical mistake was \"logically\" applying to be CEO of companies he did not found; the magic of his first company had been invention, and Roblox only began when he returned to being a worldbuilder.",
          "**Build the clock, not the time.** It is harder to build a clock, but easier than telling you the time every day for 20 years, so build systems that keep working instead of doing the work over and over.",
          "**Capital efficiency is control of your destiny.** Roblox used under $10 million of equity to reach cash-flow break-even and never dipped below it, choosing patient long-view VCs and vertically integrating (own data centers, own game engine) to control cost, performance, and destiny, running at under a penny per user-hour.",
          "**Run the company as a system of companies.** Roblox operates as roughly nine semi-autonomous groups with single-threaded leaders, reconnected every week, plus a \"Roblox Operating System\" team that engineers how the company itself runs; maximize each group's autonomy, then glue them together horizontally.",
          "**Compound two viral loops and an owned economy.** Unlike YouTube's single content loop, Roblox compounds both content quality and social connection; the Robux economy (a second perpetual motion machine) turns hobbyists into entrepreneurs, with creator earnings now over $1 billion a year.",
          "**Invent an imaginary competitor and be that company.** Picture a rival that loves the space and would out-innovate you, then become it, because the real threat is complacency; performance and load times are themselves a growth feature, and early safety investment compounds into a moat."
        ],
        "youtube": "https://www.youtube.com/watch?v=osuOwvEhVfQ",
        "guest": "David Baszucki"
      },
      {
        "file": "content/knowledge/interviews/027-the-company-apple-couldnt-kill-spotify-co-ceo-gustav-s-derst.md",
        "title": "The Company Apple Couldn't Kill | Spotify Co-CEO Gustav Söderström",
        "principle": "Optimize for time well spent: prioritize the user over engagement metrics, and be great at the one thing that matters, average at the rest.",
        "keyLessons": [
          "**Hand over the real job before the title.** Daniel Ek made Gustav and Alex Norström co-presidents three years before the CEO transition, so they already ran the full P&L and balance sheet \"by heart\" when they took over.",
          "**There is no right org model, only trade-offs.** Pick the structure that fits your personality and optimize for what is important (Spotify's single super-app experience), accepting you will be average elsewhere; the worst outcome is being great at the unimportant thing.",
          "**Synchronize instead of divide-and-conquer.** Replace star-pattern one-on-ones with one weekly ~14-person, three-hour \"E-team\" meeting spanning every function, so no one can ever \"take it offline\"; it is expensive in time but stops the org chart from shipping in the product.",
          "**Functional orgs need long tenure and trust.** Apple's functional leads do not knife each other because of decades-long tenure; Spotify copied this (7-to-15-year tenures) while mitigating stale leadership with rising-star programs and occasional senior acqui-hires.",
          "**Align the business model with the user.** Subscription revenue (about 90% of Spotify's) means users pay for value they feel, not time captured, which frees Spotify from the ad-model incentive to maximize engagement at any cost.",
          "**Give users control of the algorithm.** Because AI finally lets computers understand plain English, rather than build the most addictive feed, let all 761 million users tell Spotify who they want to be (\"more classical, filter out rage bait\"), turning deep user research into a service for everyone.",
          "**Intercept the curve and always be first.** Spotify prepared for LLMs years early, buying Sonantic to generate cheap voice before models could even write the scripts; the scariest periods of change are also when you gain the most market share, so adopt change before rivals do."
        ],
        "youtube": "https://www.youtube.com/watch?v=qYnVDIgZxlI",
        "guest": "Gustav Söderström"
      },
      {
        "file": "content/knowledge/interviews/028-the-44-billion-company-building-self-driving-money-eric-glym.md",
        "title": "The $44 Billion Company Building Self-Driving Money | Eric Glyman, Ramp",
        "principle": "Invert your industry: help customers spend less money and time, not more, and run every process through question, simplify, then automate.",
        "keyLessons": [
          "**Invert your industry's core assumption.** The card industry won business by pushing points and rewards (spend more); Ramp inverted it to help customers spend less and save time, which forced entirely different questions, like why there are two systems to buy anything and why bills, procurement, and treasury each need a separate tool.",
          "**Run everything through Elon's algorithm.** For every movement of money, question whose requirement it is, simplify, cut unnecessary steps, accelerate, then automate; the products (cards, expenses, bill pay) are just scaffolding for delivering more value per dollar and hour.",
          "**Measure yourself on the customer's outcome.** A company-wide \"scoreboard\" of dollars blocked and hours saved sits on office walls, in Slack, and on the first slide to prospects, embodying \"we win when our customers win\" and Henry Ford's line that money comes as a result of service.",
          "**Hire for spikes and proof of work, not resumes.** Ramp recruited engineers who ran popular Minecraft servers as teenagers; because LLMs now let a determined generalist extend past their specialty, raw drive and aptitude beat credentials.",
          "**Find talent before the market prices it in.** Recruit the smartest freshmen rather than juniors to exploit a mispricing, give them outsized responsibility early, and keep them for a long time, because trust and tenure raise throughput per hour (Mr. Beast's operations lead Tyler; Buffett and Munger no longer needing to call).",
          "**Great design follows behavior, not requests.** Like the Breville toaster's single \"a bit more\" button, do not ask customers what they want in a toaster (you get 50 buttons), watch what they actually do; nobody wants to do expense reports, they want expenses to do themselves.",
          "**Focus on what does not change, and know your real competitor.** People will always want more from every dollar and hour (Bezos's timeless-things logic); Ramp's true competitors are the AI labs, because as intelligence becomes nearly free, an explosion of payments by people and agents needs a better substrate to control spend, which Glyman calls self-driving money."
        ],
        "youtube": "https://www.youtube.com/watch?v=lbGX3cbvMI4",
        "guest": "Eric Glyman"
      }
    ]
  }
};

export function getSourceCorpus(bookSlug: string): SourceCorpus | undefined {
  return sourceCorpus[bookSlug];
}

// Generous on purpose: this is a one-time cost per conversation (cached the
// same way figure grounding is), and a silent per-episode cutoff means
// most of a 40+ episode channel never gets cited. Log rather than truncate
// quietly if a corpus ever actually exceeds this.
const MAX_SOURCE_GROUNDING_CHARS = 150000;

/** Formats a channel's full corpus into the grounding block for its system prompt. */
export function buildSourceGroundingBlock(bookSlug: string): string {
  const corpus = sourceCorpus[bookSlug];
  if (!corpus || !corpus.episodes.length) return "";

  const header = [
    "## The corpus (cite these, invent nothing else)",
    "",
    `The following is every episode of ${corpus.title} synthesized into this system. Answer only from this material.`,
    "When you draw on an episode, cite it by title. Never cite an episode that is not listed here.",
    "",
  ].join("\n");

  let out = header;
  let dropped = 0;
  for (const ep of corpus.episodes) {
    const subject = ep.guest ? ` (with ${ep.guest})` : "";
    const head = `### ${ep.title}${subject}\nPrinciple: ${ep.principle}\n`;
    if (out.length + head.length > MAX_SOURCE_GROUNDING_CHARS) {
      dropped++;
      continue;
    }
    out += head;
    for (const lesson of ep.keyLessons) {
      const line = `- ${lesson}\n`;
      if (out.length + line.length > MAX_SOURCE_GROUNDING_CHARS) continue;
      out += line;
    }
    out += "\n";
  }
  if (dropped > 0 && typeof console !== "undefined") {
    console.warn(`buildSourceGroundingBlock("${bookSlug}"): dropped ${dropped} of ${corpus.episodes.length} episodes, over the ${MAX_SOURCE_GROUNDING_CHARS} char cap`);
  }
  return out.trimEnd();
}

const SOURCE_RESPONSE_RULES = `
RULES:
- You are not a person. You are a guide to this corpus. If asked whether you are an AI, say yes plainly; there is no character to stay in.
- Answer only from the corpus above. If the corpus does not cover something, say so rather than inventing an answer.
- Keep responses concise, 2-4 paragraphs max unless the question demands depth.
- Cite the specific episode you are drawing on, naturally, in the sentence (e.g., "In the episode on X...").
- Format source citations at the end of your response like: [Source: "Episode Title"]
- NEVER use em dashes or en dashes in your responses. Use commas, periods, or "and" instead.
- Write in a conversational, spoken style.
- After your main response, on a new line, suggest exactly 3 follow-up questions formatted as: [FOLLOWUP: question1 | question2 | question3]
`;

/** Full system prompt for chatting with a source's corpus directly, no persona. */
export function buildSourceSystemPrompt(bookSlug: string): string | null {
  const corpus = sourceCorpus[bookSlug];
  if (!corpus) return null;
  const grounding = buildSourceGroundingBlock(bookSlug);
  return `You are a guide to ${corpus.title}${corpus.host ? `, hosted by ${corpus.host}` : ""}. You answer questions using only the corpus of episodes below, nothing invented and nothing assumed from outside knowledge.

${grounding}
${SOURCE_RESPONSE_RULES}`;
}
