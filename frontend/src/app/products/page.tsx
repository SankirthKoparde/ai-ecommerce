// src/app/products/page.tsx
'use client'; // This is important! It tells Next.js this is a client-side component

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

// Define the shape of the data we expect from our API
type Product = {
  id: number; // The database gives us a number ID
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function fetches data from our FastAPI backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty array ensures this runs only once when the page loads

  if (loading) return <p className="text-center text-xl mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-xl mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          // We need to convert the number ID to a string for the key prop
          <ProductCard key={String(product.id)} product={product} />
        ))}
      </div>
    </div>
  );
}