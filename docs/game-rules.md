# Zing — Game Rules (MVP)

This file contains a concise description of the Zing rules used by the server-side engine.

- Deck: 52 cards (A, 2-10, J, Q, K) — standard suits.
- Player count: 1v1 or 2v2.
- Each player receives 4 cards; decks and talons are created as described by rules.
- A player on their turn plays one card from their hand. If the played card matches the top card in talon by suit or rank; the player takes the talon. If the played card doesn't match it goes on top.
- Jack (J) always takes the talon.
- Zing: if talon has 1 card and next player takes it, that capture is a Zing (10 points), special interaction with J -> double Zing (20 points).
- Scoring:
  - 2–9: 0 points
  - 10, J, Q, K, A and 2 of clubs: 1 point
  - 10 of diamonds: 2 points
  - Zing (10 points), J-on-J Zing = 20 points
  - Team with more captured cards gains +3 bonus (tie-breaker: who captured 2 of clubs)
- Game continues until a team reaches 101 points (or higher thresholds if tied in same round).

This is the initial, high-level spec for the engine. The engine will validate play intents and produce server-side events stored in Postgres as `game_events`.
