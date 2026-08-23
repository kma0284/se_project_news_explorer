import "../blocks/NoResults.css";
import notFoundIcon from "../assets/notfound.svg";

function NoResults() {
  return (
    <section className="no-results">
      <img
        className="no-results__icon"
        src={notFoundIcon}
        alt="not found icon"
      />

      <h2 className="no-results__title">Nothing found</h2>

      <p className="no-results__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NoResults;
