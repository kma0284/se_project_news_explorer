import { useEffect } from "react";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  footer,
  isValid,
  onInput,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <button
        className="modal__close"
        type="button"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      <div className="modal__content">
        <form className="modal__form" onSubmit={onSubmit} onInput={onInput}>
          <h2 className="modal__title">{title}</h2>

          {children}

          <button className="modal__submit" type="submit" disabled={!isValid}>
            {buttonText}
          </button>

          {footer}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
