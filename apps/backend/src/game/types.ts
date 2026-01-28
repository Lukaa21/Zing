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
  team: number; // 0 or 1
  hand: string[]; // card ids
  taken: string[]; // captured cards
  socketId?: string; // Current socket connection (for tracking reconnects)
  connected?: boolean; // Whether player is currently connected (default true)
};

export type Talon = string[]; // top of talon is last item

export type GameState = {
  id: string;
  players: PlayerState[];
  talon: Talon; // pile, top is last
  deck: string[]; // remaining deck top = last
  faceUpCard?: string[]; // The card(s) shown face-up at bottom of deck (dealer gets these last)
  currentTurnPlayerId?: string;
  dealerId?: string;
  handNumber?: number; // 1-based index of the current mini-hand
  setNumber?: number; // 1-based index of the current set/partija
  // cumulative match scores (team0/team1)
  scores: Record<string, number>;
  // current round scores (reset each round)
  currentRoundScore?: Record<string, number>;
  // target score to win the match (default 101)
  targetScore?: number;
  // mark if match is finished
  matchOver?: boolean;
};

export type Intent =
  | { type: 'play_card'; playerId: string; cardId: string }
  ;

export type Event = {
  type: string;
  actor?: string;
  payload?: any;
};
