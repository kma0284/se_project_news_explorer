import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { register } from "../utils/auth";

function RegisterModal({ isOpen, onClose, onLogin, onRegister }) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
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

    if (input.name === "password" && input.value && input.value.length < 8) {
      error = "Password must be at least 8 characters";
    }

    if (input.name === "name" && !input.value.trim()) {
      error = "Please enter your name";
    }

    setErrors((prev) => ({
      ...prev,
      [input.name]: error,
      general: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    setErrors({
      email: "",
      password: "",
      name: "",
      general: "",
    });

    register(name, email, password)
      .then((user) => {
        onRegister(user);
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
      {errors.email && <p className="modal__error">{errors.email}</p>}
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
      {errors.password && <p className="modal__error">{errors.password}</p>}
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
      {errors.name && <p className="modal__error">{errors.name}</p>}
      {errors.general && <p className="modal__error">{errors.general}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
