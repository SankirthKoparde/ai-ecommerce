'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // <-- Hook to get URL params

type Product = { id: number; name: string; price: number; imageUrl: string; description: string; };

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Don't fetch if the id isn't available yet

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found or failed to fetch');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run the effect if the id changes

  if (loading) return <p className="text-center text-xl mt-10">Loading product...</p>;
  if (error) return <p className="text-center text-xl mt-10 text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center text-xl mt-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-extrabold text-green-600 mb-6">${product.price.toFixed(2)}</p>
          <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}