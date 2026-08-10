
import { NavLink } from "react-router-dom";
import "../blocks/Navigation.css";

function Navigation({ isLoggedIn, currentUser, onSignIn, onLogout }) {
  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link">
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink to="/saved-news" className="navigation__link">
            Saved articles
          </NavLink>

          <span className="navigation__username">{currentUser.name}</span>

          <button
            className="navigation__logout"
            type="button"
            onClick={onLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <button
          className="navigation__sign-in"
          type="button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;