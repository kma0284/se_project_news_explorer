import flagIcon from "../assets/flag.svg";
import flagFilledIcon from "../assets/flag-filled.svg";
import trashIcon from "../assets/trash.svg";
import "../blocks/NewsCard.css";

function NewsCard({
  article,
  isLoggedIn,
  onSignIn,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  isSavedPage,
}) {
  const isSaved = savedArticles.some(
    (savedArticle) => savedArticle.url === article.url,
  );

  const handleSave = () => {
    if (!isLoggedIn) {
      onSignIn();
      return;
    }

    if (isSavedPage) {
      onDeleteArticle(article);
      return;
    }

    if (!isSaved) {
      onSaveArticle(article);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {article.urlToImage && (
          <img
            className="news-card__image"
            src={article.urlToImage}
            alt={article.title}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}

        {isSavedPage && article.keywords?.length > 0 && (
          <span className="news-card__keyword">
            {article.keywords.length <= 3
              ? article.keywords.join(", ")
              : `${article.keywords.slice(0, 3).join(", ")} and ${
                  article.keywords.length - 3
                } other`}
          </span>
        )}

        <button
          className={`news-card__save ${
            isSaved && !isSavedPage ? "news-card__save_saved" : ""
          } ${isSavedPage ? "news-card__save_delete" : ""}`}
          type="button"
          onClick={handleSave}
          title={
            isSavedPage
              ? "Remove from favorites"
              : !isLoggedIn
                ? "Sign in to save articles."
                : "Save article"
          }
        >
          <img
            className="news-card__save-icon"
            src={isSavedPage ? trashIcon : isSaved ? flagFilledIcon : flagIcon}
            alt=""
          />
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h3 className="news-card__title">{article.title}</h3>

        <p className="news-card__description">{article.description}</p>

        <p className="news-card__source">{article.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
