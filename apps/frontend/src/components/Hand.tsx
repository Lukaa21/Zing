import React from 'react';
import Card from './Card';

const Hand: React.FC<{ cards: string[]; onPlay: (id: string) => void }> = ({ cards, onPlay }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {cards.map((c) => (
        <Card key={c} id={c} onClick={() => onPlay(c)} />
      ))}
    </div>
  );
};

export default Hand;
