// "use server"

// import { client } from '../utils/db';
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// // import { encryptData } from '../utils/kms-encrypter';


// const docClient = DynamoDBDocumentClient.from(client);

// export async function createUser(formData : any){
//     console.log("formData: ", formData);
    
//     // const encryptedEmail = await encryptData(formData.email)
//     // const encryptedname = await encryptData(formData.name)

//     try {
//         const command = new PutCommand({
//             TableName: "User",
//             Item: {
//                 id: formData.id,
//                 email: formData.email,
//                 name: formData.name,
//             },
//         });
    
//         const response = await docClient.send(command);
//         console.log(response);
//         return { success: true, response: response };
//     } catch (error) {
//         console.log('Unable create user entry: ', error);
//         return { success: false };
//     }
// }
"use server";

import { PrismaClient } from "@prisma/client";

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
