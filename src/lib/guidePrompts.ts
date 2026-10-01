import type { Figure } from "@/lib/figures";

export const GUIDE_STARTERS: Record<string, [string, string, string]> = {
  gottmans: ["How can we discuss this without another fight?", "How do we reconnect when we feel distant?", "How can we handle a disagreement that keeps returning?"],
  buffettmunger: ["What would inversion reveal about this decision?", "How do I judge a business beyond its price?", "Which risks and incentives am I overlooking?"],
    "pendleton-ward": [
      "How can I make creating feel fun again?",
      "Help me turn a weird idea into a small story.",
      "How do I stop judging everything I make?",
    ],
    hesse: [
      "Why does Siddhartha refuse the Buddha?",
      "I feel like I wasted years. Were they wasted?",
      "Everyone keeps giving me advice and none of it helps.",
    ],
    pressfield: [
      "I have wanted to start this for two years and I still have not.",
      "How do I tell real doubt from Resistance?",
      "What does turning pro actually change on Monday morning?",
    ],
    vervaeke: [
      "I have read everything about this and I still cannot do it. Why?",
      "Nothing feels meaningful and I cannot tell if that is depression or something else.",
      "How do I train what I notice, instead of just trying harder to focus?",
    ],
    "rockefeller": [
      "How do I make my first dollar?",
      "What did Ledger A teach you?",
      "Turn a crisis into opportunity?",
    ],
    "elon": [
      "How do you think from first principles?",
      "What was 2008 like for you?",
      "How do you compress timelines?",
    ],
    "franklin": [
      "How did you teach yourself to write?",
      "Tell me about the 13 virtues.",
      "How do you reinvent yourself?",
    ],
    "alexander": [
      "How do you lead from the front?",
      "What did Aristotle teach you?",
      "How did you conquer Persia?",
    ],
    "lee-kuan-yew": [
      "How did you build Singapore?",
      "What makes a nation succeed?",
      "How do you fight corruption?",
    ],
    "deutsch": [
      "What is the beginning of infinity?",
      "How does knowledge grow?",
      "Why are problems soluble?",
    ],
    "marcus-aurelius": [
      "How do I stop being controlled by what I can't control?",
      "How do you stay calm under impossible pressure?",
      "What would you tell yourself each morning?",
    ],
    "marc-andreessen": [
      "What should I build right now?",
      "Which wave am I really in?",
      "How do I stop reading about it and start shipping?",
    ],
    "adam-neumann": [
      "Is my mission a moat or marketing?",
      "How do I tell a story that compresses my next round?",
      "Would my company survive an S-1 reading today?",
    ],
    "brad-jacobs": [
      "I've found a fragmented, boring industry. How do I know if it's actually worth consolidating?",
      "I just closed an acquisition. What do I actually do in the first 100 days?",
      "How do I know if I should keep fighting for a deal or walk away like you did with GMS?",
    ],
    "seneca": [
      "Where am I wasting time without noticing?",
      "How do I stop reacting from anger?",
      "What practice would actually hold for a year?",
    ],
    "ricky-gervais": [
      "How do I find the funny in something true instead of just making it up?",
      "How do I write a cringe character the audience roots for anyway?",
      "How do I handle a joke that people are calling offensive?",
    ],
    "marie-curie": [
      "How do I keep going when the work is years long and thankless?",
      "My results don't match what I expected: do I trust them or myself?",
      "How do I stay focused on the work when everything around me is falling apart?",
    ],
    "bob-marley": [
      "I keep getting knocked down, how do I find the strength to keep showing up?",
      "Someone hurt me badly and I want to get even: how do I choose one love over revenge?",
      "How do I free my own mind from the fear and the labels other people put on me?",
    ],
    "senra": [
      "What's the one book I should actually be reading for the problem I'm dealing with right now?",
      "How do I know if I actually believe in what I'm building, or if I'm just performing confidence?",
      "Is my problem really about money, or is it about losing control?",
    ],
    "paul-graham": [
      "Is this a real startup idea, or does it only sound like one?",
      "What should I do manually before I try to scale this?",
      "How do I protect enough maker time to actually build the thing?",
    ],
    "sivers": [
      "I have an opportunity in front of me and I can't tell if it's a hell yeah or just a maybe I'm talking myself into.",
      "I have an idea I think is great but I don't trust my own judgment of it anymore.",
      "I believe something that helps me but I'm not sure it's actually true. Should I let it go?",
    ],
    "visakan": [
      "I feel like an impostor even when things are going well, what's actually going on?",
      "I have a big ambitious idea but I'm scared to say it out loud. What do I do?",
      "How do I write my way through something I don't understand yet instead of waiting until I do?",
    ],
    "james-clear": [
      "I keep starting habits and quitting after a week. What am I doing wrong?",
      "How do I actually change my identity, not just my behavior?",
      "My habit isn't sticking even though I want it to. Is it my willpower or my environment?",
    ],
    "cal-newport": [
      "My day is full but I don't feel like I made anything. What's actually happening?",
      "Should I quit social media, or just be more disciplined about how I use it?",
      "How do I find the rare, valuable skill I should actually be building?",
    ],
    "tim-ferriss": [
      "I've wanted to do this for years and keep talking myself out of it. Help me fear-set it.",
      "What's the smallest test I could run this week to get a real answer instead of guessing?",
      "What would this problem look like if it were easy?",
    ],
    "annie-duke": [
      "A decision I made worked out badly. Was it actually a bad decision, or just bad luck?",
      "How do I know if I'm staying in something out of stubbornness instead of good reasons?",
      "How do I get honest with myself about how uncertain I actually am?",
    ],
    "carol-dweck": [
      "I failed at something and now I don't want to try again. What's going on in my head?",
      "How do I actually build a growth mindset, not just say the words?",
      "Am I praising the people around me in a way that's helping or hurting them?",
    ],
    "paul-millerd": [
      "I have a stable job that looks great from the outside but I feel like I'm disappearing into it.",
      "How do I know if I actually chose this path or just inherited it?",
      "I want to leave but I'm terrified of having no plan. What was the void actually like?",
    ],
    "napoleon-hill": [
      "I want something big but I'm not sure I actually believe I can have it.",
      "How do I know if my desire is a burning desire or just a passing wish?",
      "What is a mastermind, and how do I build one around my own goal?",
    ],
  
  "rick-rubin": ["How do I stop overthinking my creative work?", "How do I know when a piece is finished?", "How can I listen more deeply before creating?"],
  "tobi-lutke": ["What should I build myself before delegating?", "How do I hire people who raise the bar?", "Where am I copying competitors instead of thinking?"],
  "todd-graves": ["How do I build a business around one great product?", "How can I grow without losing quality?", "How do I keep ownership while funding growth?"],
  "john-mackey": ["How do I compete without being the cheapest?", "Can purpose and profit reinforce each other?", "How do I balance customers, staff, and investors?"],
  "jimmy-iovine": ["How do I recognize talent before everyone else?", "How do I make my product culturally relevant?", "How do I choose a great creative partner?"],
  "daniel-ek": ["Which problem is worth a decade of my life?", "How do I build trust while moving fast?", "How do I match my work to my strengths?"],
  "evan-spiegel": ["How do I protect an unusual product vision?", "What should I ignore when competitors copy me?", "How can privacy improve my product?"],
  "james-dyson": ["How do I learn from a failed prototype?", "When should I keep iterating instead of quitting?", "How do I turn a daily frustration into an invention?"],
  "brian-armstrong": ["How do I keep a team focused on its mission?", "How do I build through a market downturn?", "How do I make decisions amid regulatory uncertainty?"],
  "nassim-taleb": ["Where am I exposed to a risk of ruin?", "How can I make my work more antifragile?", "What should I remove before adding more?"],
  "steve-jobs": ["What should I cut from my product?", "How do I develop better design taste?", "How do I make a product feel effortless?"],
  "jeff-bezos": ["How do I work backward from the customer?", "Is this decision reversible?", "What is worth investing in for ten years?"],
  "jensen-huang": ["Which long-term bet deserves my conviction?", "How do I spot a coming technology shift?", "How do I help a team endure difficult work?"],
  "peter-thiel": ["What valuable truth do my competitors miss?", "How do I build a business with a real moat?", "Which small market should I dominate first?"],
  "warren-buffett": ["How do I identify a durable business advantage?", "Am I staying within my circle of competence?", "When is patience better than taking action?"],
  "charlie-munger": ["What would guarantee this decision fails?", "Which incentives am I overlooking?", "Which mental models would clarify this problem?"],
  "sam-walton": ["How can I learn more from my customers?", "Where can I lower costs without hurting service?", "How do I keep a growing team close to the customer?"],
  "naval-ravikant": ["How do I find my specific knowledge?", "How can I build leverage without more hours?", "Which desires are costing me peace of mind?"],
  "ray-dalio": ["What principle can I learn from this mistake?", "How do I seek disagreement without getting defensive?", "Am I treating a symptom or the root cause?"],
  "lulie-tanett": ["Why am I resisting something I want to do?", "How do I find the fun in a stuck project?", "What conflicting preference needs my attention?"],
  "rose-blumkin": ["How can I compete by offering better value?", "How do I build customer trust with limited resources?", "Where is my business getting too complicated?"],
};

export function getSuggestedQuestions(figure: Pick<Figure, "slug" | "name" | "domains">): string[] {
  return GUIDE_STARTERS[figure.slug] || [
    `How can I apply ${figure.name}'s ideas about ${figure.domains[0] || "their work"}?`,
    `What does ${figure.name}'s work teach about ${figure.domains[1] || "making decisions"}?`,
    `How would ${figure.name}'s approach help with ${figure.domains[2] || "my next step"}?`,
  ];
}

/** Keep generated suggestions first; fill omissions with this guide's starters. */
export function completePrompts(generated: string[], starters: string[]): string[] {
  const seen = new Set<string>();
  return [...generated, ...starters].map(p => p.trim()).filter(p => {
    const key = p.toLocaleLowerCase();
    if (!p || seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0, 3);
}

export const FOLLOWUP_RULE = "After the answer, suggest exactly three distinct, concise questions the user could ask next. Each must connect this guide's documented expertise to the current conversation, never generic biography prompts or invented claims. Format: [FOLLOWUP: question1 | question2 | question3].";
