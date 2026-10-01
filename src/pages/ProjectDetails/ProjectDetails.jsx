import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projects from "../../data/projects.json";

import "./ProjectDetails.css";

function ProjectDetails() {
  const { slug } = useParams();

  const project = projects[slug];

  const [selectedImage, setSelectedImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  /* =========================
     PROJECT IMAGES
  ========================= */

  const galleryImages = project?.images || [];

  /* =========================
     HERO IMAGE
  ========================= */

  const heroImage =
    project?.heroImage ||
    project?.images?.find((image) => image.isHero)?.url ||
    project?.images?.[0]?.url;

  /* =========================
     SCROLL TO TOP
  ========================= */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* =========================
     OPEN IMAGE
  ========================= */

  const openImage = (index) => {
    setSelectedImage(index);
    setIsZoomed(false);
    setIsPlaying(false);
  };

  /* =========================
     CLOSE IMAGE
  ========================= */

  const closeImage = () => {
    setSelectedImage(null);
    setIsPlaying(false);
    setIsZoomed(false);
  };

  /* =========================
     NEXT IMAGE
  ========================= */

  const nextImage = () => {
    setSelectedImage((current) => {
      if (current === null || galleryImages.length === 0) {
        return null;
      }

      return (current + 1) % galleryImages.length;
    });
  };

  /* =========================
     PREVIOUS IMAGE
  ========================= */

  const previousImage = () => {
    setSelectedImage((current) => {
      if (current === null || galleryImages.length === 0) {
        return null;
      }

      return (
        (current - 1 + galleryImages.length) %
        galleryImages.length
      );
    });
  };

  /* =========================
     ZOOM
  ========================= */

  const toggleZoom = (event) => {
    event.stopPropagation();

    setIsZoomed((prev) => !prev);
  };

  /* =========================
     PLAY / PAUSE
  ========================= */

  const togglePlay = (event) => {
    event.stopPropagation();

    setIsPlaying((prev) => !prev);
  };

  /* =========================
     SLIDESHOW
  ========================= */

  useEffect(() => {
    if (
      !isPlaying ||
      selectedImage === null ||
      galleryImages.length === 0
    ) {
      return;
    }

    const interval = setInterval(() => {
      setSelectedImage((current) => {
        if (current === null) {
          return null;
        }

        return (current + 1) % galleryImages.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [
    isPlaying,
    selectedImage,
    galleryImages.length,
  ]);

  /* =========================
     KEYBOARD CONTROLS
  ========================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImage === null) {
        return;
      }

      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedImage,
    galleryImages.length,
  ]);

  /* =========================
     PREVENT BODY SCROLL
  ========================= */

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  /* =========================
     PROJECT NOT FOUND
  ========================= */

  if (!project) {
    return (
      <main className="project-details-page">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="project-details-page">

      {/* =========================
          INTRO
      ========================= */}

      <section className="project-intro">

        {/* =========================
            MAIN IMAGE
        ========================= */}

        <div
          className="project-main-image"
          onClick={() => openImage(0)}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt={
                project.title ||
                "Shewekar Project"
              }
            />
          )}
        </div>

        {/* =========================
            PROJECT INFO
        ========================= */}

        <div className="project-info">

          <p className="project-label">
            {project.location}
          </p>

          <h1>
            {project.title}
          </h1>

          {project.client && (
            <p>
              client : {project.client}
            </p>
          )}

          <br />

          {project.projectDate && (
            <p>
              Project Date : {project.projectDate}
            </p>
          )}

          <br />

          {project.description && (
            <p>
              {project.description}
            </p>
          )}

        </div>

      </section>

      {/* =========================
          GALLERY
      ========================= */}

      {galleryImages.length > 0 && (
        <section className="project-gallery">

          {galleryImages.map((image, index) => (
            <div
              className="project-gallery-item"
              key={
                image.id ||
                image.url ||
                `${project.title}-${index}`
              }
              onClick={() => openImage(index)}
            >
              <img
                src={image.url}
                alt={
                  image.alt ||
                  project.title
                }
                loading="lazy"
              />
            </div>
          ))}

        </section>
      )}

      {/* =========================
          LIGHTBOX
      ========================= */}

      {selectedImage !== null && (
        <div
          className="project-lightbox"
          onClick={closeImage}
        >

          {/* =========================
              TOP BAR
          ========================= */}

          <div
            className="lightbox-top"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* COUNTER */}

            <div className="lightbox-counter">
              {selectedImage + 1} /{" "}
              {galleryImages.length}
            </div>

            {/* ACTIONS */}

            <div className="lightbox-actions">

              {/* ZOOM */}

              <button
                className="lightbox-action"
                onClick={toggleZoom}
                aria-label="Zoom"
              >
                ⌕
              </button>

              {/* PLAY */}

              <button
                className="lightbox-action play-button"
                onClick={togglePlay}
                aria-label="Play slideshow"
              >
                {isPlaying ? "Ⅱ" : "▶"}
              </button>

              {/* CLOSE */}

              <button
                className="lightbox-action close-button"
                onClick={closeImage}
                aria-label="Close"
              >
                ×
              </button>

            </div>

          </div>

          {/* =========================
              PREVIOUS
          ========================= */}

          <button
            className="lightbox-arrow lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Previous image"
          >
            ←
          </button>

          {/* =========================
              IMAGE
          ========================= */}

          <div
            className={`lightbox-image-wrapper ${
              isZoomed ? "zoomed" : ""
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={
                galleryImages[selectedImage]?.url
              }
              alt={
                galleryImages[selectedImage]?.alt ||
                project.title
              }
            />
          </div>

          {/* =========================
              NEXT
          ========================= */}

          <button
            className="lightbox-arrow lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            →
          </button>

        </div>
      )}

    </main>
  );
}

export default ProjectDetails;