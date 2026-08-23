import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { login } from "../utils/auth";
import "../blocks/LoginModal.css";

function LoginModal({ isOpen, onClose, onRegister, onLogin }) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [isValid, setIsValid] = useState(false);

  const handleInput = (event) => {
    const input = event.target;

    setIsValid(input.form.checkValidity());

    let error = "";

    if (input.name === "email" && input.value && !input.checkValidity()) {
      error = "Invalid email";
    }

    if (input.name === "password" && !input.value) {
      error = "Please enter your password";
    }

    setErrors((prev) => ({
      ...prev,
      [input.name]: error,
      general: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    setErrors({
      email: "",
      password: "",
      general: "",
    });

    login(email, password)
      .then((user) => {
        localStorage.setItem("mockUser", JSON.stringify(user));
        onLogin(user);
      })
      .catch((err) => {
        setErrors((prev) => ({
          ...prev,
          general: err.message,
        }));
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

      {errors.email && <p className="modal__error">{errors.email}</p>}

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

      {errors.password && <p className="modal__error">{errors.password}</p>}

      {errors.general && <p className="modal__error">{errors.general}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
