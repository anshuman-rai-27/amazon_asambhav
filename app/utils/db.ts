import { CreateTableCommand, DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as dotenv from "dotenv";
dotenv.config();

export const client = new DynamoDBClient({
    region: 'ap-south-1'
});

export const checkTableExists = async(name: string) => {
    try {
        const command = new DescribeTableCommand({ TableName: name });
        client.send(command);
        console.log("Table already exists");
    } catch (err) {
        if(name === 'User'){
            await createUserTable();
        }
        console.log("User table created");
    }
}

const createUserTable = async () => {
    const command = new CreateTableCommand({
      TableName: "User",
      AttributeDefinitions: [
        {
          AttributeName: "email",
          AttributeType: "S",
        },
        {
          AttributeName: "name",
          AttributeType: "S",
        },
        {
          AttributeName: "number",
          AttributeType: "N",
        },
        {
          AttributeName: "shopify_account_name",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "email",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    });
  
    const response = await client.send(command);
    console.log(response);
    return response;
};