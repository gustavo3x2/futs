import React from 'react';
import { User, LogOut, ShieldAlert } from 'lucide-react';
import './Header.css';

export default function Header({ isAdmin, onOpenLogin, onOpenAdmin, onLogout, showAdminView, onToggleView }) {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-section" onClick={() => { if (showAdminView) onToggleView(); }}>
          <span className="logo-icon">⚽</span>
          <span className="logo-text">O OUTRO <span className="highlight">ESPORTE</span></span>
        </div>

        <nav className="header-nav">
          <a href="#analises" className="nav-link" onClick={() => { if (showAdminView) onToggleView(); }}>Análises</a>
          <a href="#rankings" className="nav-link" onClick={() => { if (showAdminView) onToggleView(); }}>Rankings</a>
          <a href="#zoeira" className="nav-link" onClick={() => { if (showAdminView) onToggleView(); }}>Zoeira</a>
        </nav>

        <div className="header-actions">
          {isAdmin ? (
            <>
              <button 
                className={`action-btn admin-panel-btn ${showAdminView ? 'active' : ''}`} 
                onClick={onToggleView}
                title="Painel Admin"
              >
                <ShieldAlert size={18} />
                <span>{showAdminView ? 'Voltar ao Site' : 'Painel Admin'}</span>
              </button>
              <button className="action-btn logout-btn" onClick={onLogout} title="Sair">
                <LogOut size={18} />
                <span className="hide-mobile">Sair</span>
              </button>
            </>
          ) : (
            <button className="action-btn login-btn" onClick={onOpenLogin}>
              <User size={18} />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
