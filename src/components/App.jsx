import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import SavedNews from "./SavedNews.jsx";
import { getNews } from "../utils/newsApi";
import { getCurrentUser, logout } from "../utils/auth";
import "../blocks/App.css";

function App() {
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(null);

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCurrentUser());

  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(3);

  const [savedArticles, setSavedArticles] = useState(() => {
    const user = getCurrentUser();

    if (!user) {
      return [];
    }

    const saved = localStorage.getItem(`savedArticles_${user.email}`);

    return saved ? JSON.parse(saved) : [];
  });

  const handleSignIn = () => {
    setActiveModal("login");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleRegisterUser = () => {
    setActiveModal("register-success");
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setActiveModal(null);

    const saved = localStorage.getItem(`savedArticles_${user.email}`);

    setSavedArticles(saved ? JSON.parse(saved) : []);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSearch = (query) => {
    setSearchKeyword(query);
    setIsLoading(true);
    setHasSearched(true);
    setError(false);
    setVisibleArticles(3);

    getNews(query)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    if (!currentUser) {
      return;
    }

    const articleWithKeyword = {
      ...article,
      keywords: searchKeyword
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    };

    setSavedArticles((prev) => {
      const updated = [...prev, articleWithKeyword];

      localStorage.setItem(
        `savedArticles_${currentUser.email}`,
        JSON.stringify(updated),
      );

      return updated;
    });
  };

  const handleDeleteArticle = (article) => {
    if (!currentUser) {
      return;
    }

    setSavedArticles((prev) => {
      const updated = prev.filter(
        (savedArticle) => savedArticle.url !== article.url,
      );

      localStorage.setItem(
        `savedArticles_${currentUser.email}`,
        JSON.stringify(updated),
      );

      return updated;
    });
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onLogout={handleLogout}
        onSearch={handleSearch}
        onRegister={handleRegister}
        isSavedNews={location.pathname === "/saved-news"}
        isModalOpen={activeModal !== null}
        onCloseModal={handleCloseModal}
      />

      <div className="app__content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                articles={articles}
                visibleArticles={visibleArticles}
                setVisibleArticles={setVisibleArticles}
                isLoading={isLoading}
                hasSearched={hasSearched}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
                error={error}
                isLoggedIn={isLoggedIn}
                onSignIn={handleSignIn}
              />
            }
          />

          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
                onSignIn={handleSignIn}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
        </Routes>
      </div>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onRegister={handleRegisterUser}
        onLogin={handleSignIn}
      />

      <RegistrationSuccessModal
        isOpen={activeModal === "register-success"}
        onClose={handleCloseModal}
        onLogin={handleSignIn}
      />
    </div>
  );
}

export default App;
