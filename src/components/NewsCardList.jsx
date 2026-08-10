import NewsCard from "./NewsCard";
import "../blocks/NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  onSignIn,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  isSavedPage,
}) {
  return (
    <div className="news-card-list">
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          article={article}
          isLoggedIn={isLoggedIn}
          onSignIn={onSignIn}
          savedArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
          isSavedPage={isSavedPage}
        />
      ))}
    </div>
  );
}

export default NewsCardList;
