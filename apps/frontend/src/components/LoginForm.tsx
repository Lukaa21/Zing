import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

interface LoginFormProps {
  onSuccess: (user: { id: string; email: string; username: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(emailOrUsername, password);
      // Clear old guest name from localStorage
      localStorage.removeItem('zing_guest_name');
      onSuccess(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="auth-back-btn" onClick={() => navigate(-1)}>
          ← Nazad
        </button>
        
        <div className="auth-header">
          <h1 className="auth-title">Dobrodošli Nazad</h1>
          <p className="auth-subtitle">Prijavite se da nastavite igru</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Email ili Korisničko ime</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="auth-input"
              placeholder="vas@email.com ili korisnik123"
              autoComplete="username"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Lozinka</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="auth-submit-btn">
            {isLoading ? 'Prijavljujem...' : 'Prijavi se'}
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-footer-text">
            Nemaš nalog?{' '}
            <button className="auth-footer-link" onClick={() => navigate('/register')}>
              Registruj se
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
