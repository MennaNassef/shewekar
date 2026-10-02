const API_BASE_URL = "https://shewekar.com";

// ========================================
// Normalize Product
// ========================================

const normalizeProduct = (product) => ({
  id: product.id,

  title: product.title,

  handle: product.handle,

  vendor:
    product.vendor ||
    "Shewekar",

  description:
    product.body_html ||
    "",

  body_html:
    product.body_html ||
    "",

  price:
    Number(
      product.variants?.[0]?.price ||
      product.price ||
      0
    ),

  available:
    product.variants?.[0]?.available ??
    product.available ??
    true,

  image:
    product.images?.[0]?.src ||
    product.featured_image ||
    "",

  images:
    product.images?.map(
      (image) => image.src
    ) || [],

  variants:
    product.variants || [],

  tags:
    Array.isArray(product.tags)
      ? product.tags
      : [],

  type:
    product.type ||
    "",

  product_type:
    product.type ||
    "",

  createdAt:
    product.created_at,

  updatedAt:
    product.updated_at,
});

// ========================================
// Get Product By Handle
// ========================================

export const getProductByHandle = async (handle) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products.json?limit=250`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status}`
      );
    }

    const data = await response.json();

    const products = data.products || [];

    console.log("Requested handle:", handle);

    const product = products.find(
      (item) =>
        String(item.handle)
          .trim()
          .toLowerCase() ===
        String(handle)
          .trim()
          .toLowerCase()
    );

    console.log("Found product:", product);

    if (!product) {
      throw new Error(
        `Product not found: ${handle}`
      );
    }

    return normalizeProduct(product);

  } catch (error) {
    console.error(
      "getProductByHandle error:",
      error
    );

    throw error;
  }
};

// ========================================
// Get All Products
// ========================================

export const getAllProducts = async () => {
  const response = await fetch(
    `${API_BASE_URL}/products.json?limit=250`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`
    );
  }

  const data = await response.json();

  return (data.products || []).map(
    normalizeProduct
  );
};