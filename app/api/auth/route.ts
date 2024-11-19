
import Shopify from "@/lib/shopify";
import { ApiRequest, NextApiResponse } from "@/@types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: any,res: NextResponse ) => {
    try{

    // const shop = req.query.shop
    const  shope  = process.env.SHOP || "default-shop.myshopify.com";
    // const {shop} = request.query;
    // if (typeof shop !== 'string' || !shop) {
    //   throw new Error('Invalid shop parameter');
    // }
    // const shope = Shopify.utils.sanitizeShop(shop, true) || 'default-shop.myshopify.com';

    console.log('auth');

    return await Shopify.auth.begin({
              shop: shope,
              callbackPath: '/api/auth/callback',
              isOnline: false,
              rawRequest: request,
            }
            );


} catch (error) {
  console.log(error);
  return NextResponse.json(
    {
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "Integration with Shopify failed",
    //   details: error,
      path: "/api/integrations/shopify",
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  );
}
}