'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Option {
    name: string;
    values: string[];
}

interface Variant {
    id?: number;
    title: string;
    price: number;
    sku?: string;
    inventoryQty: number;
}

interface Image {
    id?: number;
    url: string;
}

interface Product {
    id?: number;
    title: string;
    bodyHtml: string;
    vendor?: string;
    productType?: string;
    tags: string[];
    sellerId: string;
    options: Option[];
    variants: Variant[];
    images: Image[];
    shopifyId: string;
}

export default function InventoryPage() {
    const [search, setSearch] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>('/api/productCreation');
                console.log(res);
                setProducts(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const pushShopify = async (product: Product) => {
        // console.log(product.options.map((option: any) => ({
        //     "name": option.name,
        //     "values": option.values,
        // })));
        try {
            const response = await axios.get('/api/sellerId');
            const { sellerId }: { sellerId: string } = response.data;
            const res = await axios.post('/api/shopify/pushProduct', { product,sellerId });
            console.log('Product pushed successfully:', res.data);
        } catch (error) {
            console.error('Error pushing product to Shopify:', error);
        }
    };


    const handleMoreDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeDialog = () => {
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.variants.some((variant) =>
            variant.sku?.toLowerCase().includes(search.toLowerCase())
        )
    );

    if (isLoading) {
        return <div className="p-8">Loading inventory...</div>;
    }

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
                            <TableHead>Title</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Shopify</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>
                                    {product.variants.map((variant) => variant.sku).join(', ')}
                                </TableCell>
                                <TableCell>
                                    {product.variants.reduce(
                                        (total, variant) => total + variant.inventoryQty,
                                        0
                                    )}
                                </TableCell>
                                <TableCell>
                                    ₹
                                    {product.variants
                                        .reduce(
                                            (total, variant) => total + variant.price * variant.inventoryQty,
                                            0
                                        )
                                        .toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            product.variants.some((variant) => variant.inventoryQty > 10)
                                                ? 'default' // Map 'success' to 'default'
                                                : product.variants.some((variant) => variant.inventoryQty > 0)
                                                    ? 'secondary' // Map 'warning' to 'secondary'
                                                    : 'destructive' // No change for 'destructive'
                                        }
                                    >
                                        {product.variants.some((variant) => variant.inventoryQty > 10)
                                            ? 'In Stock'
                                            : product.variants.some((variant) => variant.inventoryQty > 0)
                                                ? 'Low Stock'
                                                : 'Out of Stock'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {product.shopifyId ? <Badge className='bg-green-700'>On Shopify</Badge> : <Button onClick={() => pushShopify(product)}>Push to shopify</Button>}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleMoreDetails(product)}
                                    >
                                        More Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedProduct && (
                <Dialog open={!!selectedProduct} onOpenChange={closeDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                            <DialogDescription>
                                Detailed information about the selected product.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p><strong>Product ID:</strong> {selectedProduct.id}</p>
                            <p><strong>Title:</strong> {selectedProduct.title}</p>
                            <p><strong>Options:</strong> {selectedProduct.options.map((o) => o.name).join(', ')}</p>
                            <p><strong>Variants:</strong></p>
                            <ul>
                                {selectedProduct.variants.map((variant) => (
                                    <li key={variant.id}>
                                        <strong>{variant.title}</strong> - ₹{variant.price.toFixed(2)} - {variant.inventoryQty} units
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Images:</strong></p>
                            <div className="flex gap-2">
                                {selectedProduct.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.url}
                                        alt="Product Image"
                                        className="w-24 h-24 object-cover border"
                                    />
                                ))}
                            </div>
                        </div>
                        <Button onClick={closeDialog} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
