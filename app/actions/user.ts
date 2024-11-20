"use server";

import { PrismaClient } from "@prisma/client";
import { authenticatedUser } from '@/app/utils/amplify-server-utils';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function createUser(formData: { id?: string; email: string; name: string }) {
  console.log("formData: ", formData);

  try {
    // Create the user in the database
    const userId = String(formData.id);
    const user = await prisma.seller.create({
      data: {
        userId: userId, // Optional, Prisma will auto-generate if not provided
        email: formData.email,
        name: formData.name,
      },
    });

    console.log("User created: ", user);
    return { success: true, response: user };
  } catch (error) {
    console.error("Unable to create user entry: ", error);
    return { success: false, error };
  } finally {
    // Disconnect the Prisma Client after use
    await prisma.$disconnect();
  }
}