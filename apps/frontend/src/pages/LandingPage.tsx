import React from 'react';

interface LandingPageProps {
  onPlayAsGuest?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onPlayAsGuest = () => {},
  onLogin = () => {},
  onRegister = () => {},
}) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <img src="/zing_logo.png" alt="Zing Logo" className="landing-logo" />
        <p className="landing-subtitle">Card game — play with friends in seconds.</p>
        
        <div className="landing-buttons">
          <button className="landing-btn landing-btn-primary" onClick={onPlayAsGuest}>
            Play as Guest
          </button>
          <button className="landing-btn landing-btn-secondary" onClick={onLogin}>
            Login
          </button>
          <button className="landing-btn landing-btn-secondary" onClick={onRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
