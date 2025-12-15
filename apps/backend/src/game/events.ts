import { Card } from './types';

export type IntentPlayCard = { type: 'intent_play_card'; playerId: string; cardId: string };

export type Intent = IntentPlayCard;

export type EventBase = { type: string; actor?: string; payload?: any };

export type GameStarted = { type: 'game_started'; payload: { gameId: string } };
export type CardPlayed = { type: 'card_played'; actor: string; payload: { playerId: string; cardId: string } };
export type TalonTaken = {
  type: 'talon_taken';
  actor: string;
  payload: { playerId: string; taken: string[]; zing?: { points: number; double?: boolean } | null };
};
export type RoundEnd = { type: 'round_end'; payload: { scores: { team0: number; team1: number }; details: any } };
export type ScoresUpdated = { type: 'scores_updated'; payload: { team0: number; team1: number } };

export type GameEvent = EventBase | GameStarted | CardPlayed | TalonTaken | RoundEnd | ScoresUpdated;
