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
          "Know your numbers like a poet knows words: Rockefeller inspected every line of every bill and thought like an owner before he was one, because \"the good ones know more\" — success is an issue of effort and information, not talent.",
          "Find your highest-priority cost and build an edge there: transportation cost more than refining, so he sited refineries next to both rail and water and extracted secret railroad rebates that rivals accepted as fixed — \"all is not as it seems on the outside.\"",
          "Keep the deepest war chest: retain profits instead of paying dividends, borrow aggressively to grow (\"the greatest borrower I ever saw\"), and buy crude in huge lots at the bottom — \"we must try and not lose our nerve when the market gets to the bottom.\"",
          "Stack advantages into a flywheel: raise money to grow output, use size to win transportation rebates, use profits to buy competitors, and repeat — so each advantage makes the next one possible.",
          "Cooperate and control rather than compete: turn beaten rivals into willing, semi-autonomous partners (\"you cannot have a winning cooperation except by willing partners\"), building a company of founders instead of just crushing them.",
          "Change your mind when the facts change: after fighting pipelines with every weapon \"but violence,\" Rockefeller embraced them — even reversing his own rebate game to pay subsidies — because \"you cannot fight a technological phenomenon.\" And never sell the stock: \"let it feed upon itself.\"",
        ],
      },
      {
        file: "content/knowledge/founders/004-john-d-rockefeller-38-letters-rockefeller-wrote-to-his-son.md",
        title: "John D  Rockefeller: 38 Letters Rockefeller Wrote to His Son",
        show: "Founders Podcast",
        subject: "John D. Rockefeller",
        sourceBook: "The 38 Letters from J.D. Rockefeller to His Son by John D. Rockefeller",
        youtube: "https://www.youtube.com/watch?v=wLWBzHbD9jg",
        principle: "Belief comes before ability: destiny is determined by your actions, not your origins — build what you're proud of and never make excuses.",
        keyLessons: [
          "Belief comes before ability: the advice Rockefeller repeats most is relentless self-belief — \"as long as you work hard enough you will succeed\" — because your destiny is determined by your actions, not your origins.",
          "Struggle is an asset, not a handicap: great fortunes were built by people who succeeded because of, not in spite of, poverty, since hardship forges rare survival skills — while privileged children fail (\"shirtsleeves to shirtsleeves in three generations\") for lack of them.",
          "Be proud of what you build, not what you consume: \"a truly happy person is one who is able to enjoy his creation,\" and those who only take without giving lose their happiness — which is why he hid his wealth and drilled frugality and struggle into his children.",
          "Treat competition as war and rely on yourself: \"I do not meet competition, I destroy competitors,\" attacking a rival like Benson from every direction at once — \"crutches cannot replace strong and powerful feet.\"",
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
          "Run the algorithm in order: question every requirement (each must carry the name of a real person, never a department), delete the part or process, simplify, accelerate the cycle, and automate last — automating or speeding up something that shouldn't exist is the classic mistake.",
          "Cost is the master metric: the word \"cost\" appears 158 times in the book, and the \"idiot index\" (a part's finished cost versus its raw-material cost) exposes where design or process is adding waste to be stripped out.",
          "Go to the problem physically: fly to the source, stand on the factory floor, and never separate yourself from the pain of your decisions — product managers who can't build are \"cavalry generals who don't know how to ride a horse.\"",
          "Be hardcore and put the mission first: Elon set insane deadlines, slept under his desk, and would rather offend or intimidate than let camaraderie slow the mission — \"it's not your job to make people on your team love you.\"",
          "Showmanship is salesmanship: from the fake server tower at Zip2 to Tesla's product theater, one dramatic demonstration transfers belief, because \"the money flows as a function of the stories.\"",
          "If a design is hard to manufacture at volume, the design is flawed, and \"if a timeline is long, it's wrong\" — simplify and delete until physics, not the org chart, sets the limit.",
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
          "Attack cost with the “idiot index” — the ratio of a finished part's cost to its raw-material cost; a high ratio means the waste is yours to engineer away.",
          "Run the algorithm in strict order: make requirements less dumb, delete the part or process, simplify, accelerate, then automate — never accelerate or automate something that should have been deleted.",
          "The only true currency is time: a maniacal sense of urgency, speed as both offense and defense, and leading from the front line are how you win.",
          "Attract great people and remove organizational boundaries — a company is the vector sum of the people in it, and errors in your org structure always show up in the product.",
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
          "Design the company around yourself, not around best practice: Jensen chose a flat structure (60 direct reports, no one-on-ones, no COO) so information travels fast and people who can't act without being told what to do wash out — \"strategy is not words, strategy is action.\"",
          "Complacency kills: treat success as the enemy (\"we're 30 days from going out of business\"), refuse to dwell on wins, and benchmark work against the \"speed of light\" — the physical maximum — rather than competitors or last year.",
          "Criticize in public: Jensen gives feedback in front of everyone so the whole organization learns from a single person's mistake — \"we are not optimizing for not embarrassing somebody, we're optimizing for the company learning.\"",
          "Get information from the edge: the \"Top 5\" email forces every level to report their five priorities and what they see in the market, letting Jensen intercept weak signals (like early machine learning) before they surface in the numbers.",
          "Create markets instead of fighting for share: build where \"there are no customers and therefore no competitors\" (the \"$0 billion market\"), which produces pricing power — Nvidia is the rare chip company whose average selling prices rise over time.",
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
  "charlie-munger": {
    coverage: "full",
    sources: [
      {
        file: "content/knowledge/founders/011-400-pages-of-warren-buffett-and-charlie-munger-in-their-own-.md",
        title: "400 Pages of Warren Buffett and Charlie Munger In Their Own Words",
        show: "Founders Podcast",
        subject: "Warren Buffett and Charlie Munger",
        sourceBook: "Buffett and Munger Unscripted: Three Decades of Investment and Business Insights from the Berkshire Hathaway Shareholder Meetings by Alex Morris",
        youtube: "https://www.youtube.com/watch?v=t47NBQqlzbk",
        principle: "Think in opportunity costs, concentrate on a few wonderful businesses you understand, and let focus and compounding do the work.",
        keyLessons: [
          "Make decisions by opportunity cost: intelligent people think in terms of their alternatives, so you only act on something better than what you already have — which “simplifies life a great deal.”",
          "Concentrate, don't diversify: the whole secret of investment is finding the few places where it is safe and wise to not diversify, then “going in heavy” — while keeping a fortress of cash for the rare times “it rains gold.”",
          "Study extreme examples and ask “what in the hell is going on here?” — Munger calls this the way to wisdom (e.g., how State Farm became a top-three U.S. net worth starting from no capital).",
          "Learning means changing behavior, not memorizing: their costliest mistakes were of omission — selling Disney and Intel (Noyce) too early, and never buying Google or Amazon despite seeing the evidence firsthand at Geico.",
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
        principle: "The world is far more malleable than it looks — determined founders thinking from first principles can bend reality to their will.",
        keyLessons: [
          "The world is far more malleable than you think: pursue something with maximum effort, drive and energy and the world recalibrates around you. Jim Clark was the \"ultra version,\" reinventing himself from a \"self-described loser at 38\" into the founder of three billion-dollar companies.",
          "Zero introspection: great founders don't dwell on the past (introspection and therapy are a modern manufactured construct), and low neuroticism — not getting emotionally fazed — is a superpower.",
          "Founders beat managers (the core thesis): managers can run a status quo (\"soup is soup\") but can't adapt to change, while founders can learn to run at scale — \"you're much more likely to build something important by starting with a founder and training them on management than the reverse.\" Incumbent, manager-run institutions are collapsing because they can't adapt.",
          "Interrogate inherited assumptions from first principles: every industry accumulates unquestioned practices that \"made sense in 1970 or 1930.\" CAA beat incumbents by moving the 9am staff meeting to 7am and calling not just its own clients but rivals' clients — \"mediocrity is invisible until passion shows up and exposes it.\"",
          "Barbell / \"death of the middle\": across relationship businesses (investment banks, private equity, talent agencies) the middle gets stretched like taffy — win as a light solo operator or a scaled platform, never the mushy middle. a16z built scaled venture because startups had shifted from selling \"tools\" to competing directly in incumbent industries (Airbnb, Uber, Tesla).",
          "Every new technology triggers the same moral panic (\"it will ruin society and the children\") — bicycle face, jazz, comic books, the Walkman, hip-hop, the internet — and inventors are often the worst predictors of their own technology's use (Edison thought the phonograph was for recorded sermons).",
          "Elon's management method, which Marc calls a new school: go straight to the source of truth (the engineer), countering the IBM \"big gray cloud\" where twelve management layers each lied upward until the CEO knew nothing. Map the company as a production line, find the single weekly bottleneck, and personally fix it — \"maneuver warfare\" cycle time of hours, not months.",
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
        principle: "Don't cosplay orthodoxy — build from your own axioms and intuition; differentiation, not imitation, is the only path to excellence.",
        keyLessons: [
          "A company is social technology — a socially acceptable \"excuse\" to go all-in and run the counterfactual to the world you see, means-tested by the market (and self-financing when the market pulls the real product out of your project).",
          "Stop cosplaying. Imitation caps you, so engineer the company from your own axioms: Shopify OS models the org with a SAT solver / desired-state system, making tradeoffs legible (50 more salespeople = fewer engineers) and removing politics.",
          "Hire for spikiness, not well-roundedness (Ogilvy: talent lives among \"non-conformist dissenters\"). Seek high-agency \"founders\" and put these wonderfully discontent \"irritants\" on top — don't cocoon them in \"founder daycare.\"",
          "Rivalry, not competition — mimicry never reaches excellence (Agassi/Sampras). \"Make it different, even if it's worse\" (Dyson, Edwin Land): from a blank slate you own the first version and can iterate past a copied 7/10 (the SpaceX Raptor evolution as a team masterpiece by subtraction).",
          "Create environments, don't prescribe. No \"corporate babyproofing\"; change the environment so the right thing is intuitive, then trade accountability for autonomy through prototype→build \"phase transitions.\" The way you do anything is how you do everything — down to Norman doors.",
          "Change your identity deliberately. The brain is a \"retrospective narrative alignment mechanism,\" so affirmations and message-in-a-bottle spaced repetition genuinely work; and change your mind the moment better information arrives — consistency isn't the job.",
          "Control costs and build a company worth working for. He built a $200B company in his wife's childhood bedroom (his father-in-law once covered payroll); talent takes care of itself because there aren't many truly great companies — so tie every person's work back to the mission.",
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
          "**Focus isn't simple—it's what lets you obsess over every detail.** A single product means Cane's can perfect the bird's species and weight, a 24-hour brine, crinkle fries (with the black sugar-tips removed), pull-apart bread, and tea sourced from three countries—the \"cravability\" that drives repeat business. Cutting quality to save a penny is \"death by a thousand cuts\" in a business that makes ~10 cents on the dollar.",
          "**The distracted don't beat the focused.** Competitors add items, LTOs, and 100 sauces; Cane's keeps a 2:35 drive-thru where \"every two seconds faster is a point on sales\" (~$60M on $6B). \"Frequency beats variety\"—people don't want the homework of a giant menu; \"do one thing and do it better than anybody else\" (the In-N-Out model, same menu since 1948).",
          "**Bad advice is fuel.** He got the worst grade in his business class (the concept \"won't work\") and was rejected by every bank—\"the best thing an aspiring entrepreneur can be told is 'I don't think you can do that.'\" \"Nothing ever happens unless someone pursues a vision fanatically.\"",
          "**How bad do you actually want it?** To fund the first store he worked 95-hour boilermaker weeks, hitchhiked to Alaska, and fished sockeye salmon on a boat where men were scalped and boats sank—\"I wasn't thinking about salmon, I was thinking about my chicken finger dream.\" He and his partner swore a campfire oath: \"retreat is not an option.\"",
          "**Never sell; keep control and stay in the details.** Private equity \"takes founders out of the deal,\" and a founder treats the business as personal (\"it's your baby\")—Trader Joe's Joe Coulombe and Kinko's Paul Orfalea both publicly regretted selling. Delegation is a myth: \"you don't delegate—you hire great people, supplement them up to a 95, then back off only once they exceed you,\" and \"if we lose the details we lose everything\" (Disney).",
          "**Purpose over money; money follows service.** \"God made me good at chicken fingers to help people\" (75,000 crew). Be sales-driven, not profit-driven—\"sales cures all woes\"—because \"money comes naturally as a result of service\" (Henry Ford). The business must be \"natural\" to the creator, not merely authentic (his co-founder left because fry-cooking didn't turn him on).",
          "**Survival is the win—turn disasters into assets.** Over-levered with subordinated debt at 28 stores, Katrina knocked out 21 of them; he rallied the team, reopened in New Orleans 30 days after the storm as the only restaurant in town, and swore never to over-lever again. He ran the same playbook in COVID (three drive-thru lanes)—\"victory in our industry is spelled survival\" (Jobs).",
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
          "Problems are opportunities and workloads — embrace them and run to the fire. A relentlessly positive inner monologue is a real advantage, one Jacobs rebuilt through two years of cognitive therapy after perfectionism drove him into clinical depression.",
          "Get the major, long-term trend right (his mentor Ludwig Jesselson). For two million years that trend has been technology, so rule out industries AI/automation will soon disrupt (his Chegg call) and invest heavily in tech even in \"boring\" ones — Carnegie's steel, Walmart's $500M 1979 computer bet, Zara as \"a technology company with stores attached.\"",
          "Run the repeatable playbook: pick a large, growing, fragmented industry you can buy into at reasonable (not cheap) prices, buy well (a spread between your cost of capital and where you deploy it), then double EBITDA in 3–5 years via pricing, procurement, compensation, and technology.",
          "People are everything — the CEO's most important job is recruiting superlative people. Use the \"would I feel terror if they quit?\" test to sort A/B/C players, and screen hard for raw intelligence plus human qualities (honest, hardworking, collegial, all-in).",
          "Align incentives ruthlessly: make everyone a partner with equity that vests over five years (most in the last two). \"Show me the incentive and I'll show you the outcome\" (Munger) — and always understand what actually motivates the other person.",
          "Build intense, unfiltered feedback loops. Crowdsource meeting agendas (pre-reads, not PowerPoints; rate questions 1–10, discuss only 8+), ask the frontlines \"what's the stupidest thing we do?\", and go public partly for the free, brutal advice of the smartest allocators.",
          "Be absolutely brutal with your time — WATWAM (\"waste of time, waste of money\"). Run every decision through two levers (grow the top line faster than the market and expand margins), then go all in, because you only get one shot at life.",
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
        principle: "Build as a missionary, not a mercenary—never fight the low-cost rival on price, compound in your niche, and turn competitors into allies.",
        keyLessons: [
          "**Missionary vs. mercenary co-founders — buy out the mercenary.** His first partner, Mark, wanted to keep one profitable store and \"not screw it up\"; Mackey wanted to change how America eats. That philosophical mismatch was irreconcilable, so he bought Mark out. \"Missionary founders make better, longer-term decisions.\" (He notes Rockefeller called buying out his early partners one of the best decisions of his life.)",
          "**Never fight the low-cost provider on price.** Conventional supermarkets made \"the drastic mistake of trying to compete on price\" with Walmart — sterile warehouse stores, cheap lighting, labor cut to the bone — and still lost. Whole Foods went the opposite way: quality, service, beautiful stores, differentiated mix. Compete on a different axis entirely.",
          "**Compound quietly while rivals are distracted.** The supermarkets were \"hypnotized by Walmart\" and ignored Whole Foods for 20–25 years (until Columbus Circle opened in 2004). That neglect was the gift: \"We were running downfield wide open for the touchdown pass\" — time to scale and compound before anyone copied him. (No patents in retail; scale was the only moat.)",
          "**VCs are \"hitchhikers with credit cards.\"** Useful to get somewhere you couldn't reach alone, but they play a blockbuster/exponential game and pressure founders to scale too fast, often wrecking a perfectly good business. Once Whole Foods went public and had its own capital, \"they got out of the car.\"",
          "**Turn rivals into a network of \"secret allies.\"** Mackey sought out the handful of other natural-foods pioneers, flew to meet them, and built the Natural Foods Network — missionaries who literally traded financial statements and information, made each other better, each owned a geographic niche so they never competed head-on, and many of whom he ultimately acquired.",
          "**Grow by acquisition to buy a geographic platform.** Building a team cold in a new region is slow and expensive; instead he bought a small existing chain (six or seven stores) in LA, Boston, DC, Florida, and North Carolina to get an instant team and local know-how, then expanded from that platform.",
          "**De-risk the pitch with working prototypes, and watch costs hardest in the good times.** Studying Mrs. Gooch's (doing ~10x SaferWay's sales by adding fresh meat and produce) revealed the scale opportunity and let him tell investors \"it's working in LA, Boston, San Diego — why won't it work in Austin?\" He told David that if Founders had existed when he was young, Whole Foods might still be independent — he'd have prioritized cost control, since booms make everyone stop watching spend.",
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
          "Optimize for impact over happiness — happiness trails impact. The Dara Khosrowshahi/Uber story crystallizes it: \"Since when is life about happiness? It's about impact.\"",
          "Belief comes before ability. Ek says he doesn't know he's \"good,\" only that he's \"different\" and has an insane belief he can get good if he works hard enough (the Morita/Sony-in-firebombed-Tokyo parallel).",
          "Knowing yourself is the hardest and most important founder skill; advice is useless unless it's tied to who you are. There are many founder archetypes — Ek's is \"coach, not player,\" with a collaborative style, not a Jobs-style dictator.",
          "Build a \"seamless web of deserved trust\" (Munger). Trust is one of the greatest economic forces because it compounds but doesn't scale; surround yourself with people who tell you the truth — the \"mirror\" (Sony hired a paid critic who became president).",
          "Practice extreme intellectual humility. Ek cold-calls leaders and shadows them — he sat through a week of Zuckerberg's meetings, took notes, offered to get coffee — to absorb the culture firsthand and learn what he doesn't know.",
          "The value of a company is the sum of all problems solved (his co-founder Martin's line). Focus on the problem, not the solution; money comes as a result of service (Henry Ford), so hunt for the biggest problems worth a decade of your life.",
          "Manage energy, not time — there are no morning-ritual rules; know your own rhythm. Judge people on their best idea, not their worst (\"high-temperature\" people preserve creativity), and treat quality as less, focus, and the aspiration toward an impossible perfection.",
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
        principle: "No moat exists in software, so invest only in what is hard to copy—network effects, owned hardware, and a clear product vision.",
        keyLessons: [
          "**There is no moat in software, so invest in what is hard to copy.** Facebook's Poke clone was the wake-up call; ever since, Snap has built network effects, the AR/lens platform, a creator ecosystem, and owned hardware—\"we've been engaged in trench warfare with monopolies for 15 years.\" The corollary: AI is \"the best thing that's ever happened to Snapchat\" because it erases the resource gap against rivals with \"infinite resources but no new ideas.\"",
          "**Network-effect value isn't node count—it's whether the people you actually talk to are on it.** \"You don't need 500 friends on Snapchat, you just need your best friend\"; one close friend can be half your communication, which let Snapchat accrue value fast against far larger networks.",
          "**Vision is seeing the product before it exists.** \"If I can't see it, then we're off track.\" Like Land and Jobs staring at an empty table, he practices \"technology in service of a product vision\"—organizing the team to invent whatever the vision requires—rather than chasing a technology. It's why Snap bet on AR while everyone else bet on VR, and shipped vertical video and Spectacles years early.",
          "**The hard part is delivery and consistency, not the vision.** \"A lot of people have different visions for the future… the hard part is delivering it.\" Stories went unused for the first six months before exploding; determination and consistency separated Snap from everyone who merely \"saw\" the future.",
          "**Kind is not nice.** Snap's values are \"kind, smart, creative,\" and kind comes first: \"nice is about making people feel good; kind is about wanting the best for them,\" which requires hard feedback. Fear \"is almost the opposite of creativity,\" so a kind culture is the most fertile ground for it.",
          "**The best way to have a good idea is to have lots of ideas.** Weekly design reviews churn through hundreds of concepts of which fewer than 1% ship; \"the most toxic thing is people attached to an idea.\" Focus is his \"primary role\"—and to surface problems he stole Walmart's Friday \"In It to Win It\" meeting so any leader can raise a broken \"shopping-cart ball bearing\" company-wide.",
          "**The motive is control and creation, not money.** He sold ~$10M of stock early so \"money was no longer a consideration,\" then refused multi-billion-dollar offers at 22 because selling meant compromising the vision—\"you should never sell your best idea.\" Reframe stress as opportunity (Herb Kelleher: \"I don't handle it, I like it\"), and be your own \"explainer chief,\" because the founder is \"the guardian of the company's soul.\"",
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
        principle: "Progress comes from doggedness, not cleverness — treat failure as the most interesting teacher and iterate relentlessly until it works.",
        keyLessons: [
          "Failure is more interesting than success: failure forces you to ask \"why did it go wrong?\", whereas success you never examine. You have to enjoy failure to improve things — his 5,127 vacuum prototypes over roughly eleven years were \"a hugely enjoyable struggle.\"",
          "Naivety is an asset: the experienced person knows why not to do something, but the naive young engineer thinks harder because they don't know it's \"impossible.\" Back the person who \"wants it the most,\" not the most experienced — he founded a university that hires paid 17- and 18-year-olds for their naive questions.",
          "Distrust experts and pursue difference for its own sake: Ford said filling your competitors' ranks with experts is the best sabotage because \"they know so much about why something won't work.\" Dyson's organizing principle is \"it has to be different\" — he'd \"be different even if it was worse,\" though it also has to end up better.",
          "The entrenched professional resists longer than the independent consumer: retailers laughed at his products while consumers bought them by mail, and incumbents rejected the bagless cyclone partly because they earned $500M a year on bags. He turned every reasonless rejection into fuel — \"these guys don't want to change, so I'm going to make it work.\"",
          "Protect the fragile early idea and back your intuition against everyone — intuition isn't guesswork but thousands of absorbed experiences synthesized into a decision you can't fully rationalize, and everyone (partners, friends) will try to blow the idea away.",
          "Build with your own hands and change one variable at a time: engineers who build and test their own prototypes gain a \"visceral\" understanding a spreadsheet can't give, and changing fifteen things at once means you never learn which one mattered.",
          "Focus is the one trait that separates these people: \"concentrate on one thing at a time,\" choose the single most important thing and accept that some things won't get done. He refuses to sell motors to other companies (guaranteed money) rather than split his engineers' focus — \"life is for living, not for making money\" — and holds that \"I aim not to be clever but to be dogged.\"",
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
        principle: "A long-term mission simplifies the hardest calls—even suing your regulator—and a founder's edge is knowing he could rebuild from scratch.",
        keyLessons: [
          "**A long-term mission simplifies the hardest decisions.** After the SEC stonewalled Coinbase — 30 meetings, \"just tell us the rules,\" met only with \"go talk to your lawyer\" and then an enforcement action the next day — Coinbase did something almost no company does: it proactively sued its own regulator (under the Administrative Procedures Act). Brian knew it would scare investors short-term, but the mission made the call clear, and he'd checked that others (SpaceX vs. NASA, Palantir) had sued the government and won.",
          "**A real founder's edge is knowing he could rebuild it from scratch.** When his 2020 culture stand risked mass resignations, he was calm: \"I started it when it was just me on a laptop... I could go back to being on my laptop again if I had to.\" He cites Lee Kuan Yew's \"iron in my veins\" speech — the willingness to rebuild Singapore from nothing. That confidence is what lets a founder hold a hard line a caretaker CEO never could.",
          "**Draw a hard line on culture and accept the losses.** After 2020's unrest, Brian published a mission-first post: Coinbase focuses on economic freedom, not \"whatever the current hot social issue is,\" and politics stays out of the workplace. People begged him not to post it; he offered a generous exit package to anyone not aligned. Only ~5% left (he'd braced for 50%) — the opposition was \"a very vocal 1% minority.\"",
          "**Pick something you'd do for 20 years even with little success.** Coming off side hustles (tutoring, rentals) and reading Seth Godin's \"The Dip\" and Tim Ferriss, he literally wrote on paper the one thing he'd pursue for two decades regardless of outcome — tech entrepreneurship — then sold his rental properties and moved all-in to Silicon Valley.",
          "**The best ideas come from lived pain, not theory.** A year in Argentina (watching hyperinflation gut a country that had been \"the Paris of South America,\" fallen from a top-10 economy to ~100th) plus his Airbnb job exposing broken global money movement (7–12% fees; literally wiring $100 to see how much arrived) is what made the Bitcoin white paper land as the answer.",
          "**Talk to customers and ship the smallest thing they'll actually use.** The first Coinbase app couldn't buy or sell Bitcoin, and users didn't retain. He emailed three signups; one said, \"I just don't have any Bitcoin.\" Adding a simple buy button — YC's \"talk to customers, build the product, on repeat\" — is what created product-market fit: \"the boulder was rolling down the hill and you were chasing it.\"",
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
