"use server"

import { client } from '../utils/db';
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { encryptData } from '../utils/kms-encrypter';


const docClient = DynamoDBDocumentClient.from(client);


export async function createUser(formData){
    console.log("formData: ", formData);
    
    // Using KMS
    // const encryptedEmail = await encryptData(formData.email)
    // const encryptedname = await encryptData(formData.name)

    // Not using KMS
    const encryptedEmail = formData.email;
    const encryptedname = formData.name;

    try {
        const command = new PutCommand({
            TableName: "User",
            Item: {
                id: formData.id,
                email: encryptedEmail,
                name: encryptedname,
            },
        });
    
        const response = await docClient.send(command);
        console.log(response);
        return { success: true, response: response };
    } catch (error) {
        console.log('Unable create user entry: ', error);
        return { success: false };
    }
}