
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InteriorDesign.css";

const interiorProjects = [
  {
    id: "commercial",
    title: "Commercial Projects",
    image:
      "https://shewekar.com/cdn/shop/files/Beanos_GEM_03-scaled.jpg?v=1716730372&width=2560",
    link: "/commercial",
  },
  {
    id: "residential",
    title: "Residential Projects",
    image:
      "https://shewekar.com/cdn/shop/files/Screenshot_2024-05-30_at_11.47.11_AM.png?v=1717330762&width=2030",
    link: "/residential",
  },
];

function InteriorDesign() {
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <main className="interior-page">

      {/* =========================
          TITLE
      ========================= */}

      <section className="interior-title-section">
        <div className="interior-title-container">
          <h1>Interiors</h1>
        </div>
      </section>


      {/* =========================
          HERO
      ========================= */}

      <section className="interior-hero">
        <img
          src="https://shewekar.com/cdn/shop/files/Turquoise_Flare_03_9602f4b7-8cd7-4504-a1d7-c18a6d2e271f.jpg?v=1720007930&width=1400"
          alt="Shewekar Interior Design"
        />
      </section>


      {/* =========================
          DESCRIPTION
      ========================= */}

      <section className="interior-description">
        <div className="interior-description-container">
          <p>
            Our commercial and commercial interior projects have a distinct
            quality, an effortless eclecticism. We achieve this using a layered
            approach that respects the nature of a space, experiments with
            material and inspirits a room with distinguishable features. With
            over two decades of delivering projects in the Middle East, Egypt
            and Europe, our studio is now made up of more than 25 dedicated and
            passionate designers and architects. We listen to the distinct
            needs of our clients and create spatial experiences, a dialogue
            between their vision and our knowledge. Two-time award-winning
            exceptional design is attained harmoniously by integrating a
            client’s specific styles with our vast knowledge.
          </p>
        </div>
      </section>


      {/* =========================
          PROJECTS
      ========================= */}

      <section className="interior-projects">
        <div className="interior-projects-container">

          <div className="interior-projects-track">

            {interiorProjects.map((project, index) => {
              const isActive = activeProject === index;

              return (
                <article
                  key={project.id}
                  className={`interior-project-card ${
                    isActive ? "is-active" : ""
                  }`}
                  onMouseEnter={() => setActiveProject(index)}
                >
                  <Link
                    to={project.link}
                    className="interior-project-link"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="interior-project-image"
                    />

                    <div className="interior-project-overlay" />

                    <div className="interior-project-content">
                      <span className="interior-project-label">
                        Interior Design
                      </span>

                      <h2>{project.title}</h2>

                      <span className="interior-project-button">
                        View All
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}

          </div>

        </div>
      </section>

    </main>
  );
}

export default InteriorDesign;

