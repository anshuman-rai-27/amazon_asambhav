// import prismadb from "@/lib/prismadb";
// import { auth,currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(
//     req: Request,) {
//     try {
        
//         const { userId } = auth();
//         const body = await req.json();

//         const { username } = body;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }
//         if (!username) {
//             return new NextResponse("Name is required", { status: 400 });
//         }

//         const seller = await prismadb.seller.create({
//             data: {
//                 name: username,
//                 userId,
//             }
//         });

//         // return NextResponse.json(seller);

//         const response = NextResponse.json(seller);

//         // Set cookies individually
//         response.headers.append('Set-Cookie', `userId=${userId}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `username=${username}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `sellerId=${seller.id}; Path=/; HttpOnly`);

//         return response;

//     } catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }



// export async function GET(
//     req: Request,res:Response) {
//     try {
//         // console.log('ids');
//         // const user = await currentUser();
//         const { userId } = auth();
//         // console.log('ids');
//         // console.log(userId);
//         // console.log(user);


//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const seller = await prismadb.seller.findFirst({
//             where: {
//                 userId: userId
//             }
//         });

//         // console.log('sellerid',seller)

//         if (!seller) {
//             return new NextResponse("Seller not found", { status: 404 });
//         }

//         // return NextResponse.json(seller);
//         const response = NextResponse.json(seller);

//         // Set cookies individually
//         response.headers.append('Set-Cookie', `userId=${userId}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `username=${seller.name}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `sellerId=${seller.id}; Path=/; HttpOnly`);

//         // const cookie = response.cookies;
// //   console.log(cookie)

//         return response;

//     } catch (error) {
//         console.log('[username_GET]', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }


