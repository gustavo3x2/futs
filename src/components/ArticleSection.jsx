import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import ArticleCard from './ArticleCard';
import './ArticleSection.css';

export default function ArticleSection({ articles }) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeArticle, setActiveArticle] = useState(null);

  // Obtém todas as categorias dinamicamente
  const categories = ['Todas', ...new Set(articles.map(art => art.category))];

  // Filtra artigos
  const filteredArticles = selectedCategory === 'Todas' 
    ? articles 
    : articles.filter(art => art.category === selectedCategory);

  const handleOpenArticle = (article) => {
    setActiveArticle(article);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
  };

  return (
    <section className="articles-section" id="analises">
      <div className="section-container">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">As análises da semana</h2>
            <p className="section-subtitle">Leu aqui, riu depois. A verdade nua e crua da rodada.</p>
          </div>
          
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">⚽</span>
            <p>Nenhuma resenha cadastrada para esta categoria ainda.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(art => (
              <ArticleCard 
                key={art.id} 
                article={art} 
                onOpenArticle={() => handleOpenArticle(art)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Leitura Completa de Artigo */}
      {activeArticle && (
        <div className="modal-overlay article-modal-overlay" onClick={handleCloseArticle}>
          <div className="modal-content article-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseArticle} title="Fechar">
              <X size={20} />
            </button>
            
            <div className="modal-article-header">
              <div className="modal-article-meta">
                <span className="modal-category">{activeArticle.category}</span>
                <span className="meta-sep">•</span>
                <span className="meta-item">
                  <Calendar size={14} />
                  {activeArticle.date}
                </span>
                <span className="meta-sep">•</span>
                <span className="meta-item">
                  <Clock size={14} />
                  {activeArticle.readTime}
                </span>
              </div>
              <h2 className="modal-article-title">{activeArticle.title}</h2>
            </div>
            
            <div className="modal-article-body">
              <div className="modal-image-container">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  className="modal-article-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <div className="modal-article-text">
                {activeArticle.content.split('\n').map((para, idx) => (
                  <p key={idx} className="modal-para">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
