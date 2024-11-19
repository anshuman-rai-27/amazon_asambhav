'use client';

import { useState } from 'react';
import { useInventory } from '@/hooks/use-inventory';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const { inventory, isLoading } = useInventory();

  if (isLoading) {
    return <div className="p-8">Loading products...</div>;
  }

  const filteredProducts = inventory?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Marketplace</h2>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}