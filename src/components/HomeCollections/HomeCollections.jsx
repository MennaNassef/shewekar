import { Link } from "react-router-dom";
import collections from "../../data/collections";
import CollectionGrid from "../CollectionGrid/CollectionGrid";

function HomeCollections() {
  const featuredCollections = collections.slice(0, 4);

  return (
    <section className="home-collections">
      <div className="section-header">
        <p>Discover</p>

        <h2>Our Collections</h2>
      </div>

      <CollectionGrid collections={featuredCollections} />

      <div className="section-button">
        <Link to="/collections">
          View All Collections
        </Link>
      </div>
    </section>
  );
}

export default HomeCollections;