import CollectionCard from "../CollectionCard/CollectionCard";

function CollectionGrid({ collections }) {
  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
        />
      ))}
    </div>
  );
}

export default CollectionGrid;