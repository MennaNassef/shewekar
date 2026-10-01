const API_BASE_URL = "https://shewekar.com";

// ========================================
// Main Collections
// ========================================

const collections = {
  "celestial-collection": {
    title: "Celestial Collection",

    subtitle:
      "We need to strive for more refined standards and elevate our senses to loftier heights",

    description:
      "As we leave two years of pandemic behind us, returning to normal may not be sufficient. We need to strive for more refined standards and elevate our senses to loftier heights. That’s why we dubbed our new luxury collection, Celestial. Headlining this timeless collection is our Signature-Shewkar-Straw; an all but lost traditional art custom that we brought to furniture design and manufacturing, after 18 months of extensive research and development. Join us for a journey through the heavens that will stimulate your senses and spark your imagination.",
  },

  "layers-of-life": {
    title: "Layers of Life",

    subtitle: "unfolding infinite layers",

    description:
      "The magic of life is derived from its infinite layers as they unfold one after another; layers of colors, shapes, experiences, relationships, historical events, cultures, leaders, natural elements, inner and outer space… Through contemplating these marvelous layers, our latest collection was born.",
  },

  "celebration-of-life": {
    title: "Celebration of Life",

    subtitle:
      "values once hidden now came to the forefront",

    description:
      "As we tried to waddle through 2021 and another wave of Covid, we felt the need to celebrate life and all its simple pleasures. Values once hidden came to the forefront. Nothing earth-shattering but just simple truths that were in plain eye-sight yet somehow overlooked. This new capsule collection is inspired by these truth as we try to give them form and integrate them into our homes.",
  },

  "nubia-collection": {
    title: "Nubia Collection",

    subtitle:
      "Nubia evokes feelings of nostalgia for a simpler time and place; a whimsical and playful environment were creativity and childlike wonder roam freely.",

    description:
      "The word Nubia evokes feelings of nostalgia to a simpler time and place. As if time has halted its relentless march forward, preserving its unique stature; its art and architecture, traditions and customs, and most of all its warm, kindhearted people.",
  },
};

// ========================================
// Get Main Collections
// ========================================

export const getCollections = () => {
  return collections;
};

// ========================================
// Get Collection
// ========================================

export const getCollection = (slug) => {
  return collections[slug];
};

// ========================================
// Convert Slug To Title
// ========================================

export const getCollectionTitle = (slug) => {
  if (!slug) {
    return "";
  }

  return slug
    .split("-")
    .map((word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");
};

// ========================================
// Get Collection Products
// ========================================

export const getCollectionProducts = async (slug) => {
  const url =
    `${API_BASE_URL}/collections/${slug}/products.json?limit=250`;

  console.log("Collection URL:", url);

  const response = await fetch(url);

  console.log(
    "Response status:",
    response.status
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`
    );
  }

  const data = await response.json();

  console.log(
    "API response:",
    data
  );

  const products = data.products || [];

  return products.map((product) => ({
    id: product.id,

    title: product.title,

    handle: product.handle,

    vendor:
      product.vendor || "Shewekar",

    price: Number(
      product.variants?.[0]?.price || 0
    ),

    image:
      product.images?.[0]?.src ||
      product.featured_image ||
      "",

    images:
      product.images?.map(
        (image) => image.src
      ) || [],

    tags: Array.isArray(product.tags)
      ? product.tags
      : [],

    type:
      product.type || "",

    createdAt:
      product.created_at,

    updatedAt:
      product.updated_at,
  }));
};