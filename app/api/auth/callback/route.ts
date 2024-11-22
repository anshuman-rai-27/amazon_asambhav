import Shopify from "@/lib/shopify";
import { ApiRequest, NextApiResponse } from "@/@types";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const GET = async (req:Request, res: NextApiResponse) => {
  try {
    const callback = await Shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    
    const { session } = callback;
    
    console.log(session,"session");

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
    const baseURL = process.env.HOST || 'http://localhost:3000';
    const sellerId = await fetch(`http://${baseURL}/api/sellerId`, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    const updatesession = await prisma.session.update({
      where: {
        sellerId: String(sellerId),
      },
      data: {
        accessToken: session.accessToken, // Replace with the actual new token value
      },
    });
    console.log(updatesession);
    

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




