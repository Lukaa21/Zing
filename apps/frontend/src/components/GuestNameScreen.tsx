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
      setError('Molimo unesite ime');
      return;
    }

    if (name.trim().length > 20) {
      setError('Ime može imati maksimalno 20 karaktera');
      return;
    }

    setGuestName(name.trim());
    onConfirm(name.trim());
  };

  return (
    <div className="guest-name-screen">
      <div className="guest-name-content">
        <h2>Pridruži se kao Gost</h2>
        <p>Kako se zoveš?</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Unesi svoje ime"
            autoFocus
            maxLength={20}
          />
          {error && <div className="guest-name-error">{error}</div>}
          <button type="submit" className="guest-name-btn">
            Igraj
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestNameScreen;
