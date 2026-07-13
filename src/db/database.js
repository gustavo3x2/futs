import { initialArticles, initialRankings, initialZoeiras } from '../data/mockData';

// Chaves do localStorage
const KEYS = {
  ARTICLES: 'outroesporte_articles',
  RANKINGS: 'outroesporte_rankings',
  ZOEIRAS: 'outroesporte_zoeiras',
  SESSION: 'outroesporte_admin_session'
};

// Inicializa o banco de dados local caso esteja vazio
export const initializeDB = () => {
  if (!localStorage.getItem(KEYS.ARTICLES)) {
    localStorage.setItem(KEYS.ARTICLES, JSON.stringify(initialArticles));
  }
  if (!localStorage.getItem(KEYS.RANKINGS)) {
    localStorage.setItem(KEYS.RANKINGS, JSON.stringify(initialRankings));
  }
  if (!localStorage.getItem(KEYS.ZOEIRAS)) {
    localStorage.setItem(KEYS.ZOEIRAS, JSON.stringify(initialZoeiras));
  }
};

// Executa a inicialização de imediato ao importar
initializeDB();

// --- CRUD DE ARTIGOS ---
export const getArticles = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.ARTICLES)) || [];
};

export const saveArticle = (article) => {
  const articles = getArticles();
  if (article.id) {
    // Editar existente
    const index = articles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      articles[index] = { 
        ...articles[index], 
        ...article,
        notaCraque: Number(article.notaCraque) || 0,
        humildade: Number(article.humildade) || 0,
        date: article.date || new Date().toLocaleDateString('pt-BR')
      };
    }
  } else {
    // Criar novo
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      notaCraque: Number(article.notaCraque) || 0,
      humildade: Number(article.humildade) || 0,
      votosCraque: 0,
      votosBagre: 0
    };
    articles.unshift(newArticle); // Insere no topo
  }
  localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));
  return articles;
};

export const voteArticleReaction = (id, type) => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === id);
  if (index !== -1) {
    if (type === 'craque') {
      articles[index].votosCraque = (articles[index].votosCraque || 0) + 1;
    } else if (type === 'bagre') {
      articles[index].votosBagre = (articles[index].votosBagre || 0) + 1;
    }
    localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));
  }
  return articles;
};

export const deleteArticle = (id) => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  localStorage.setItem(KEYS.ARTICLES, JSON.stringify(filtered));
  return filtered;
};

// --- GERENCIAMENTO DE RANKINGS ---
export const getRankings = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.RANKINGS)) || initialRankings;
};

export const updateRankings = (rankings) => {
  localStorage.setItem(KEYS.RANKINGS, JSON.stringify(rankings));
  return rankings;
};

// --- MURAL DE ZOEIRAS ---
export const getZoeiras = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.ZOEIRAS)) || [];
};

export const addZoeira = (text, author = '@anonimo') => {
  const zoeiras = getZoeiras();
  const newZoeira = {
    id: 'z_' + Date.now(),
    text,
    author: author.startsWith('@') ? author : `@${author}`,
    likes: 0
  };
  zoeiras.unshift(newZoeira);
  localStorage.setItem(KEYS.ZOEIRAS, JSON.stringify(zoeiras));
  return zoeiras;
};

export const likeZoeira = (id) => {
  const zoeiras = getZoeiras();
  const index = zoeiras.findIndex(z => z.id === id);
  if (index !== -1) {
    zoeiras[index].likes += 1;
    localStorage.setItem(KEYS.ZOEIRAS, JSON.stringify(zoeiras));
  }
  return zoeiras;
};

export const deleteZoeira = (id) => {
  const zoeiras = getZoeiras();
  const filtered = zoeiras.filter(z => z.id !== id);
  localStorage.setItem(KEYS.ZOEIRAS, JSON.stringify(filtered));
  return filtered;
};

// --- AUTENTICAÇÃO SIMULADA ---
export const loginAdmin = (username, password) => {
  // Credenciais padrão: admin / admin123
  if (username === 'admin' && password === 'admin123') {
    const session = {
      isLoggedIn: true,
      username: 'Administrador',
      authKey: 'session_key_' + Date.now()
    };
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    return { success: true, session };
  }
  return { success: false, error: 'Usuário ou senha inválidos' };
};

export const getAdminSession = () => {
  const session = localStorage.getItem(KEYS.SESSION);
  return session ? JSON.parse(session) : null;
};

export const logoutAdmin = () => {
  localStorage.removeItem(KEYS.SESSION);
  return null;
};
