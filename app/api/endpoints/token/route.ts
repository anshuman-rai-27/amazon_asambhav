// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const sellerId = req.cookies.get("SellerId")?.value;

//   if (!sellerId) {
//     return NextResponse.json(
//       { error: "SellerId cookie is missing" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch the seller by SellerId
//     const seller = await prisma.seller.findUnique({
//       where: {
//         id: sellerId,
//       },
//       select: {
//         token: true,
//       },
//     });

//     if (!seller) {
//       return NextResponse.json(
//         { error: "Seller not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ token: seller.token }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching seller token:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
