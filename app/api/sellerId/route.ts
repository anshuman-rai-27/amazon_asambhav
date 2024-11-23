import { authenticatedUser } from "@/app/utils/amplify-server-utils";
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const response = NextResponse.next(); // Initialize a response object

  try {
    // Retrieve authenticated user using both request and response
    // const user = await authenticatedUser({ request, response });

    // // If no authenticated user is found, return an error
    

    
    // console.log('enter');
    const userCookie = request.cookies.get("onestop_vyapar_user");
    // console.log(userCookie);
    // If no user cookie is found, return an error
    // let userauth = '';
    if (!userCookie) {
      // const userauth = await authenticatedUser({ request, response });
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Parse the user JSON from the cookie
    const user = JSON.parse(userCookie.value);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }
    const email = String(user?.signInDetails?.loginId);

    const seller = await prisma.seller.findUnique({
      where: {
        email: email,
      },
    });

    if (!seller) {
      return NextResponse.json(
        { success: false, error: "Seller not found" },
        { status: 404 }
      );
    }

    const sellerId = seller.id;
    const cookieOptions = {
      httpOnly: true, // Ensure the cookie is only accessible by the server
      secure: process.env.NODE_ENV === 'production', // Ensure the cookie is secure in production
      sameSite: false, // Allow cookie to be sent in cross-site requests (Lax is a good compromise)
      path: '/', // Accessible throughout the entire domain
    };

    const cookieString = serialize('sellerId', sellerId, cookieOptions);

    // Set a secure, encrypted cookie with the sellerId
    // response.cookies.set("sellerId", sellerId, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   sameSite: "lax",
    // });
    if(cookieString){
      response.headers.set('Set-Cookie', cookieString);
      console.log(response.headers);
    }
    
    return NextResponse.json(
      { success: true, sellerId },
      { status: 201 }
    );
    

    return response;
  } catch (error) {
    console.error("Unable to process the request: ", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma Client after use
    await prisma.$disconnect();
  }
}


