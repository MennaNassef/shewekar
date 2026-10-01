import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Frontend-only simulation
    localStorage.setItem("shewekarEmail", email);

    setMessage("Your email has been submitted.");
  };

  return (
    <main className="login-page">
      {/* Logo */}
      <Link to="/" className="login-logo">
        <img
          src="https://cdn.shopify.com/s/files/1/0591/4542/0886/files/Shewekar-Gunmetal-logo-400-wide_x320.png?v=1716364889"
          alt="Shewekar"
        />
      </Link>

      {/* Content */}
      <section className="login-container">
        <h1>Sign in</h1>

        <p className="login-subtitle">
          Sign in or create an account
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <button type="button" className="continue-button">
            <span className="continue-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M21.8 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.67Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 22c2.76 0 5.07-.91 6.76-2.46l-3.3-2.56c-.91.61-2.07.97-3.46.97-2.66 0-4.91-1.8-5.72-4.22H2.87v2.64A10.2 10.2 0 0 0 12 22Z"
                  fill="#34A853"
                />
                <path
                  d="M6.28 13.73A6.13 6.13 0 0 1 5.96 12c0-.6.11-1.19.32-1.73V7.63H2.87A10.1 10.1 0 0 0 1.8 12c0 1.63.39 3.17 1.07 4.37l3.41-2.64Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 6.05c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.06 3.06 14.76 2 12 2a10.2 10.2 0 0 0-9.13 5.63l3.41 2.64C7.09 7.85 9.34 6.05 12 6.05Z"
                  fill="#EA4335"
                />
              </svg>
            </span>

            <span>Continue with Google</span>
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="email-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          <button type="submit" className="email-button">
            Continue
          </button>

          {message && (
            <p className="login-message">{message}</p>
          )}

          <label className="newsletter-option">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />

            <span>
              Email me with news and offers
            </span>
          </label>
        </form>

        <p className="terms-text">
          By continuing, you agree to our{" "}
          <Link to="/policies/terms-of-service">
            Terms of service
          </Link>
        </p>

        <Link
          to="/policies/privacy-policy"
          className="privacy-link"
        >
          Privacy policy
        </Link>
      </section>
    </main>
  );
}

export default Login;