import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { register } from "../utils/auth";

function RegisterModal({ isOpen, onClose, onLogin, onRegister }) {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInput = (event) => {
    setIsValid(event.currentTarget.checkValidity());
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    register(name, email, password)
      .then((user) => {
        onRegister(user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      onInput={handleInput}
      footer={
        <div className="modal__switch-area">
          <span className="modal__switch-text">or</span>

          <button
            className="modal__switch-button"
            type="button"
            onClick={onLogin}
          >
            Sign in
          </button>
        </div>
      }
    >
      <label className="modal__label" htmlFor="register-email">
        Email
      </label>

      <input
        className="modal__input"
        id="register-email"
        type="email"
        name="email"
        placeholder="Enter email"
        required
      />

      <label className="modal__label" htmlFor="register-password">
        Password
      </label>

      <input
        className="modal__input"
        id="register-password"
        type="password"
        name="password"
        placeholder="Enter password"
        minLength={8}
        required
      />

      <label className="modal__label" htmlFor="register-name">
        Name
      </label>

      <input
        className="modal__input"
        id="register-name"
        type="text"
        name="name"
        placeholder="Enter your name"
        required
      />

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
