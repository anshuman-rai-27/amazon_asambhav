// import { Shopify } from '@shopify/shopify-api';
import dotenv from 'dotenv';

// import '@shopify/shopify-api/adapters/node';
import "@shopify/shopify-api/adapters/web-api";
import { shopifyApi, LATEST_API_VERSION, DeliveryMethod } from '@shopify/shopify-api';
// import webhooks from "@/webhooks"

dotenv.config();

// Shopify.Context.initialize({
const Shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ['write_customers','read_customers', 'write_orders', 'write_products', 'read_orders', 'read_products', 'read_draft_orders'],
  hostName: process.env.HOST,
  isEmbeddedApp: false,
  apiVersion: LATEST_API_VERSION,
  // API_KEY: process.env.SHOPIFY_API_KEY,
  // API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  // SCOPES: process.env.SCOPES.split(','),
  // HOST_NAME: process.env.HOST.replace(/https?:\/\//, ''),
  // IS_EMBEDDED_APP: false,
  // API_VERSION: '2023-01', 
});
// Shopify.webhooks.addHandlers(webhooks)
//APP_UNINSTALLED
const handleWebhookRequest = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  const sessionId = Shopify.session.getOfflineId(shop);

  // Fetch the session from storage and process the webhook event
  // (You'll need to implement this logic)
};

// CUSTOMERS_DELETE
// case "CUSTOMERS_DATA_REQUEST":
// case "CUSTOMERS_REDACT":
//   case "SHOP_REDACT":

Shopify.webhooks.addHandlers({
  APP_UNINSTALLED: [
    {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: '/api/webhooks',
      callback: handleWebhookRequest
    },
  ],
});

export default Shopify;
