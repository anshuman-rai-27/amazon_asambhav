# Onestop Vyapar - AI-Powered E-commerce Platform

## 🚀 Project Overview
**Onestop Vyapar** is an AI-driven integration hub designed for small and medium-sized businesses (SMBs). It streamlines e-commerce management by integrating Amazon’s Multi-Channel Fulfillment (MCF) services with a custom marketplace for manufacturers. This platform provides:

- Unified inventory and order management.
- AI-powered inventory suggestions.
- Dynamic pricing and oversell prevention.
- Geolocation heatmaps for return rate analysis.
- International fulfillment and PAN India logistics.
- Real-time analytics for business optimization.

---

## 🔧 Technical Stack

### **Frontend**
- **Framework**: Next.js
- **Styling**: Tailwind CSS, Material-UI

### **Backend**
- **Core**: Node.js (Express/NextJS)
- **APIs**: AWS Lambda, AWS API Gateway

### **DevOps and Infrastructure**
- **Containerization**: Docker
- **Orchestration**: AWS ECS, AWS ELB
- **Storage**: AWS DynamoDB, AWS RDS, AWS S3
- **Security**: AWS IAM, AWS KMS, AWS Cognito

### **AI/ML Tools**
- PyCaret
- AWS Personalize
- AWS SageMaker
- CopilotKit
---

## 🎨 Features

1. **Unified Inventory and Order Management**  
   - Real-time visibility across multiple platforms.  
2. **AI-Powered Inventory Suggestions**  
   - Predictive analytics for stock management.  
3. **Dynamic Pricing**  
   - AI-driven pricing adjustments using PyCaret.  
4. **Oversell Prevention**  
   - Real-time alerts powered by AWS Lambda and SNS.  
5. **Geolocation Heatmaps**  
   - Insights into regions with high return rates.  
6. **International Fulfillment**  
   - Simplified global expansion with Amazon APIs.  
7. **Built-in Marketplace**  
   - Connects manufacturers, wholesalers, and dropshippers with sellers.  
8. **DevOps with AWS**  
   - Leverages AWS ECR, ECS, and S3 for streamlined deployment and scaling.  
9. **SSL Certificate**  
   - Secures data transmission with encryption.  
10. **User-Friendly Interface**  
    - AI chatbot for inventory and delivery management.  
11. **Amazon MCF Integration**  
    - Utilizes Amazon’s PAN India logistics network.  
12. **Real-Time Analytics**  
    - AI-driven insights for inventory and pricing optimization.  

---

## Methodology/Architecture Diagram
**[View Diagram](https://drive.google.com/file/d/1ecn-HXdILDlC7_ECxTXjzZRMFG1biRlU/view?usp=sharing)**  
![read drawio](https://github.com/user-attachments/assets/2463668f-1a22-4b35-a1a8-eed1923ae94a)


---

## Demonstration
**Prototype Demo:** [View Demo](https://drive.google.com/drive/folders/1zgua0Z-7xckWaaR21-l1juH-s15EPIFs?usp=sharing)  
**Deployment Link:** [Vyapaar](https://amazon-asambhav.vercel.app/)  
---

## Screenshots
Dashboard
![Screenshot 2024-12-25 162809](https://github.com/user-attachments/assets/b9b59715-e141-4d11-b6a4-801282a9d900)

Marcket Place
![Screenshot 2024-12-25 162741](https://github.com/user-attachments/assets/3689f738-3218-4826-b211-799afd1dbd75)

Developer Plughin
![Screenshot 2024-12-25 162757](https://github.com/user-attachments/assets/0a0e953f-b17c-4536-8bba-66d1f94e6aa5)

Video demo: 

https://drive.google.com/file/d/1SKISc3E0cgdlxfFlkVR7r6hg2TF7ZQWU/view?usp=drive_link

---

## ✅ Getting Started

### Next.js Setup
```bash
# Clone the repository
https://github.com/anshuman-rai-27/amazon_asambhav.git

# Install dependencies
cd amazon_asambhav
npm install

# Run the development server
npm run dev

# Open the application
http://localhost:3000
```

### Docker Setup
```bash
# Build the Docker image
docker build -t vyapaar-app .

# Run the Docker container
docker run -p 3000:3000 vyapaar-app

# Access the application
http://localhost:3000
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following:
```ini
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/dbname
NEXT_PUBLIC_USER_POOL_ID=your-pool-id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your-client-id
KMS_KEY_ID=your-kms-key-id
SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET_KEY=your-shopify-secret-key
SCOPES=['write_customers','read_customers', 'write_orders', 'write_products', 'read_orders', 'read_products', 'read_draft_orders']
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=postgres
S3_BUCKET_NAME=your-s3-bucket-name
PINPOINT_PROJECT_ID=your-pinpoint-project-id
GROQ_API_KEY=your-groq-api-key
```

---


## 🌐 Open Source Disclosure

| **Technology**      | **Version** | **License**         | **Source Link**                                       |
|----------------------|-------------|---------------------|-------------------------------------------------------|
| Tailwind CSS         | v3.4.1      | MIT License         | [GitHub](https://github.com/tailwindlabs/tailwindcss) |
| Next.js              | v13.5.6     | MIT License         | [GitHub](https://github.com/vercel/next.js)          |
| React                | v18.2.0     | MIT License         | [GitHub](https://github.com/facebook/react)          |
| Axios                | v1.7.7      | MIT License         | [GitHub](https://github.com/axios/axios)             |
| Prisma               | v5.22.0     | Apache License 2.0  | [GitHub](https://github.com/prisma/prisma)           |
| CopilotKit           | v1.3.15     | MIT License         | [GitHub](https://github.com/copilotkit/copilotkit)   |



