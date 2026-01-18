import React from 'react';
import '../styles/Card.css';

// Map suit names to SVG sprite IDs
const suitToSVG: Record<string, string> = {
  hearts: 'heart',
  diamonds: 'diamond',
  clubs: 'club',
  spades: 'spade'
};

// Map rank to SVG sprite format
const rankToSVG: Record<string, string> = {
  '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', 
  '7': '7', '8': '8', '9': '9', '10': '10',
  'J': 'jack', 'Q': 'queen', 'K': 'king', 'A': '1'
};

const Card: React.FC<{ id: string; onClick?: (id: string) => void; faceDown?: boolean; disabled?: boolean }> = ({ id, onClick, faceDown, disabled }) => {
  if (faceDown || id === 'back') {
    return (
      <svg className="card card-back" viewBox="0 0 169.075 244.640">
        <use xlinkHref="/cards.svg#back" />
      </svg>
    );
  }
  
  const [suit, rank] = id.split('-');
  
  // Validate card ID - log only errors
  if (!suitToSVG[suit]) {
    console.error(`❌ Invalid suit in card ID: "${id}" | suit: "${suit}" | rank: "${rank}"`);
  }
  if (!rankToSVG[rank]) {
    console.error(`❌ Invalid rank in card ID: "${id}" | suit: "${suit}" | rank: "${rank}"`);
  }
  
  const suitSVG = suitToSVG[suit] || 'spade';
  const rankSVG = rankToSVG[rank] || 'ace';
  const cardId = `${suitSVG}_${rankSVG}`;
  
  // Log only if we had to use fallback
  if (!suitToSVG[suit] || !rankToSVG[rank]) {
    console.warn(`⚠️ Using fallback for card "${id}" → SVG ID: "${cardId}"`);
  }
  
  return (
    <svg
      className={`card card-front ${disabled ? 'disabled' : ''}`}
      viewBox="0 0 169.075 244.640"
      onClick={() => !disabled && onClick?.(id)}
    >
      <use xlinkHref={`/cards.svg#${cardId}`} />
    </svg>
  );
};

export default Card;
