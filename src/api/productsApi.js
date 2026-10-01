const API_BASE_URL = "https://shewekar.com";


export const getProductByHandle = async (
  handle
) => {

  const response = await fetch(
    `${API_BASE_URL}/products/${handle}.js`
  );


  if (!response.ok) {

    throw new Error(
      `Failed to fetch product: ${response.status}`
    );

  }


  const product =
    await response.json();


  return {

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
        product.price || 0
      ),

    available:
      product.available,

    image:
      product.featured_image ||
      product.images?.[0] ||
      "",

    images:
      product.images || [],

    variants:
      product.variants || [],

    tags:
      Array.isArray(product.tags)
        ? product.tags
        : [],

    type:
      product.type || "",

    product_type:
      product.type || "",

    createdAt:
      product.created_at,

    updatedAt:
      product.updated_at,

  };

};


export const getAllProducts =
  async () => {

    const response = await fetch(
      `${API_BASE_URL}/products.json?limit=250`
    );


    if (!response.ok) {

      throw new Error(
        `Failed to fetch products: ${response.status}`
      );

    }


    const data =
      await response.json();


    return (
      data.products || []
    ).map((product) => ({

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
          0
        ),

      available:
        product.variants?.[0]?.available ??
        true,

      image:
        product.images?.[0]?.src ||
        product.featured_image ||
        "",

      images:
        product.images?.map(
          (image) =>
            image.src
        ) || [],

      variants:
        product.variants || [],

      tags:
        Array.isArray(product.tags)
          ? product.tags
          : [],

      type:
        product.type || "",

      product_type:
        product.type || "",

      createdAt:
        product.created_at,

      updatedAt:
        product.updated_at,

    }));

  };