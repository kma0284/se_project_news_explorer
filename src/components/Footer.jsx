import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../blocks/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © 2026 News Explorer. Powered by News API
        </p>

        <nav className="footer__navigation">
          <NavLink className="footer__link" to="/">
            Home
          </NavLink>

          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>

          <a
            className="footer__icon-link"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            className="footer__icon-link"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
