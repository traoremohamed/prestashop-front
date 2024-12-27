
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des Produits</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name || `Produit ${product.id}`}
              style={{ width: "100%", height: "auto" }}
            />
            <h3>{product.name || `Produit ${product.id}`}</h3>
            <p>Prix : {product.price} €</p>
            <a href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
              Voir les détails
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

