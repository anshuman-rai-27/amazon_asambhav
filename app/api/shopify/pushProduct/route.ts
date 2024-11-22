import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Shopify from '@shopify/shopify-api'; // Ensure Shopify API library is installed
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sellerId, product } = req.body;

    if (!sellerId || !product) {
        return res.status(400).json({ error: 'Missing sellerId or product data' });
    }

    try {
        // Fetch the Shopify session
        const session = await prisma.session.findUnique({
            where: { sellerId },
        });

        if (!session) {
            return res.status(400).json({ error: 'No Shopify session found for the seller' });
        }

        // Create Shopify REST client
        // const shopifyClient = new Shopify.Clients.Rest(session.shop, session.accessToken);

        // // Push the product to Shopify
        // const shopifyProduct = await shopifyClient.post({
        //   path: 'products',
        //   data: {
        //     product: {
        //       title: product.title,
        //       body_html: product.bodyHtml,
        //       vendor: product.vendor,
        //       product_type: product.productType,
        //       tags: product.tags,
        //       variants: product.variants.map((variant: any) => ({
        //         title: variant.title,
        //         price: variant.price.toString(),
        //         sku: variant.sku,
        //         inventory_quantity: variant.inventoryQty,
        //       })),
        //       options: product.options.map((option: any) => ({
        //         name: option.name,
        //         values: option.values.split(', '), // Convert string back to an array
        //       })),
        //       images: product.images.map((image: any) => ({
        //         src: image.url,
        //       })),
        //     },
        //   },
        //   type: Shopify.DataType.JSON,
        // });
        const body = {
            product: {
                title: product.title,
                body_html: product.bodyHtml,
                vendor: product.vendor,
                product_type: product.productType,
                tags: product.tags,
                variants: product.variants.map((variant: any) => ({
                    title: variant.title,
                    price: variant.price,
                    sku: variant.sku,
                    inventory_quantity: variant.inventoryQty
                })),
                options: product.options.map((option: any) => ({
                    name: option.name,
                    values: option.values.split(", ") // Convert string back to an array
                })),
                images: product.images.map((image: any) => ({
                    src: image.url
                }))
            }
        };
        const result = await fetch(`https://${session.shop}/admin/api/2024-04/products.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token':
                    session.accessToken
            },
            body: JSON.stringify(body)
        })
        console.log(result);

        // Update the Shopify ID in the database
        const responseData = await result.json();

        // Update the Prisma database
        if (!result.ok || !responseData?.product?.id) {
            // Handle Shopify API errors
            console.error("Failed to push product:", responseData);
            return res.status(result.status).json({
                error: "Failed to push product to Shopify",
                details: responseData?.errors || "Unknown error",
            });
        }

        // Success response
        res.status(200).json({
            message: "Product pushed to Shopify successfully",
            shopifyId: responseData.product.id,
        });
    } catch (error) {
        // Handle unexpected errors and narrow the type
        if (error instanceof Error) {
            console.error("Error pushing product to Shopify:", error);
            res.status(500).json({
                error: "Failed to push product to Shopify",
                details: error.message,
            });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({
                error: "Failed to push product to Shopify",
                details: "An unknown error occurred.",
            });
        }
    }
}
