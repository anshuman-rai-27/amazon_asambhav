import { client } from '../utils/db';
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const docClient = DynamoDBDocumentClient.from(client);

export async function createUser(formData){
    try {
        const command = new PutCommand({
            TableName: "User",
            Item: {
                email: formData.email,
            },
        });
    
        const response = await docClient.send(command);
        console.log(response);
    } catch (error) {
        console.log('Unable create user entry: ', error);
    }
}