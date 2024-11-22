import { authenticatedUser } from "@/app/utils/amplify-server-utils";
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const response = NextResponse.next(); // Initialize a response object

  try {
    // Retrieve authenticated user using both request and response
    const user = await authenticatedUser({ request, response });

    // If no authenticated user is found, return an error
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

    // Set a secure, encrypted cookie with the sellerId
    response.cookies.set("sellerId", sellerId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json(
      { success: true, sellerId },
      { status: 201 }
    );
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
