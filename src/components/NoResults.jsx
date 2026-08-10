import "../blocks/NoResults.css";

function NoResults() {
  return (
    <section className="no-results">
      <div className="no-results__icon">🔎</div>

      <h2 className="no-results__title">Nothing found</h2>

      <p className="no-results__text">
        Sorry, nothing matched your search. Try a different keyword.
      </p>
    </section>
  );
}

export default NoResults;
