import React, { useState } from 'react';
import { X, Lock, User, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../db/database';
import './LoginModal.css';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simula atraso de rede sutil para melhor UX
    setTimeout(() => {
      const res = loginAdmin(username.trim(), password.trim());
      setLoading(false);

      if (res.success) {
        onLoginSuccess(res.session);
        onClose();
      } else {
        setError(res.error);
      }
    }, 600);
  };

  return (
    <div className="modal-overlay login-modal-overlay" onClick={onClose}>
      <div className="modal-content login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fechar">
          <X size={18} />
        </button>

        <div className="login-header text-center">
          <div className="login-logo-icon">⚽</div>
          <h2>Acesso Restrito</h2>
          <p>Faça login para gerenciar as resenhas, rankings e moderar o mural de zoeiras.</p>
        </div>

        {error && (
          <div className="login-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-username" className="form-label">Usuário</label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input
                type="text"
                id="login-username"
                className="form-control"
                placeholder="Ex: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Senha</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="login-password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-tip">
            <span className="tip-label">Dica:</span> Use o usuário <code>admin</code> e senha <code>admin123</code> para testar localmente.
          </div>

          <button 
            type="submit" 
            className="glow-button submit-login-btn"
            disabled={loading}
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </div>
  );
}
