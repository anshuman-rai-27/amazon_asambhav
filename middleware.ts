// import { type NextRequest, NextResponse } from "next/server";
// import { authenticatedUser } from "@/app/utils/amplify-server-utils";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const user = await authenticatedUser({ request, response });
//   // console.log(user);

//   const userJson = JSON.stringify(user);
//   (await cookies()).set("onestop_vyapar_user", userJson);

//   const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
//   const isOnAdminArea =
//     request.nextUrl.pathname.startsWith("/dashboard/admins");

//   if (isOnDashboard) {
//     // console.log("user");
//     if (!user) {
//       return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//     }

//     if (isOnAdminArea && !user.isAdmin) {
//       // console.log("not admin");
//       return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//     }
//   }

//   if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   }

//   return response;
// }

// export const config = {
//   /*
//    * Match all request paths except for the ones starting with
//    */
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "@/app/utils/amplify-server-utils";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });
  console.log(user);

  // const userJson = JSON.stringify(user);
  // (await cookies()).set("onestop_vyapar_user", userJson);
  if (user) {
    const userJson = JSON.stringify(user); // Convert user object to JSON

    // Set the cookie with user information
    response.cookies.set("onestop_vyapar_user", userJson, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
      path: "/",
      sameSite: "strict",
    });
  }

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea =
    request.nextUrl.pathname.startsWith("/dashboard/admins");

  if (isOnDashboard) {
    console.log("user");
    if (!user){
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (isOnAdminArea && !user.isAdmin){
      console.log("not admin");
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return response;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};