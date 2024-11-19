'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useInventory } from '@/hooks/use-inventory';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const { inventory, isLoading } = useInventory();

  if (isLoading) {
    return <div className="p-8">Loading inventory...</div>;
  }

  const filteredInventory = inventory?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <Button>Add Product</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.quantity > 10 ? 'success' :
                      item.quantity > 0 ? 'warning' :
                      'destructive'
                    }
                  >
                    {item.quantity > 10 ? 'In Stock' :
                     item.quantity > 0 ? 'Low Stock' :
                     'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Update Stock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}