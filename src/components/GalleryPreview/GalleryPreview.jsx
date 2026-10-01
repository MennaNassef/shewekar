import { Link } from "react-router-dom";

function GalleryPreview() {
  const images = [
    "/gallery/gallery-1.webp",
    "/gallery/gallery-2.webp",
    "/gallery/gallery-3.webp",
    "/gallery/gallery-4.webp",
  ];

  return (
    <section className="gallery-preview">
      <div className="section-header">
        <p>Our Work</p>

        <h2>Gallery</h2>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-item" key={image}>
            <img
              src={image}
              alt={`Interior project ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="section-button">
        <Link to="/gallery">
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}

export default GalleryPreview;