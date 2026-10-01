import { Link } from "react-router-dom";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <p>About Shewekar</p>

        <h2>
          Furniture With
          <br />
          Character
        </h2>

        <p>
          We believe furniture should be more than functional.
          It should add personality, warmth, and character to
          the spaces we live in.
        </p>

        <Link to="/about">
          Discover Our Story
        </Link>
      </div>
    </section>
  );
}

export default AboutSection;