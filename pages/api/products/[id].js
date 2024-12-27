export default async function handler(req, res) {
    const { id } = req.query;
    const webserviceUrl = `https://stagev2.instantbeaute.shop/api/products/${id}`;
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
        throw new Error("Erreur lors de la récupération des détails du produit");
      }
  
      const data = await response.json();
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  