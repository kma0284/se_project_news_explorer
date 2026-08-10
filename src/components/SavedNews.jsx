import NewsCardList from "./NewsCardList";
import "../blocks/SavedNews.css";

function SavedNews({
  savedArticles,
  isLoggedIn,
  onSignIn,
  onSaveArticle,
  onDeleteArticle,
}) {
  const user = JSON.parse(localStorage.getItem("mockUser"));

  const userName = user?.name || "User";
  const articleCount = savedArticles.length;

  const keywords = [
    ...new Set(
      savedArticles
        .flatMap((article) => {
          if (Array.isArray(article.keywords)) {
            return article.keywords;
          }
          if (article.keyword) {
            return article.keyword
              .split(",")
              .map((keyword) => keyword.trim())
              .filter(Boolean);
          }
          return [];
        })
        .filter(Boolean),
    ),
  ];
  const firstKeywords = keywords.slice(0, 3);
  const otherCount = keywords.length - firstKeywords.length;
  const displayedKeywords =
    otherCount > 0
      ? `${firstKeywords.join(", ")} and ${otherCount} other`
      : firstKeywords.join(", ");
  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__title">
          {userName}, you have {articleCount} saved{" "}
          {articleCount === 1 ? "article" : "articles"}
        </h1>

        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-list">
              {displayedKeywords}
            </span>
          </p>
        )}
      </section>

      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSignIn={onSignIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
          isSavedPage={true}
        />
      ) : (
        <p className="saved-news__empty">You haven't saved any articles yet.</p>
      )}
    </main>
  );
}

export default SavedNews;
