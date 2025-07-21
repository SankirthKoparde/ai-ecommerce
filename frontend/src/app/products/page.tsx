'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link'; // <-- 1. IMPORT LINK

type Product = { id: number; name: string; price: number; imageUrl: string; description: string; };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-xl mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-xl mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          // 2. WRAP THE CARD IN THE LINK COMPONENT
          <Link href={`/products/${product.id}`} key={String(product.id)}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}