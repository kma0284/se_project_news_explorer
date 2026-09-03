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
    <ul className="news-card-list">
      {articles.map((article) => (
        <li className="news-card-list__item" key={article.url}>
          <NewsCard
            article={article}
            isLoggedIn={isLoggedIn}
            onSignIn={onSignIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
            isSavedPage={isSavedPage}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
