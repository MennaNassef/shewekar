import React, { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">

        <h2>Subscribe to our Newsletter</h2>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Subscribe
          </button>
        </form>

        <p>
          Receive the latest updates and newest collections!
        </p>

      </div>
    </section>
  );
};

export default Newsletter;