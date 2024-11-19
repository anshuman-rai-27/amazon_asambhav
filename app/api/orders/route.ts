// import prismadb from "@/lib/prismadb";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function POST(
//     req: Request,
// ) {
//     try {
//         const body = await req.json();
//         // console.log(body);
//         const { order_id } = body;
//         // console.log(order_id);

//         const cookies = req.headers.get('cookie');
//         if (!cookies) {
//             return new NextResponse("Missing cookies", { status: 403 });
//         }

//         const parsedCookies = Object.fromEntries(
//             cookies.split('; ').map(c => {
//                 const [key, value] = c.split('=');
//                 return [key, decodeURIComponent(value)];
//             })
//         );
//         const SellerId = parsedCookies.sellerId;
//         // const Username = parsedCookies.username;

//         if (!SellerId) {
//             return new NextResponse("Seller ID is required", { status: 406 });
//         }
//         const session = await prismadb.session.findFirst({
//             where: {
//                 sellerId: SellerId
//             }
//         });

//         const shopifyToken = session?.accessToken;
//         const shop = session?.shop;

//         if (!shopifyToken) {
//             return new NextResponse(JSON.stringify({ error: "Missing or invalid token" }), { status: 403 });
//         }

//         const result = await fetch(`https://${shop}/admin/api/2024-04/orders/${order_id}.json`, {
//             method: 'GET',
//             headers: {
//                 'X-Shopify-Access-Token': shopifyToken
//             }
//         })
//         const resu = await result.json();
//         console.log(resu);
//         interface LineItem {
//             product_id: number; // Adjust the type if it's not a string
//             variant_title: string;
//             // Add other properties if necessary
//         }
        
//         const lineItems: LineItem[] = resu.order.line_items;
//         const productIds = lineItems.map((item: LineItem) => item.product_id);
//         console.log(productIds);
//         // const sizes = lineItems.map((item: LineItem) => {item.product_id:item.variant_title});
//         const sizes = lineItems.reduce((acc: { [key: string]: string }, item: LineItem) => {
//             acc[item.product_id] = item.variant_title;
//             return acc;
//         }, {});
        
        
//         const products = await prismadb.product_id.findMany({
//             where: {
//                 Shopify_Product_id: {
//                     in: productIds
//                 }
//             },
//             include:{
//                 SellerProduct:{
//                     include:{
//                         Manu:{
//                             include:{
//                                 Mock:true
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         console.log(products);
//         const productsWithStrings = products.map(product => ({
//             ...product,
//             Shopify_Product_id: product.Shopify_Product_id.toString(),
//         }));
//         const product_details = productsWithStrings.map(pro=>({
//             name: pro.SellerProduct.name,
//             color: pro.SellerProduct.Color,
//             price: pro.SellerProduct.price,
//             url: pro.SellerProduct.Manu.Mock[0].url,
//             size: sizes[pro.Shopify_Product_id]
//         }))
        
//         console.log(productsWithStrings);

//         const response = {
//             order: resu.order,
//             products: product_details
//         };

//         return NextResponse.json(response);
//     } catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }

import { NextResponse } from 'next/server';
import { mockOrders } from '@/lib/amazon-mcf';

export async function GET() {
  // In production, fetch from Amazon MCF API
  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production, submit to Amazon MCF API
  return NextResponse.json({ message: 'Order created successfully' });
}