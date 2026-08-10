
import "../blocks/ErrorMessage.css";

function ErrorMessage() {
  return (
    <section className="error-message">
      <h2 className="error-message__title">
        Something went wrong
      </h2>

      <p className="error-message__text">
        Sorry, something went wrong during the request. Please try again.
      </p>
    </section>
  );
}

export default ErrorMessage;
