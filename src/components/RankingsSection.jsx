import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './RankingsSection.css';

export default function RankingsSection({ rankings }) {
  const { brilhou = [], desandou = [] } = rankings;

  return (
    <section className="rankings-section" id="rankings">
      <div className="rankings-container">
        <div className="rankings-header text-center">
          <h2 className="section-title">O ranking mais polêmico da internet</h2>
          <p className="section-subtitle">Sem critério científico, só opinião forte. Se o seu time apareceu no lado errado, respira: semana que vem tem revanche.</p>
        </div>

        <div className="rankings-grid">
          {/* Coluna Quem Brilhou */}
          <div className="ranking-column column-brilhou">
            <div className="column-header">
              <TrendingUp size={24} className="icon-up" />
              <h3>Quem Brilhou</h3>
            </div>
            
            <div className="ranking-list">
              {brilhou.map((item, index) => (
                <div key={item.id || index} className="ranking-item">
                  <div className="ranking-number">{index + 1}</div>
                  <div className="ranking-details">
                    <h4 className="ranking-item-title">{item.title}</h4>
                    <p className="ranking-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Quem Desandou */}
          <div className="ranking-column column-desandou">
            <div className="column-header">
              <TrendingDown size={24} className="icon-down" />
              <h3>Quem Desandou</h3>
            </div>
            
            <div className="ranking-list">
              {desandou.map((item, index) => (
                <div key={item.id || index} className="ranking-item">
                  <div className="ranking-number">{index + 1}</div>
                  <div className="ranking-details">
                    <h4 className="ranking-item-title">{item.title}</h4>
                    <p className="ranking-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
