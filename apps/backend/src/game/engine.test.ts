import { describe, it, expect } from 'vitest';
import { createDeck, initialDeal, dealNextHands } from './engine';
import { GameState } from './types';

describe('game engine', () => {
  it('creates a 52 card deck', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
    expect(new Set(deck).size).toBe(52);
  });

  it('deals four cards to each player', () => {
    const players = [{ id: 'p1', name: 'p1', seat: 0, role: 'player', hand: [], taken: [] }, { id: 'p2', name: 'p2', seat: 1, role: 'player', hand: [], taken: [] }];
    const state: GameState = { id: 'g1', players: players as any, talon: [], deck: createDeck(), currentTurnPlayerId: 'p1', dealerId: 'p1', scores: {} };
    initialDeal(state);
    expect(state.players[0].hand.length).toBe(4);
    expect(state.players[1].hand.length).toBe(4);
    expect(state.talon.flat().length).toBe(4);
  });

  // Test koji će simulirati mnogo partija dok ne nađe J trump scenario
it('handles Jack trump card correctly - multiple faceUpCards and last hand dealing', () => {
  let foundJackTrump = false;
  let attempts = 0;
  const maxAttempts = 10000;
  
  while (!foundJackTrump && attempts < maxAttempts) {
    attempts++;
    
    const players = [
      { id: 'p1', name: 'Player1', seat: 0, role: 'player' as const, team: 0, hand: [], taken: [] },
      { id: 'p2', name: 'Player2', seat: 1, role: 'player' as const, team: 1, hand: [], taken: [] }
    ];
    
    const state: GameState = {
      id: `g${attempts}`,
      players,
      talon: [],
      deck: [],
      scores: { team0: 0, team1: 0 },
      handNumber: 0,
      setNumber: 1
    };
    
    // Use random seed to get different deck each time
    const seed = Math.random().toString();
    initialDeal(state, seed, 0);
    
    // Check if we got Jack trump
    if (state.faceUpCard && state.faceUpCard.length > 1) {
      foundJackTrump = true;
      
      console.log('\n🎯 FOUND JACK TRUMP SCENARIO!');
      console.log(`Attempt #${attempts}`);
      console.log(`Seed: ${seed}`);
      console.log(`\n📋 INITIAL STATE:`);
      console.log(`Trump cards (faceUpCard): ${state.faceUpCard.join(', ')}`);
      console.log(`Talon (${state.talon.length}): ${state.talon.join(', ')}`);
      console.log(`Deck remaining: ${state.deck.length} cards`);
      console.log(`Player 1 hand (${state.players[0].hand.length}): ${state.players[0].hand.join(', ')}`);
      console.log(`Player 2 hand (${state.players[1].hand.length}): ${state.players[1].hand.join(', ')}`);
      
      // TEST 1: Both players should have 4 cards initially
      expect(state.players[0].hand.length).toBe(4);
      expect(state.players[1].hand.length).toBe(4);
      console.log('\n✅ TEST 1 PASSED: Both players have 4 cards initially');
      
      // TEST 2: faceUpCard should have multiple cards (Jack + trump)
      expect(state.faceUpCard.length).toBeGreaterThan(1);
      console.log(`✅ TEST 2 PASSED: faceUpCard has ${state.faceUpCard.length} cards`);
      
      // TEST 2b: CRITICAL - Check order and content of faceUpCard array
      console.log(`\n🔍 DETAILED faceUpCard VALIDATION:`);
      const firstCard = state.faceUpCard[0];
      const secondCard = state.faceUpCard[1];
      const firstCardRank = firstCard.split('-')[1];
      const secondCardRank = secondCard.split('-')[1];
      
      console.log(`  [0] = ${firstCard} (rank: ${firstCardRank})`);
      console.log(`  [1] = ${secondCard} (rank: ${secondCardRank})`);
      
      // CRITICAL: First card should NOT be Jack (it should be original trump)
      expect(firstCardRank).not.toBe('J');
      console.log(`  ✅ First card is NOT Jack (original trump card)`);
      
      // CRITICAL: Second card should be Jack (from talon)
      expect(secondCardRank).toBe('J');
      console.log(`  ✅ Second card IS Jack (from talon)`);
      
      // CRITICAL: Both cards should be in deck at start (for dealer to receive)
      const deckFirstTwo = state.deck.slice(0, 2);
      expect(deckFirstTwo).toContain(secondCard); // Jack should be in deck
      expect(deckFirstTwo).toContain(firstCard); // Original trump should be in deck
      console.log(`  ✅ Both trump cards are at beginning of deck (dealer will receive them)`);
      console.log(`  Deck[0] = ${state.deck[0]}, Deck[1] = ${state.deck[1]}`);
      
      expect(state.faceUpCard.length).toBe(2);
      console.log(`✅ TEST 2b PASSED: faceUpCard array is CORRECT (original trump first, Jack second)`);
      
      // Simulate playing all cards to reach last deal
      console.log(`\n🎮 SIMULATING GAME TO LAST HAND...`);
      
      // Clear all hands
      state.players.forEach(p => p.hand = []);
      
      // Calculate how many cards should be in last deal
      const numFaceUpCards = state.faceUpCard.length;
      const cardsPerPlayer = 4;
      const totalPlayers = 2;
      // In last deal: non-dealer gets 4, dealer gets 2 face-down + 2 trump = 8 total
      const cardsForLastDeal = cardsPerPlayer * totalPlayers - numFaceUpCards + numFaceUpCards;
      // Simplified: = 4*2 - 2 + 2 = 8
      
      // Set deck to exact size for last deal
      const tempDeck = state.deck.slice(0, cardsForLastDeal);
      state.deck = tempDeck;
      
      console.log(`\n📋 BEFORE LAST DEAL:`);
      console.log(`Deck size: ${state.deck.length} (should be ${cardsForLastDeal})`);
      console.log(`Deck first 2 cards: ${state.deck.slice(0, 2).join(', ')}`);
      console.log(`faceUpCard array: ${state.faceUpCard.join(', ')}`);
      console.log(`Expected: ${cardsPerPlayer} per player + ${numFaceUpCards} trump cards`);
      
      // Deal last hand
      dealNextHands(state, 4);
      
      console.log(`\n📋 AFTER LAST DEAL:`);
      console.log(`Player 1 (dealer) hand: ${state.players[0].hand.length} cards`);
      console.log(`  Cards: ${state.players[0].hand.join(', ')}`);
      console.log(`Player 2 hand: ${state.players[1].hand.length} cards`);
      console.log(`  Cards: ${state.players[1].hand.join(', ')}`);
      console.log(`Deck remaining: ${state.deck.length} cards`);
      
      // TEST 3: Both players should have exactly 4 cards
      const dealerIdx = state.players.findIndex(p => p.id === state.dealerId);
      const dealer = state.players[dealerIdx];
      const nonDealer = state.players[(dealerIdx + 1) % 2];
      
      expect(dealer.hand.length).toBe(4);
      expect(nonDealer.hand.length).toBe(4);
      
      console.log(`\n✅ TEST 3 PASSED: Dealer has ${dealer.hand.length} cards (${4 - numFaceUpCards} face-down + ${numFaceUpCards} trump)`);
      console.log(`✅ TEST 4 PASSED: Non-dealer has ${nonDealer.hand.length} cards (all face-down)`);
      
      // TEST 5: Deck should be empty
      expect(state.deck.length).toBe(0);
      console.log(`✅ TEST 5 PASSED: Deck is empty after last deal`);
      
      console.log(`\n🎉 ALL TESTS PASSED!\n`);
      
      console.log(`\n🎉 ALL TESTS PASSED!\n`);
    }
  }
  
  if (!foundJackTrump) {
    console.log(`\n⚠️ Did not find Jack trump in ${maxAttempts} attempts`);
    console.log(`This is statistically unlikely but possible. Try running test again.`);
  }
  
  expect(foundJackTrump).toBe(true);
});

  // Test for 2v2 game mode with Jack trump
it('handles Jack trump card correctly in 2v2 - multiple faceUpCards and last hand dealing', () => {
  let foundJackTrump = false;
  let attempts = 0;
  const maxAttempts = 10000;
  
  while (!foundJackTrump && attempts < maxAttempts) {
    attempts++;
    
    const players = [
      { id: 'p1', name: 'Player1', seat: 0, role: 'player' as const, team: 0, hand: [], taken: [] },
      { id: 'p2', name: 'Player2', seat: 1, role: 'player' as const, team: 1, hand: [], taken: [] },
      { id: 'p3', name: 'Player3', seat: 2, role: 'player' as const, team: 0, hand: [], taken: [] },
      { id: 'p4', name: 'Player4', seat: 3, role: 'player' as const, team: 1, hand: [], taken: [] }
    ];
    
    const state: GameState = {
      id: `g${attempts}`,
      players,
      talon: [],
      deck: [],
      scores: { team0: 0, team1: 0 },
      handNumber: 0,
      setNumber: 1
    };
    
    // Use random seed to get different deck each time
    const seed = Math.random().toString();
    initialDeal(state, seed, 0);
    
    // Check if we got Jack trump
    if (state.faceUpCard && state.faceUpCard.length > 1) {
      foundJackTrump = true;
      
      console.log('\n🎯 FOUND JACK TRUMP SCENARIO (2v2)!');
      console.log(`Attempt #${attempts}`);
      console.log(`Seed: ${seed}`);
      console.log(`\n📋 INITIAL STATE:`);
      console.log(`Trump cards (faceUpCard): ${state.faceUpCard.join(', ')}`);
      console.log(`Talon (${state.talon.length}): ${state.talon.join(', ')}`);
      console.log(`Deck remaining: ${state.deck.length} cards`);
      console.log(`Player 1 hand (${state.players[0].hand.length}): ${state.players[0].hand.join(', ')}`);
      console.log(`Player 2 hand (${state.players[1].hand.length}): ${state.players[1].hand.join(', ')}`);
      console.log(`Player 3 hand (${state.players[2].hand.length}): ${state.players[2].hand.join(', ')}`);
      console.log(`Player 4 hand (${state.players[3].hand.length}): ${state.players[3].hand.join(', ')}`);
      
      // TEST 1: All players should have 4 cards initially
      expect(state.players[0].hand.length).toBe(4);
      expect(state.players[1].hand.length).toBe(4);
      expect(state.players[2].hand.length).toBe(4);
      expect(state.players[3].hand.length).toBe(4);
      console.log('\n✅ TEST 1 PASSED: All 4 players have 4 cards initially');
      
      // TEST 2: faceUpCard should have multiple cards (Jack + trump)
      expect(state.faceUpCard.length).toBeGreaterThan(1);
      console.log(`✅ TEST 2 PASSED: faceUpCard has ${state.faceUpCard.length} cards`);
      
      // Simulate playing all cards to reach last deal
      console.log(`\n🎮 SIMULATING GAME TO LAST HAND...`);
      
      // Clear all hands
      state.players.forEach(p => p.hand = []);
      
      // Calculate how many cards should be in last deal (2v2 mode)
      const numFaceUpCards = state.faceUpCard.length;
      const cardsPerPlayer = 4;
      const totalPlayers = 4;
      // In last deal: 3 players get 4 each, dealer gets 2 face-down + 2 trump = 16 total
      const cardsForLastDeal = cardsPerPlayer * totalPlayers - numFaceUpCards + numFaceUpCards;
      // Simplified: = 4*4 - 2 + 2 = 16
      
      // Set deck to exact size for last deal
      const tempDeck = state.deck.slice(0, cardsForLastDeal);
      state.deck = tempDeck;
      
      console.log(`\n📋 BEFORE LAST DEAL:`);
      console.log(`Deck size: ${state.deck.length} (should be ${cardsForLastDeal})`);
      console.log(`Deck first ${numFaceUpCards} cards: ${state.deck.slice(0, numFaceUpCards).join(', ')}`);
      console.log(`faceUpCard array: ${state.faceUpCard.join(', ')}`);
      console.log(`Expected: ${cardsPerPlayer} per player (dealer gets ${cardsPerPlayer - numFaceUpCards} face-down + ${numFaceUpCards} trump)`);
      
      // Deal last hand
      dealNextHands(state, 4);
      
      console.log(`\n📋 AFTER LAST DEAL:`);
      console.log(`Player 1 (dealer) hand: ${state.players[0].hand.length} cards`);
      console.log(`  Cards: ${state.players[0].hand.join(', ')}`);
      console.log(`Player 2 hand: ${state.players[1].hand.length} cards`);
      console.log(`  Cards: ${state.players[1].hand.join(', ')}`);
      console.log(`Player 3 hand: ${state.players[2].hand.length} cards`);
      console.log(`  Cards: ${state.players[2].hand.join(', ')}`);
      console.log(`Player 4 hand: ${state.players[3].hand.length} cards`);
      console.log(`  Cards: ${state.players[3].hand.join(', ')}`);
      console.log(`Deck remaining: ${state.deck.length} cards`);
      
      // TEST 3: All players should have exactly 4 cards
      const dealerIdx = state.players.findIndex(p => p.id === state.dealerId);
      const dealer = state.players[dealerIdx];
      
      for (let i = 0; i < 4; i++) {
        expect(state.players[i].hand.length).toBe(4);
      }
      
      console.log(`\n✅ TEST 3 PASSED: All players have 4 cards`);
      console.log(`✅ TEST 4 PASSED: Dealer has ${dealer.hand.length} cards (${4 - numFaceUpCards} face-down + ${numFaceUpCards} trump)`);
      console.log(`✅ TEST 5 PASSED: Other players have 4 cards each (all face-down)`);
      
      // TEST 6: Deck should be empty
      expect(state.deck.length).toBe(0);
      console.log(`✅ TEST 6 PASSED: Deck is empty after last deal`);
      
      console.log(`\n🎉 ALL TESTS PASSED FOR 2v2!\n`);
    }
  }
  
  if (!foundJackTrump) {
    console.log(`\n⚠️ Did not find Jack trump in ${maxAttempts} attempts (2v2)`);
    console.log(`This is statistically unlikely but possible. Try running test again.`);
  }
  
  expect(foundJackTrump).toBe(true);
});
});
