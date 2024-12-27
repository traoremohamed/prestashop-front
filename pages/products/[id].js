import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProductDetails() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data || null);
      } catch (error) {
        console.error("Erreur lors du chargement des détails du produit :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div>
      <h1>Détails du Produit</h1>
      <p>ID : {product.product.id}</p>
      <p>Nom : {product.product.name}</p>
      <p>Description : {product.product.description}</p>
      {/* Ajoute d'autres détails pertinents */}
    </div>
  );
}
