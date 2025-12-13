export const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export const cards = (suits as readonly string[]).flatMap((s) => (ranks as readonly string[]).map((r) => `${s}-${r}`));
