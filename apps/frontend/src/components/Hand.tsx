import React from 'react';
import Card from './Card';

const Hand: React.FC<{ cards: string[]; onPlay: (id: string) => void; disabled?: boolean }> = ({ cards, onPlay, disabled }) => {
  return (
    <div className="hand-wrapper">
      {cards.map((c) => (
        <Card key={c} id={c} onClick={() => onPlay(c)} disabled={!!disabled} />
      ))}
    </div>
  );
};

export default Hand;
