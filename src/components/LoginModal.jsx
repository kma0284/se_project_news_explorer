import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { login } from "../utils/auth";

function LoginModal({ isOpen, onClose, onRegister, onLogin }) {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInput = (event) => {
    setIsValid(event.currentTarget.checkValidity());
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    setError("");

    login(email, password)
      .then((user) => {
        localStorage.setItem("mockUser", JSON.stringify(user));
        onLogin(user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
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
            onClick={onRegister}
          >
            Sign up
          </button>
        </div>
      }
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>

      <input
        className="modal__input"
        id="login-email"
        type="email"
        name="email"
        placeholder="Enter email"
        required
      />

      <label className="modal__label" htmlFor="login-password">
        Password
      </label>

      <input
        className="modal__input"
        id="login-password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
      />

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
