import React, { useState } from 'react';
import { Heart, Send, Trash2 } from 'lucide-react';
import './ZoeiraSection.css';

export default function ZoeiraSection({ zoeiras, onLike, onAdd, onDelete, isAdmin }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [likedIds, setLikedIds] = useState(new Set()); // Rastreia quais zoeiras este navegador já curtiu na sessão

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Envia a nova zoeira. Se não houver autor, usa o padrão do DB.
    onAdd(text.trim(), author.trim() || undefined);
    
    // Limpa campos
    setText('');
    setAuthor('');
  };

  const handleLikeClick = (id) => {
    if (likedIds.has(id)) return; // Evita curtida dupla do mesmo navegador nesta sessão
    
    onLike(id);
    setLikedIds(prev => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  };

  // Limite de caracteres do mural
  const CHAR_LIMIT = 140;

  return (
    <section className="zoeira-section" id="zoeira">
      <div className="zoeira-container">
        <div className="zoeira-header text-center">
          <h2 className="section-title">Mural da zoeira</h2>
          <p className="section-subtitle">A resenha não perdoa ninguém. Manda a sua e talvez você apareça aqui na próxima segunda.</p>
        </div>

        <div className="zoeira-layout">
          {/* Mural de Zoeiras */}
          <div className="zoeira-wall">
            {zoeiras.length === 0 ? (
              <div className="empty-wall">
                <p>Nenhuma piada por aqui ainda. Seja o primeiro a cornetar!</p>
              </div>
            ) : (
              <div className="zoeiras-list">
                {zoeiras.map((z) => {
                  const isAlreadyLiked = likedIds.has(z.id);
                  return (
                    <div key={z.id} className="zoeira-card">
                      <p className="zoeira-text">"{z.text}"</p>
                      
                      <div className="zoeira-footer">
                        <span className="zoeira-author">{z.author}</span>
                        
                        <div className="zoeira-actions">
                          <button 
                            className={`zoeira-action-btn like-btn ${isAlreadyLiked ? 'liked' : ''}`}
                            onClick={() => handleLikeClick(z.id)}
                            disabled={isAlreadyLiked}
                            title={isAlreadyLiked ? "Você já curtiu" : "Curtir"}
                          >
                            <Heart size={16} fill={isAlreadyLiked ? "currentColor" : "none"} />
                            <span>{z.likes.toLocaleString('pt-BR')}</span>
                          </button>

                          {isAdmin && (
                            <button 
                              className="zoeira-action-btn delete-btn" 
                              onClick={() => onDelete(z.id)}
                              title="Remover piada"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Formulário de Envio */}
          <div className="zoeira-form-container">
            <div className="form-card">
              <h3>Mande seu Deboche</h3>
              <p className="form-desc">Escreva a sua corneta sobre a rodada do fim de semana. Seja criativo!</p>
              
              <form onSubmit={handleSubmit} className="zoeira-form">
                <div className="form-group">
                  <label htmlFor="zoeira-author" className="form-label">Seu Nome/User (Opcional)</label>
                  <input
                    type="text"
                    id="zoeira-author"
                    className="form-control"
                    placeholder="@seu_usuario"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    maxLength={30}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zoeira-text" className="form-label">Sua piada</label>
                  <textarea
                    id="zoeira-text"
                    className="form-control zoeira-textarea"
                    placeholder="Quem é o craque que jogou na praia hoje? Escreve aqui..."
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, CHAR_LIMIT))}
                    rows={4}
                    required
                  ></textarea>
                  <span className={`char-counter ${text.length >= CHAR_LIMIT ? 'limit-reached' : ''}`}>
                    {text.length}/{CHAR_LIMIT}
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="glow-button submit-zoeira-btn" 
                  disabled={!text.trim()}
                >
                  <Send size={16} />
                  <span>Publicar no Mural</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
