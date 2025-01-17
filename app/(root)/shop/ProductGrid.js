"use client"
import { useState } from 'react';

import { Dialog } from '@radix-ui/react-dialog';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';


const products = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 299.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    isSaved: false,
    description: "Crafted from premium leather, this timeless jacket features a classic design with modern details. Perfect for any casual or semi-formal occasion.",
    specs: {
      material: "100% Genuine Leather",
      fit: "Regular Fit",
      care: ["Professional leather clean only", "Store in a cool, dry place", "Use leather conditioner regularly"],
      dimensions: "Standard sizing"
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 2,
    name: "Vintage Denim Jeans",
    price: 89.99,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    isSaved: true,
    description: "Classic vintage-style denim with a comfortable stretch fit. Features a timeless five-pocket design and straight leg cut.",
    specs: {
      material: "98% Cotton, 2% Elastane",
      fit: "Straight Leg",
      care: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    },
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 3,
    name: "Cotton Sweater",
    price: 59.99,
    rating: 4.2,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    isSaved: false,
    description: "Soft and comfortable cotton sweater perfect for layering. Features a classic crew neck and ribbed cuffs.",
    specs: {
      material: "100% Cotton",
      fit: "Regular Fit",
      care: ["Machine wash cold", "Lay flat to dry", "Do not iron decoration"],
    },
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {products.map((product) => (
          <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductDetail {...selectedProduct} />}
      </Dialog>
    </>
  );
}