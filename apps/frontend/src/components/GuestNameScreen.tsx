import React, { useState } from 'react';
import { setGuestName } from '../utils/guest';

interface GuestNameScreenProps {
  onConfirm: (name: string) => void;
}

const GuestNameScreen: React.FC<GuestNameScreenProps> = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (name.trim().length > 20) {
      setError('Name must be 20 characters or less');
      return;
    }

    setGuestName(name.trim());
    onConfirm(name.trim());
  };

  return (
    <div className="guest-name-screen">
      <div className="guest-name-content">
        <h2>Join as Guest</h2>
        <p>What's your name?</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            maxLength={20}
          />
          {error && <div className="guest-name-error">{error}</div>}
          <button type="submit" className="guest-name-btn">
            Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestNameScreen;
