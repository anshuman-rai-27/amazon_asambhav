"use server"

import { client } from '../utils/db';
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const docClient = DynamoDBDocumentClient.from(client);

export async function createUser(formData){
    console.log("formData: ", formData);
    try {
        const command = new PutCommand({
            TableName: "User",
            Item: {
                id: formData.id,
                email: formData.email,
                name: formData.name,
                // number: '0000000000',
                // shopify_account_name: 'aaaaaa'
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