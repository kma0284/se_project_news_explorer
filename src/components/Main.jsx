import NewsCardList from "./NewsCardList";
import Preloader from "./Preloader";
import NoResults from "./NoResults";
import ErrorMessage from "./ErrorMessage";
import About from "./About";
import "../blocks/Main.css";
import "../blocks/fonts.css";

function Main({
  articles,
  visibleArticles,
  setVisibleArticles,
  isLoading,
  hasSearched,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  error,
  isLoggedIn,
  onSignIn,
}) {
  return (
    <main className="main">
      {isLoading && <Preloader />}

      {!isLoading && error && <ErrorMessage />}

      {!isLoading && !error && hasSearched && articles.length > 0 && (
        <section className="main__results">
          <h2 className="main__results-title">Search results</h2>

          <NewsCardList
            articles={articles.slice(0, visibleArticles)}
            isLoggedIn={isLoggedIn}
            onSignIn={onSignIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
          />

          {visibleArticles < articles.length && (
            <button
              className="main__show-more"
              type="button"
              onClick={() => setVisibleArticles(visibleArticles + 3)}
            >
              Show more
            </button>
          )}
        </section>
      )}

      {!isLoading && !error && hasSearched && articles.length === 0 && (
        <NoResults />
      )}

      <About />
    </main>
  );
}

export default Main;
