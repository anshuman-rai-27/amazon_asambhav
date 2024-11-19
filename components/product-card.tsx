'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Inventory } from '@/lib/amazon-mcf';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Inventory;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={product.url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
          <Badge variant={product.quantity > 0 ? 'secondary' : 'destructive'}>
            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={product.quantity === 0}>
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>
                SKU: {product.sku}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">₹{product.price.toFixed(2)}</p>
                <p className="text-gray-500">
                  {product.quantity > 0 
                    ? `${product.quantity} units available`
                    : 'Currently out of stock'}
                </p>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                Add to Cart
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}