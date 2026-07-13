import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes
import Header from './components/Header';
import Hero from './components/Hero';
import ArticleSection from './components/ArticleSection';
import RankingsSection from './components/RankingsSection';
import ZoeiraSection from './components/ZoeiraSection';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';

// Banco de Dados Local (localStorage)
import { 
  getArticles, saveArticle, deleteArticle,
  getRankings, updateRankings,
  getZoeiras, addZoeira, likeZoeira, deleteZoeira,
  getAdminSession, logoutAdmin, voteArticleReaction
} from './db/database';

function App() {
  // Estados Reativos do Banco Local
  const [articles, setArticles] = useState([]);
  const [rankings, setRankings] = useState({ brilhou: [], desandou: [] });
  const [zoeiras, setZoeiras] = useState([]);

  // Estados de Autenticação e Visualização
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Carrega os dados na inicialização
  useEffect(() => {
    setArticles(getArticles());
    setRankings(getRankings());
    setZoeiras(getZoeiras());
    
    const session = getAdminSession();
    if (session && session.isLoggedIn) {
      setIsAdmin(true);
    }
  }, []);

  // --- Callbacks do CRUD de Artigos ---
  const handleSaveArticle = (articleData) => {
    const updated = saveArticle(articleData);
    setArticles(updated);
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta resenha?')) {
      const updated = deleteArticle(id);
      setArticles(updated);
    }
  };

  // --- Callbacks de Rankings ---
  const handleSaveRankings = (newRankings) => {
    const updated = updateRankings(newRankings);
    setRankings(updated);
  };

  // --- Callbacks do Mural de Zoeiras ---
  const handleAddZoeira = (text, author) => {
    const updated = addZoeira(text, author);
    setZoeiras(updated);
  };

  const handleLikeZoeira = (id) => {
    const updated = likeZoeira(id);
    // Para atualizar a lista localmente na hora mantendo a integridade
    setZoeiras(getZoeiras());
  };

  const handleDeleteZoeira = (id) => {
    const updated = deleteZoeira(id);
    setZoeiras(updated);
  };

  // --- Callback de Votos no Destaque do Hero ---
  const handleVoteArticle = (id, type) => {
    voteArticleReaction(id, type);
    setArticles(getArticles());
  };

  // --- Callbacks de Sessão ---
  const handleLoginSuccess = (session) => {
    setIsAdmin(true);
    setShowAdminView(true); // Redireciona o Admin logado direto para o painel de edição
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setShowAdminView(false);
  };

  const handleToggleView = () => {
    setShowAdminView(prev => !prev);
  };

  return (
    <div className="app-container">
      {/* Cabeçalho de Navegação e Controle */}
      <Header 
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdmin={() => setShowAdminView(true)}
        onLogout={handleLogout}
        showAdminView={showAdminView}
        onToggleView={handleToggleView}
      />

      {/* Renderização Condicional: Site Público ou Painel Admin */}
      {showAdminView && isAdmin ? (
        <AdminPanel 
          articles={articles}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
          rankings={rankings}
          onSaveRankings={handleSaveRankings}
          zoeiras={zoeiras}
          onDeleteZoeira={handleDeleteZoeira}
        />
      ) : (
        <>
          {/* Seção de Entrada/Abertura */}
          <Hero latestArticle={articles[0]} onVoteReaction={handleVoteArticle} />
          
          {/* Seção das Críticas/Resenhas (Artigos) */}
          <ArticleSection articles={articles} />
          
          {/* Seções de Classificação Semanal */}
          <RankingsSection rankings={rankings} />
          
          {/* Mural de Interações de Torcedores */}
          <ZoeiraSection 
            zoeiras={zoeiras}
            onLike={handleLikeZoeira}
            onAdd={handleAddZoeira}
            onDelete={handleDeleteZoeira}
            isAdmin={isAdmin}
          />

          {/* Rodapé Premium */}
          <footer className="main-footer">
            <div className="footer-container">
              <div className="footer-logo">
                ⚽ O OUTRO <span className="highlight">ESPORTE</span>
              </div>
              <nav className="footer-nav">
                <a href="#analises" className="footer-link">Análises</a>
                <a href="#rankings" className="footer-link">Rankings</a>
                <a href="#zoeira" className="footer-link">Zoeira</a>
              </nav>
              <div className="footer-copyright">
                &copy; {new Date().getFullYear()} O Outro Esporte — Futebol sem papas na língua. Desenvolvido para fins de clonagem interativa.
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Modal de Acesso Restrito (Login) */}
      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;
