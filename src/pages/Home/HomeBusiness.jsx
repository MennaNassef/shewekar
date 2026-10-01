import React from "react";
import "./HomeBusiness.css";

export default function HomeBusiness() {
  return (
    <section className="home-business">

      <div className="home-business-image">
        <img
          src="https://shewekar.com/cdn/shop/files/Beanos_GEM_34-scaled_d003222a-e19a-4845-a4d3-98dffc5283bb.jpg?v=1716478057&width=1066"
          alt="SHEWEKAR Interiors"
        />

        <div className="home-business-overlay"></div>

        <div className="home-business-content desktop-content">
          <span>SHEWEKAR Interiors</span>

          <h2>
            Elevate Your Business with SHEWEKAR's Signature Designs
          </h2>

          <p>
            Experience the perfect fusion of elegance and functionality
            with Shewekar's bespoke interior solutions
          </p>

          <a
            href="https://shewekar.com/pages/contact"
            className="home-business-button"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="home-business-mobile-content">
        <span>SHEWEKAR Interiors</span>

        <h2>
          Elevate Your Business with SHEWEKAR's Signature Designs
        </h2>

        <p>
          Experience the perfect fusion of elegance and functionality
          with Shewekar's bespoke interior solutions
        </p>

        <a
          href="https://shewekar.com/pages/contact"
          className="home-business-button"
        >
          Contact Us
        </a>
      </div>

    </section>
  );
}