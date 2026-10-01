import { Link } from "react-router-dom";

function CollectionCard({ collection }) {
  return (
    <article className="collection-card">
      <Link to={`/collections/${collection.id}`}>
        <div className="collection-image">
          <img
            src={collection.image}
            alt={collection.name}
          />

          <div className="collection-overlay">
            <h2>{collection.name}</h2>

            <span>Explore Collection</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CollectionCard;