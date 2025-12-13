export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type Card = {
  id: string; // e.g. "hearts-A"
  suit: Suit;
  rank: Rank;
};

export type PlayerState = {
  id: string;
  name: string;
  seat: number;
  role: 'player' | 'spectator';
  hand: string[]; // card ids
  taken: string[]; // captured cards
};

export type Talon = string[]; // top of talon is last item

export type GameState = {
  id: string;
  players: PlayerState[];
  talons: Talon[]; // four cards as initial talons
  deck: string[]; // remaining deck top = last
  currentTurnPlayerId?: string;
  dealerId?: string;
  scores: Record<string, number>;
};

export type Intent =
  | { type: 'play_card'; playerId: string; cardId: string }
  | { type: 'take_talon'; playerId: string }
  | { type: 'pass'; playerId: string };

export type Event = {
  type: string;
  actor?: string;
  payload?: any;
};
