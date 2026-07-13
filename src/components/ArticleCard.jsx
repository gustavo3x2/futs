import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './ArticleSection.css'; // Usaremos a mesma folha de estilo para a seção e os cards

export default function ArticleCard({ article, onOpenArticle }) {
  const { title, category, excerpt, readTime, imageUrl, date } = article;
  
  return (
    <article className="article-card" onClick={onOpenArticle}>
      <div className="article-image-wrapper">
        <img 
          src={imageUrl} 
          alt={title} 
          className="article-card-img" 
          onError={(e) => {
            // Imagem genérica estilizada caso falhe
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80";
          }}
        />
        <span className="article-category-badge">{category}</span>
      </div>
      
      <div className="article-card-content">
        <div className="article-meta">
          <span className="meta-item">
            <Calendar size={13} />
            {date}
          </span>
          <span className="meta-item">
            <Clock size={13} />
            {readTime}
          </span>
        </div>
        
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-excerpt">{excerpt}</p>
        
        <div className="article-card-footer">
          <span className="read-more-btn">
            Ler resenha <ArrowRight size={14} className="arrow-icon" />
          </span>
        </div>
      </div>
    </article>
  );
}
