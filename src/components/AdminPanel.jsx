import React, { useState } from 'react';
import { 
  FileText, TrendingUp, MessageSquare, Plus, Edit2, Trash2, Save, X, Eye 
} from 'lucide-react';
import './AdminPanel.css';

export default function AdminPanel({ 
  articles, onSaveArticle, onDeleteArticle, 
  rankings, onSaveRankings, 
  zoeiras, onDeleteZoeira 
}) {
  const [activeTab, setActiveTab] = useState('articles'); // articles | rankings | zoeira
  
  // Estados do formulário de Artigos
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('Arbitragem');
  const [articleReadTime, setArticleReadTime] = useState('5 min');
  const [articleImageUrl, setArticleImageUrl] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleNotaCraque, setArticleNotaCraque] = useState(9.5);
  const [articleHumildade, setArticleHumildade] = useState(2.0);

  // Estados dos Rankings (inicializado dinamicamente por props)
  const [tempRankings, setTempRankings] = useState(() => JSON.parse(JSON.stringify(rankings)));

  // Abrir formulário para Novo Artigo
  const handleNewArticle = () => {
    setEditingArticle(null);
    setArticleTitle('');
    setArticleCategory('Arbitragem');
    setArticleReadTime('5 min');
    setArticleImageUrl('https://www.ooutroesporte.shop/images/art-var.png');
    setArticleExcerpt('');
    setArticleContent('');
    setArticleNotaCraque(9.5);
    setArticleHumildade(2.0);
    setIsArticleFormOpen(true);
  };

  // Abrir formulário para Editar Artigo existente
  const handleEditArticle = (art) => {
    setEditingArticle(art);
    setArticleTitle(art.title);
    setArticleCategory(art.category);
    setArticleReadTime(art.readTime);
    setArticleImageUrl(art.imageUrl);
    setArticleExcerpt(art.excerpt);
    setArticleContent(art.content);
    setArticleNotaCraque(art.notaCraque !== undefined ? art.notaCraque : 9.5);
    setArticleHumildade(art.humildade !== undefined ? art.humildade : 2.0);
    setIsArticleFormOpen(true);
  };

  // Submeter formulário de artigo (Criar ou Editar)
  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleContent.trim() || !articleExcerpt.trim()) return;

    const articleData = {
      id: editingArticle ? editingArticle.id : undefined,
      title: articleTitle.trim(),
      category: articleCategory,
      readTime: articleReadTime,
      imageUrl: articleImageUrl.trim() || 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80',
      excerpt: articleExcerpt.trim(),
      content: articleContent.trim(),
      notaCraque: Number(articleNotaCraque) || 0,
      humildade: Number(articleHumildade) || 0,
      date: editingArticle ? editingArticle.date : undefined
    };

    onSaveArticle(articleData);
    setIsArticleFormOpen(false);
  };

  // Alterar dados dos rankings temporários
  const handleRankingChange = (type, index, field, value) => {
    setTempRankings(prev => {
      const copy = { ...prev };
      copy[type][index][field] = value;
      return copy;
    });
  };

  // Salvar rankings
  const handleRankingsSubmit = (e) => {
    e.preventDefault();
    onSaveRankings(tempRankings);
    alert('Rankings atualizados com sucesso!');
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-container">
        
        {/* Barra Lateral de Abas */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h3>Painel Admin</h3>
            <p>Gerencie o conteúdo do site</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`sidebar-link ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              <FileText size={18} />
              <span>Resenhas</span>
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'rankings' ? 'active' : ''}`}
              onClick={() => setActiveTab('rankings')}
            >
              <TrendingUp size={18} />
              <span>Rankings da Semana</span>
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'zoeira' ? 'active' : ''}`}
              onClick={() => setActiveTab('zoeira')}
            >
              <MessageSquare size={18} />
              <span>Moderar Mural</span>
            </button>
          </nav>
        </aside>

        {/* Conteúdo Principal do Painel */}
        <main className="admin-main-content">
          
          {/* TAB: RESENHAS (ARTIGOS) */}
          {activeTab === 'articles' && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <h2>Gerenciar Resenhas</h2>
                <button className="glow-button new-article-btn" onClick={handleNewArticle}>
                  <Plus size={16} />
                  <span>Novo Artigo</span>
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Miniatura</th>
                      <th>Título</th>
                      <th>Categoria</th>
                      <th>Data</th>
                      <th>Leitura</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          Nenhum artigo cadastrado. Crie um novo acima!
                        </td>
                      </tr>
                    ) : (
                      articles.map(art => (
                        <tr key={art.id}>
                          <td>
                            <img 
                              src={art.imageUrl} 
                              alt="" 
                              className="table-thumb"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=150&q=80";
                              }}
                            />
                          </td>
                          <td className="font-bold table-title-cell">{art.title}</td>
                          <td>
                            <span className="table-badge">{art.category}</span>
                          </td>
                          <td>{art.date}</td>
                          <td>{art.readTime}</td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="table-action-btn edit" 
                                onClick={() => handleEditArticle(art)}
                                title="Editar"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                className="table-action-btn delete" 
                                onClick={() => onDeleteArticle(art.id)}
                                title="Deletar"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: RANKINGS */}
          {activeTab === 'rankings' && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <h2>Editar Rankings Semanais</h2>
              </div>
              
              <form onSubmit={handleRankingsSubmit} className="rankings-edit-form">
                <div className="rankings-columns-row">
                  
                  {/* Edição: Quem Brilhou */}
                  <div className="ranking-edit-column col-brilhou-edit">
                    <h3>👍 Quem Brilhou</h3>
                    <div className="ranking-items-inputs">
                      {tempRankings.brilhou.map((item, idx) => (
                        <div key={item.id || idx} className="ranking-item-input-box">
                          <span className="item-position">{idx + 1}º Lugar</span>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Título (ex: Meia Xodó)"
                              value={item.title}
                              onChange={(e) => handleRankingChange('brilhou', idx, 'title', e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Descrição"
                              value={item.description}
                              onChange={(e) => handleRankingChange('brilhou', idx, 'description', e.target.value)}
                              rows={2}
                              required
                            ></textarea>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Edição: Quem Desandou */}
                  <div className="ranking-edit-column col-desandou-edit">
                    <h3>👎 Quem Desandou</h3>
                    <div className="ranking-items-inputs">
                      {tempRankings.desandou.map((item, idx) => (
                        <div key={item.id || idx} className="ranking-item-input-box">
                          <span className="item-position">{idx + 1}º Lugar</span>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Título (ex: Promessa Cara)"
                              value={item.title}
                              onChange={(e) => handleRankingChange('desandou', idx, 'title', e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Descrição"
                              value={item.description}
                              onChange={(e) => handleRankingChange('desandou', idx, 'description', e.target.value)}
                              rows={2}
                              required
                            ></textarea>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="form-actions-row">
                  <button type="submit" className="glow-button save-rankings-btn">
                    <Save size={16} />
                    <span>Salvar Rankings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: MODERAÇÃO DO MURAL */}
          {activeTab === 'zoeira' && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <h2>Moderação do Mural da Zoeira</h2>
                <p className="tab-desc">Exclua piadas ou cornetas que julgar impróprias ou ofensivas para a comunidade.</p>
              </div>

              <div className="moderation-list">
                {zoeiras.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    Nenhuma piada postada no mural ainda.
                  </div>
                ) : (
                  zoeiras.map(z => (
                    <div key={z.id} className="moderation-card">
                      <div className="mod-card-content">
                        <span className="mod-card-author">{z.author}</span>
                        <p className="mod-card-text">"{z.text}"</p>
                        <span className="mod-card-likes">❤️ {z.likes.toLocaleString('pt-BR')} curtidas</span>
                      </div>
                      
                      <button 
                        className="mod-delete-btn" 
                        onClick={() => {
                          if (confirm('Tem certeza que deseja excluir esta zoeira?')) {
                            onDeleteZoeira(z.id);
                          }
                        }}
                        title="Remover do Mural"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL FORMULÁRIO DE ARTIGO (CRIAR E EDITAR) */}
      {isArticleFormOpen && (
        <div className="modal-overlay article-form-overlay" onClick={() => setIsArticleFormOpen(false)}>
          <div className="modal-content article-form-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsArticleFormOpen(false)} title="Fechar">
              <X size={18} />
            </button>

            <h2>{editingArticle ? 'Editar Resenha' : 'Nova Resenha'}</h2>
            <p className="form-subtitle">Crie ou edite as análises com deboche e irreverência.</p>

            <form onSubmit={handleArticleSubmit} className="article-admin-form">
              <div className="form-group">
                <label className="form-label" htmlFor="art-title">Título</label>
                <input
                  type="text"
                  id="art-title"
                  className="form-control"
                  placeholder="Ex: VAR demora 6 minutos e erra"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group col-half">
                  <label className="form-label" htmlFor="art-category">Categoria</label>
                  <select
                    id="art-category"
                    className="form-control"
                    value={articleCategory}
                    onChange={(e) => setArticleCategory(e.target.value)}
                  >
                    <option value="Arbitragem">Arbitragem</option>
                    <option value="Torcida">Torcida</option>
                    <option value="Banco">Banco (Técnico)</option>
                    <option value="Resenha">Resenha Geral</option>
                    <option value="Diretoria">Diretoria</option>
                  </select>
                </div>

                <div className="form-group col-half">
                  <label className="form-label" htmlFor="art-readtime">Tempo de Leitura</label>
                  <input
                    type="text"
                    id="art-readtime"
                    className="form-control"
                    placeholder="Ex: 5 min"
                    value={articleReadTime}
                    onChange={(e) => setArticleReadTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-half">
                  <label className="form-label" htmlFor="art-notacraque">Nota do Craque (0 a 10)</label>
                  <input
                    type="number"
                    id="art-notacraque"
                    className="form-control"
                    placeholder="Ex: 9.5"
                    min="0"
                    max="10"
                    step="0.1"
                    value={articleNotaCraque}
                    onChange={(e) => setArticleNotaCraque(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group col-half">
                  <label className="form-label" htmlFor="art-humildade">Nota de Humildade (0 a 10)</label>
                  <input
                    type="number"
                    id="art-humildade"
                    className="form-control"
                    placeholder="Ex: 2.0"
                    min="0"
                    max="10"
                    step="0.1"
                    value={articleHumildade}
                    onChange={(e) => setArticleHumildade(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="art-image">URL da Imagem de Destaque</label>
                <input
                  type="text"
                  id="art-image"
                  className="form-control"
                  placeholder="Link da imagem (ex: https://...)"
                  value={articleImageUrl}
                  onChange={(e) => setArticleImageUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="art-excerpt">Resumo (Excerpt)</label>
                <textarea
                  id="art-excerpt"
                  className="form-control"
                  placeholder="Escreva uma frase de resumo satírico..."
                  value={articleExcerpt}
                  onChange={(e) => setArticleExcerpt(e.target.value)}
                  rows={2}
                  maxLength={160}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="art-content">Conteúdo Completo</label>
                <textarea
                  id="art-content"
                  className="form-control"
                  placeholder="Escreva o texto completo da matéria..."
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  rows={6}
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="form-btn-cancel" 
                  onClick={() => setIsArticleFormOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="glow-button form-btn-save">
                  Salvar Resenha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
