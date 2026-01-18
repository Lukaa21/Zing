import React from 'react';

const suitToSymbol: Record<string, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

const suitToColor: Record<string, string> = {
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black',
  spades: 'black'
};

const Card: React.FC<{ id: string; onClick?: (id: string) => void; faceDown?: boolean; disabled?: boolean }> = ({ id, onClick, faceDown, disabled }) => {
  if (faceDown || id === 'back') {
    return <div className="card card-back">🂠</div>;
  }
  const [suit, rank] = id.split('-');
  const symbol = suitToSymbol[suit] || '?';
  const color = suitToColor[suit] || 'black';
  return (
    <div
      className="card card-front"
      onClick={() => !disabled && onClick?.(id)}
      style={{ color, opacity: disabled ? 0.45 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
    >
      <div className="rank top-left">{rank}</div>
      <div className="suit center">{symbol}</div>
      <div className="rank bottom-right">{rank}</div>
    </div>
  );
};

export default Card;

/* Add basic styles in styles.css:
.card { display: inline-flex; width: 72px; height: 100px; border-radius: 8px; border: 1px solid #ddd; background: white; align-items: center; justify-content: center; margin: 4px; }
.card-back { background: linear-gradient(135deg, #333, #555); color: white; }
.card-front .rank { font-size: 16px; font-weight: 600; position: absolute; }
.card-front .top-left { position: absolute; left: 6px; top: 6px; }
.card-front .bottom-right { position: absolute; right: 6px; bottom: 6px; transform: rotate(180deg);} 
.card-front .suit { font-size: 36px; }
*/
