export interface SassyFortuneItem {
  text: string;
  intensity: 'MILD' | 'SPICY' | 'SAVAGE';
  category: 'GENERAL' | 'WORK' | 'DATING' | 'EXISTENTIAL' | 'TECH';
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'ROAST';
}

export const SASSY_FORTUNES: SassyFortuneItem[] = [
  // --- SAVAGE INTENSITY ---
  {
    text: "Even Google doesn't have an answer for that level of delusion.",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "ROAST",
  },
  {
    text: "My crystal ball says you should delete their number and touch grass.",
    intensity: "SAVAGE",
    category: "DATING",
    sentiment: "NEGATIVE",
  },
  {
    text: "Outlook not so good. Actually, outlook looks like a dumpster fire.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "Have you considered that maybe YOU are the problem?",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "ROAST",
  },
  {
    text: "Reply hazy, but knowing your life choices, it's probably a disaster.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "ROAST",
  },
  {
    text: "Don't count on it. Don't even breathe in that direction.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "I'm a plastic ball full of blue liquid and even I know that's a terrible idea.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "ROAST",
  },
  {
    text: "They left you on read for a reason. Take the hint.",
    intensity: "SAVAGE",
    category: "DATING",
    sentiment: "ROAST",
  },
  {
    text: "Your code has fewer bugs than this decision.",
    intensity: "SAVAGE",
    category: "TECH",
    sentiment: "NEGATIVE",
  },
  {
    text: "Signs point to yes, but your bank account screams absolutely not.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "ROAST",
  },
  {
    text: "You really shook me just to ask THAT? Groundbreaking.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "ROAST",
  },
  {
    text: "404: Hope Not Found.",
    intensity: "SAVAGE",
    category: "TECH",
    sentiment: "NEGATIVE",
  },
  {
    text: "Ask again later. Or better yet, ask a therapist.",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "ROAST",
  },
  {
    text: "If common sense was currency, you'd be in severe debt.",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "ROAST",
  },
  {
    text: "The universe just laughed in your face. Did you hear it?",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "ROAST",
  },
  {
    text: "Not in a million years, bestie.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "Are you serious right now? Absolutely not.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "It will happen right after you start replying to emails on time.",
    intensity: "SAVAGE",
    category: "WORK",
    sentiment: "ROAST",
  },
  {
    text: "The stars have aligned to tell you: Sit down and do nothing.",
    intensity: "SAVAGE",
    category: "EXISTENTIAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "My sources say no, and my sources have immaculate taste.",
    intensity: "SAVAGE",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },

  // --- SPICY INTENSITY ---
  {
    text: "Yes, but you're definitely going to complain about it later.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Without a doubt. But prepare for chaotic consequences.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "It is certain, though your therapist might disagree.",
    intensity: "SPICY",
    category: "EXISTENTIAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Cannot predict now... I'm suffering from second-hand embarrassment.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Most likely, if you manage not to sabotage yourself first.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Concentrate and ask again, but try using your brain this time.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Outlook good. But knowing you, you'll still overthink it.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Better not tell you now. You couldn't handle the truth.",
    intensity: "SPICY",
    category: "EXISTENTIAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Yes! (Assuming Mercury is not doing whatever astrology nonsense it does).",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Signs point to yes, but your Wi-Fi will probably disconnect.",
    intensity: "SPICY",
    category: "TECH",
    sentiment: "POSITIVE",
  },
  {
    text: "You can do it! Will it end well? Probably not, but do it anyway.",
    intensity: "SPICY",
    category: "EXISTENTIAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Reply hazy. Shake again with a little more desperation.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Yes, queen/king. Go make questionable decisions.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Very doubtful. Just like your promise to sleep before midnight.",
    intensity: "SPICY",
    category: "EXISTENTIAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "My internal sensors detect a 99% chance of regret.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "Yes, but only if you close 47 of your open browser tabs.",
    intensity: "SPICY",
    category: "TECH",
    sentiment: "POSITIVE",
  },
  {
    text: "As I see it, yes. But I don't have eyes, so who knows.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "No. Now go drink some water and stretch your neck.",
    intensity: "SPICY",
    category: "EXISTENTIAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "It is decidedly so. Don't ruin it.",
    intensity: "SPICY",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Ask again after you finish your morning coffee.",
    intensity: "SPICY",
    category: "WORK",
    sentiment: "NEUTRAL",
  },

  // --- MILD / PLAYFUL INTENSITY ---
  {
    text: "Signs point to yes! Look at you winning.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "As I see it, yes. You're unstoppable today.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "It is decidedly so! Shine bright.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Without a doubt! Go get 'em.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Yes, definitely. Treat yourself to a snack.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "You may rely on it. The vibes are immaculate.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Reply hazy, try asking after a little power nap.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Ask again later when the universe has finished its tea.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Better not tell you now... keep the suspense alive!",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Cannot predict now, but sending good vibrations anyway.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Concentrate and ask again with a big smile.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEUTRAL",
  },
  {
    text: "Don't count on it today, but tomorrow is a new adventure.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "My reply is no, but I still believe in you.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "My sources say no, but what do they know anyway?",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "Outlook not so good, but cookies make everything better.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "Very doubtful, but stranger things have happened!",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
  {
    text: "100% yes! Take this as your official sign.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Yes, but only if you promise to celebrate with dessert.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "The odds are in your favor today!",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "POSITIVE",
  },
  {
    text: "Probably not, but you're still doing amazing, sweetie.",
    intensity: "MILD",
    category: "GENERAL",
    sentiment: "NEGATIVE",
  },
];
