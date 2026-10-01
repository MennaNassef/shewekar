import { Link } from "react-router-dom";

function InteriorSection() {
  return (
    <section className="interior-section">
      <div className="interior-image">
        <img
          src="/interior/interior-home.webp"
          alt="Interior Design"
        />
      </div>

      <div className="interior-content">
        <p>Interior Design</p>

        <h2>
          Spaces Designed
          <br />
          Around You
        </h2>

        <p>
          We create thoughtful interiors that combine
          functionality, character, and timeless design.
        </p>

        <Link to="/interior-design">
          Discover Interior Design
        </Link>
      </div>
    </section>
  );
}

export default InteriorSection;