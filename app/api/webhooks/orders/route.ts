import Shopify from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import { extractOrderDetails, sendCustomerEmail } from "@/app/utils/mailer";

// Specify runtime for the route
export const runtime = "nodejs";

// POST handler for Shopify webhook
export async function POST(req: NextRequest) {
  console.log("Incoming Webhook");

  try {
    // Parse the raw body from the request
    const rawBody = await req.text();

    // Validate the webhook
    const { valid } = await Shopify.webhooks.validate({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });
    // console.log(valid,"orders");
    console.log(rawBody);
    // await axios.post("https://ed14-2401-4900-3dcd-a146-f8-a162-9ac3-e622.ngrok-free.app/api/fucwebhook/order", rawBody);
    // await axios.post("https://ed14-2401-4900-3dcd-a146-f8-a162-9ac3-e622.ngrok-free.app/api/fucwebhook/lowreturn", rawBody);


    extractOrderDetails(rawBody);

    if (!valid) {
      console.error("Invalid webhook call");
      return NextResponse.json(
        { error: "Invalid webhook call" },
        { status: 400 }
      );
    }
    // console.log(valid);

    // Process the webhook
    await Shopify.webhooks.process({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });

    console.log("Webhook processed successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`Failed to process webhook: ${error}`);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
