
import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <main className="contact-page">

      {/* =====================================================
          CONTACT TITLE
      ===================================================== */}

      <section className="contact-title-section">
        <div className="contact-title-container">
          <h1>Contact Us</h1>
        </div>
      </section>


      {/* =====================================================
          IMAGE
      ===================================================== */}

      <section className="contact-image-section">
        <div className="contact-image-wrapper">
          <img
            src="https://shewekar.com/cdn/shop/files/About_Us.jpg?v=1720352008&width=2560"
            alt="Shewekar"
          />
        </div>
      </section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <section className="contact-info-section">
        <div className="contact-info-container">

          {/* PHONE */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.2 3.5H5.5C4.4 3.5 3.5 4.4 3.5 5.5C3.5 13.78 10.22 20.5 18.5 20.5C19.6 20.5 20.5 19.6 20.5 18.5V16.8C20.5 16.35 20.23 15.95 19.81 15.76L16.99 14.49C16.59 14.31 16.12 14.39 15.81 14.7L14.63 15.88C12.58 14.86 10.89 13.17 9.87 11.12L11.05 9.94C11.36 9.63 11.44 9.16 11.26 8.76L9.99 5.94C9.8 5.52 9.4 5.25 8.95 5.25H7.2V3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="contact-info-content">

              <h3>Phone</h3>

              <div className="contact-info-text">

                <p>
                  <strong>Gallery:</strong>{" "}
                  <a href="tel:+201553627522">
                    +2 0155 362 7522
                  </a>
                </p>

                <p>
                  <strong>Design Office:</strong>{" "}
                  <a href="tel:+201280005991">
                    + 2 0128 0005 991
                  </a>
                </p>

              </div>

            </div>

          </div>


          {/* EMAIL */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.99959 9.29995H20.9996M6.59959 13.4999H9.59959M4.80005 5.1001H19.1997C20.5251 5.1001 21.5996 6.17377 21.5997 7.49923L21.5999 16.5011C21.6 17.8266 20.5255 18.9001 19.2 18.9001L4.80029 18.8999C3.47484 18.8999 2.40035 17.8254 2.40031 16.5L2.40005 7.50016C2.40002 6.17465 3.47454 5.1001 4.80005 5.1001Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="contact-info-content">

              <h3>Email</h3>

              <div className="contact-info-text">

                <p>
                  <strong>Gallery:</strong>{" "}
                  <a href="mailto:ecommerce@shewekar.com">
                    ecommerce@shewekar.com
                  </a>
                </p>

                <p>
                  <strong>Design Office:</strong>{" "}
                  <a href="mailto:info@shewekar.com">
                    info@shewekar.com
                  </a>
                </p>

              </div>

            </div>

          </div>


          {/* ADDRESS */}

          <div className="contact-info-card">

            <div className="contact-info-icon">

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

            <div className="contact-info-content">

              <h3>Address</h3>

              <div className="contact-info-text">

                <p>
                  <strong>Gallery:</strong>{" "}
                  4 Omaret Elyamani Street, left entrance,
                  3rd floor, apt 11.
                </p>

                <p>
                  <strong>Design Office:</strong>{" "}
                  4 Omaret Elyamani Stree, left entrance,
                  4th floor, apt 16.
                </p>

              </div>

              <a
                href="https://maps.app.goo.gl/3WzHjqg65yJVzFp99"
                className="contact-location-button"
                target="_blank"
                rel="noreferrer"
              >
                Location
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section className="contact-form-section">

        <div className="contact-form-container">

          <div className="contact-form-wrapper">

            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="contact-field">

                <label htmlFor="contact-name">
                  Name
                </label>

                <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                  />

              </div>


              <div className="contact-field">

                <label htmlFor="contact-email">
                  E-mail
                </label>

                <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="Enter your e-mail"
                    autoComplete="email"
                    required
                  />

              </div>


              <div className="contact-field">

                <label htmlFor="contact-phone">
                  Phone Number
                </label>

                <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />

              </div>


              <div className="contact-field contact-message-field">

                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message"
                    required
                  />

              </div>


              <div className="contact-form-bottom">

                <button
                  type="submit"
                  className="contact-send-button"
                >
                  Send
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

