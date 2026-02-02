import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

interface RegisterFormProps {
  onSuccess: (user: { id: string; email: string; username: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await register(email, password, username);
      // Clear old guest name from localStorage
      localStorage.removeItem('zing_guest_name');
      onSuccess(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'registration failed');
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
          <h1 className="auth-title">Napravi Nalog</h1>
          <p className="auth-subtitle">Pridruži se igri za par sekundi</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="auth-input"
              placeholder="vas@email.com"
              autoComplete="email"
            />
            <span className="auth-input-hint">Unesite validnu email adresu (npr. ime@gmail.com)</span>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Korisničko ime</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              maxLength={30}
              pattern="[a-zA-Z0-9_]+"
              className="auth-input"
              placeholder="korisnik123"
              autoComplete="username"
            />
            <span className="auth-input-hint">Samo slova, brojevi i donja crta</span>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Lozinka</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="auth-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <img 
                  src={showPassword ? '/hide.png' : '/view.png'} 
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon"
                />
              </button>
            </div>
            <span className="auth-input-hint">Minimum 8 karaktera</span>
          </div>

          <button type="submit" disabled={isLoading} className="auth-submit-btn">
            {isLoading ? 'Kreiram nalog...' : 'Napravi Nalog'}
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-footer-text">
            Već imaš nalog?{' '}
            <button className="auth-footer-link" onClick={() => navigate('/login')}>
              Prijavi se
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
