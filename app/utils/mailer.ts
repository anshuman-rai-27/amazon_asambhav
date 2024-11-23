import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";

// Initialize the Pinpoint client
const client = new PinpointClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  }
});

export async function sendLowstockMail(emailTo: string, subject: string, seller_name: string, product_name: string, product_quantity: number) {
  const applicationId = process.env.PINPOINT_PROJECT_ID;
  const params = {
    ApplicationId: applicationId,
    MessageRequest: {
      Addresses: {
        [emailTo]: {
            ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: "thetechnova023@gmail.com",
          SimpleEmail: {
            Subject: { Data: subject },
            HtmlPart: {
              Data: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            width: 100%;
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #0077cc;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                            color: #333333;
                            line-height: 1.6;
                        }
                        .content h2 {
                            margin-top: 0;
                            color: #0077cc;
                        }
                        .cta {
                            text-align: center;
                            margin: 20px 0;
                        }
                        .cta a {
                            background-color: #0077cc;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-size: 16px;
                        }
                        .cta a:hover {
                            background-color: #005fa3;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            color: #666666;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <!-- Header -->
                        <div class="header">
                            <h1>Low Stock Alert</h1>
                        </div>
                        <!-- Content -->
                        <div class="content">
                            <h2>Hi${seller_name},</h2>
                            <p>We wanted to let you know that one of your sellable items is running low on stock:</p>
                            <p><strong>Item:</strong> ${product_name}</p>
                            <p><strong>Remaining Stock:</strong> ${product_quantity}</p>
                            <p>Don't miss out! Secure your item before it's gone.</p>
                        </div>
                        
                        <!-- Footer -->
                        <div class="footer">
                            <p>You are receiving this email because you subscribed to Onestop Vyapaar</p>
                            <p>If you no longer wish to receive these emails, you can <a href="[Unsubscribe Link]">unsubscribe here</a>.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            },
            TextPart: { Data: "" },
          },
        },
      },
    },
  };

  try {
    const command = new SendMessagesCommand(params);
    const response = await client.send(command);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
