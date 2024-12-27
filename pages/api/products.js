export default async function handler(req, res) {
  const webserviceUrl = "https://stagev2.instantbeaute.shop/api/products";
  const webserviceKey = "H6YA27UKZJAJG3WU3VJQQLUNBFNJWRRT";

  try {
    const response = await fetch(
      `${webserviceUrl}?ws_key=${webserviceKey}&output_format=JSON`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }

    const data = await response.json();

    // Préparer les informations utiles pour chaque produit
    const products = await Promise.all(
      data.products.map(async (product) => {
        const detailResponse = await fetch(
          `${webserviceUrl}/${product.id}?ws_key=${webserviceKey}&output_format=JSON`
        );
        const productDetail = await detailResponse.json();

        // Extraire les informations utiles
        return {
          id: productDetail.product.id,
          name: productDetail.product.name,
          price: productDetail.product.price,
          image: `https://stagev2.instantbeaute.shop/api/images/products/${productDetail.product.id}/${productDetail.product.id_default_image}`,
        };
      })
    );

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
