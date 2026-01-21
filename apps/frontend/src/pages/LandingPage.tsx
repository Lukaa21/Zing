import React from 'react';

interface LandingPageProps {
  onPlayAsGuest?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onPlayAsGuest = () => undefined,
  onLogin = () => undefined,
  onRegister = () => undefined,
}) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <img src="/zing_logo.png" alt="Zing Logo" className="landing-logo" />
        <p className="landing-subtitle">Igrajte sa prijateljima za par sekundi.</p>
        
        <div className="landing-buttons">
          <button className="landing-btn landing-btn-primary" onClick={onPlayAsGuest}>
            Igraj kao Gost
          </button>
          <button className="landing-btn landing-btn-secondary" onClick={onLogin}>
            Prijava
          </button>
          <button className="landing-btn landing-btn-secondary" onClick={onRegister}>
            Registracija
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
