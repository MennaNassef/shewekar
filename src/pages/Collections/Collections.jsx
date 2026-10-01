import { useEffect } from "react";
import collections from "../../data/collections";
import CollectionGrid from "../../components/CollectionGrid/CollectionGrid";
import "./Collections.css";

function Collections() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section className="collections-page">
      <div className="collections-header">
        <p>Explore Our World</p>

        <h1>Collections</h1>

        <p>
          Discover collections created to bring unique
          character and timeless elegance to every space.
        </p>
      </div>

      <CollectionGrid collections={collections} />
    </section>
  );
}

export default Collections;