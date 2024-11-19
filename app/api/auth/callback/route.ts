import Shopify from "@/lib/shopify";
import { ApiRequest, NextApiResponse } from "@/@types";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';


export const GET = async (req:Request, res: NextApiResponse) => {
  try {
    const callback = await Shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    
    const { session } = callback;
    
    console.log(session);

    if (!session || !session.accessToken) {
      throw new Error("Could not validate auth callback");
    }

    const cookies = req.headers.get('cookie');
    
    if (!cookies) {
      return new NextResponse("Missing cookies", { status: 403 });
    }

    const parsedCookies = Object.fromEntries(
      cookies.split('; ').map(c => {
        const [key, value] = c.split('=');
        return [key, decodeURIComponent(value)];
      })
    );

    // const SellerId = parsedCookies.sellerId;

    // if (!SellerId) {
    //   return new NextResponse("Seller ID is required", { status: 406 });
    // }

    const result = await Shopify.webhooks.register({
      session: session,
    });

    // console.log('webhook');
    console.log(result);

    const response = NextResponse.redirect(`https://${process.env.HOST}`, { status: 302 });
    console.log(response,"response");
    return response;
  } catch (error) {
    console.error(error);
    return new Response('Error during authentication', { status: 500 });
  }
}




