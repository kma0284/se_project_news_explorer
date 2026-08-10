import { NavLink } from "react-router-dom";
import headerImage from "../assets/header.svg";
import SearchForm from "./SearchForm";
import "../blocks/Header.css";

function Header({
  isLoggedIn,
  currentUser,
  onSignIn,
  onLogout,
  onSearch,
  onRegister,
  isSavedNews,
}) {
  return (
    <header className={isSavedNews ? "header header_saved" : "header"}>
      <img className="header__image" src={headerImage} alt="header image" />
      <div className="header__content">
        <div className="header__top">
          <a className="header__logo" href="/">
            News Explorer
          </a>

          <nav className="header__navigation">
            <NavLink
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link_active" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link_active" : ""}`
                }
                to="/saved-news"
              >
                Saved articles
              </NavLink>
            )}

            {isLoggedIn ? (
              <button className="header__user" type="button" onClick={onLogout}>
                {currentUser?.name}
              </button>
            ) : (
              <>
                <button
                  className="header__sign-in"
                  type="button"
                  onClick={onSignIn}
                >
                  Sign in
                </button>

                <button
                  className="header__sign-up"
                  type="button"
                  onClick={onRegister}
                >
                  Sign up
                </button>
              </>
            )}
          </nav>
        </div>

        {!isSavedNews && (
          <div className="header__hero">
            <h1 className="header__title">What's going on in the world?</h1>

            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>

            <SearchForm onSearch={onSearch} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
