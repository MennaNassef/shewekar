import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src="/shewekar-logo-white.webp"
              alt="Shewekar"
            />
          </Link>

          <p>
            Explore <strong>Shewekar’s interior design blog</strong> for
            expert tips, <strong>home styling inspiration</strong>, and
            behind-the-scenes insights from our creative studio in Cairo.
            Discover the intersection of <strong>Egyptian heritage</strong>
            and contemporary design, updated regularly to keep you inspired
            and informed.
          </p>
        </div>


        {/* Quick Links */}
<div className="footer-column footer-quick-links">

  <button
    type="button"
    className="footer-quick-title"
    onClick={() => setQuickLinksOpen(!quickLinksOpen)}
    aria-expanded={quickLinksOpen}
  >
    <span>Quick links</span>

    <span
      className={`footer-arrow ${
        quickLinksOpen ? "is-open" : ""
      }`}
      aria-hidden="true"
    ></span>
  </button>

  <div
    className={`footer-quick-content ${
      quickLinksOpen ? "is-open" : ""
    }`}
  >
    <Link to="/">Home</Link>

    <Link to="/interior-design">
      Interior Design
    </Link>

    <Link to="/">
      Collections
    </Link>

    <Link to="/gallery">
      Gallery
    </Link>

    <Link to="/about">
      About us
    </Link>

    <Link to="/news">
      News
    </Link>

    <Link to="/login">
      Orders
    </Link>

    <Link to="/contact">
      Contact us
    </Link>
  </div>

</div>

        {/* Reach Out */}
        <div className="footer-column footer-contact">
          <h3>Reach Out</h3>

          <p>
            4 Omaret Elyamani Street,
            <br />
            left entrance, 3rd floor,
            <br />
            apt 11.
          </p>

          <a href="tel:+201553627522">
            +201553627522
          </a>
        </div>


        {/* Social */}
        <div className="footer-column footer-social">
          <h3>Join Our Social Media</h3>

          <div className="footer-social-links">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

            <a href="#" aria-label="Pinterest">
              Pinterest
            </a>
          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()}{" "}
          <Link to="/">Shewekar</Link>.
          {" "}Powered by{" "}
          <a
            href="https://www.shopify.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shopify
          </a>
        </p>

        <div className="footer-policies">
          <Link to="/policies/privacy-policy">
            Privacy policy
          </Link>

          <Link to="/policies/terms-of-service">
            Terms of service
          </Link>

          <Link to="/policies/refund-policy">
            Refund policy
          </Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;