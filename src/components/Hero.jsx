import React, { useState } from 'react';
import './Hero.css';

export default function Hero({ latestArticle, onVoteReaction }) {
  // Rastreia se o usuário já votou neste post em destaque nesta sessão
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (type) => {
    if (hasVoted || !latestArticle) return;
    onVoteReaction(latestArticle.id, type);
    setHasVoted(true);
  };

  // Valores padrão se não houver artigo cadastrado
  const displayImage = latestArticle?.imageUrl || "https://www.ooutroesporte.shop/images/hero-craque.png";
  const displayTitle = latestArticle?.title || "Eles jogaram mal, mas a gente jogou a real.";
  const displayExcerpt = latestArticle?.excerpt || "Toda segunda a gente disseca a rodada com gráfico, estatística e uma pitada generosa de deboche. Porque futebol a gente leva a sério — só não leva a mal.";
  const displayNota = latestArticle?.notaCraque !== undefined ? latestArticle.notaCraque.toFixed(1) : "9.5";
  const displayHumildade = latestArticle?.humildade !== undefined ? latestArticle.humildade.toFixed(1) : "2.0";

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="badge">⚽ Destaque da Rodada</div>
          <h1 className="hero-title">
            {latestArticle ? (
              <>
                Última Resenha: <br />
                <span className="neon-text">{displayTitle}</span>
              </>
            ) : (
              <>
                Eles jogaram mal, <br />
                mas a gente <span className="neon-text">jogou a real.</span>
              </>
            )}
          </h1>
          <p className="hero-description">{displayExcerpt}</p>
          <div className="hero-actions-row">
            <a href="#analises" className="hero-btn primary-btn">
              Ler todas as resenhas
            </a>
            <a href="#zoeira" className="hero-btn secondary-btn">
              Ir direto pra zoeira
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="craque-card">
            <img 
              src={displayImage} 
              alt="Destaque da rodada" 
              className="craque-img"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80";
              }}
            />
            <div className="craque-overlay">
              <div className="craque-rating">
                <span className="rating-label">Nota do craque:</span>
                <span className="rating-value">{displayNota}</span>
              </div>
              <div className="craque-divider"></div>
              <div className="craque-stat">
                <span className="rating-label">Humildade:</span>
                <span className="rating-value negative">{displayHumildade}</span>
              </div>
            </div>
            
            {/* Seção de Reações da Torcida */}
            {latestArticle && (
              <div className="hero-reactions">
                <span className="reactions-label">Opinião da Torcida:</span>
                <div className="reactions-buttons">
                  <button 
                    className={`reaction-btn vote-craque ${hasVoted ? 'voted' : ''}`}
                    onClick={() => handleVote('craque')}
                    disabled={hasVoted}
                    title={hasVoted ? "Você já votou" : "Votar como Craque"}
                  >
                    <span className="emoji">🔥</span>
                    <span className="reaction-name">Craque</span>
                    <span className="reaction-count">{(latestArticle.votosCraque || 0).toLocaleString('pt-BR')}</span>
                  </button>
                  <button 
                    className={`reaction-btn vote-bagre ${hasVoted ? 'voted' : ''}`}
                    onClick={() => handleVote('bagre')}
                    disabled={hasVoted}
                    title={hasVoted ? "Você já votou" : "Votar como Bagre"}
                  >
                    <span className="emoji">🤡</span>
                    <span className="reaction-name">Bagre</span>
                    <span className="reaction-count">{(latestArticle.votosBagre || 0).toLocaleString('pt-BR')}</span>
                  </button>
                </div>
                {hasVoted && <p className="voted-thanks">Obrigado pelo seu voto!</p>}
              </div>
            )}

            <div className="glowing-orb"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
