// src/components/ProductCard.tsx

// Define the shape of a single product object for type safety
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

// Define the props that our component will accept
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}