import { NavLink } from "react-router-dom";
import { useState } from "react";
import headerImage from "../assets/header.svg";
import SearchForm from "./SearchForm";
import "../blocks/Header.css";
import logoutIcon from "../assets/logout.svg";

function Header({
  isLoggedIn,
  currentUser,
  onSignIn,
  onLogout,
  onSearch,
  isSavedNews,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={isSavedNews ? "header header_saved" : "header"}>
      <img className="header__image" src={headerImage} alt="header image" />

      <div className="header__content">
        <div className="header__top">
          <a className="header__logo" href="/">
            News Explorer
          </a>

          {/* Mobile menu button */}
          <button
            className="header__menu-button"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>

          <nav
            className={`header__navigation ${
              isMenuOpen ? "header__navigation_open" : ""
            }`}
          >
            <NavLink
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link_active" : ""}`
              }
              to="/"
              onClick={closeMenu}
            >
              Home
            </NavLink>

            {isLoggedIn && (
              <NavLink
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link_active" : ""}`
                }
                to="/saved-news"
                onClick={closeMenu}
              >
                Saved articles
              </NavLink>
            )}

            {isLoggedIn ? (
              <button
                className="header__user"
                type="button"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
              >
                <span>{currentUser?.name}</span>

                <img
                  className="header__logout-icon"
                  src={logoutIcon}
                  alt="Log out"
                />
              </button>
            ) : (
              <>
                <button
                  className="header__sign-in"
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onSignIn();
                  }}
                >
                  Sign in
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
