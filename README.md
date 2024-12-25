# One Stop Vyapaar - E-commerce Management Platform

## Project Overview
**Goal:** Empower businesses to leverage Amazon's logistics network for seamless inventory storage and order fulfillment across multiple sales channels with minimal coding.  

---

## Key Benefits
- **AI Chatbot:** Manages backend tasks like inventory, delivery, and ROP handling.  
- **Amazon MCF Integration:** PAN India logistics without warehouse setup.  
- **Unified Order Management:** Manage orders from multiple platforms through a single dashboard.  
- **Real-time Tracking & SLAs:** Provides full order visibility and delivery timelines.  
- **AI Recommendations:** Inventory and product demand analysis.  
- **Marketplace for Manufacturers:** Connect sellers with trusted manufacturers.  
- **Order Verification System:** Reduces cancellation risks with confirmation messages.  

---

## How It Works (Example Story: Lakshman the Seller)
1. **Unified Inventory & Order Management:** Connects Shopify, Facebook Marketplace, and Amazon with MCF.  
2. **AI Inventory Insights:** Predicts trends and restocking needs using AWS Supply Chain.  
3. **Dynamic Pricing:** Adjusts prices using PyCaret based on market trends and competitor pricing.  
4. **Oversell Prevention:** Real-time alerts via AWS Lambda and SNS when inventory is low.  
5. **Order Confirmation:** AWS Pinpoint verifies orders before dispatch.  
6. **Return Heatmap:** Identifies high return regions using geolocation data.  
7. **International Fulfillment:** Uses Amazon's API for seamless global order handling.  

---

## Marketplace Features
- **PAN India Distribution:** Connects local manufacturers with Amazon MCF.  
- **Dropshipping Network:** Trusted suppliers with Amazon logistics support.  
- **Quality Checks:** Sample and random product verification.  
- **Trusted Manufacturer Tag:** Boosts reliable sellers' visibility.  

---

## Security & Trust
- **User Access Control:** AWS IAM and Cognito.  
- **Data Encryption:** AWS KMS.  
- **Secure Authentication:** Amazon Cognito.  

---

## Technical Stack
- **Frontend:** Next.js, Tailwind CSS, Material-UI  
- **Backend:** Node.js (Express/NestJS), AWS Lambda, AWS API Gateway  
- **Core Technologies:** Docker, ECS, ELB  
- **Storage:** DynamoDB, RDS, S3  
- **Security:** AWS IAM, KMS, Cognito  
- **AI/ML:** PyCaret, AWS Personalize  
- **Analytics:** QuickSight, CloudWatch, Redshift  
- **CI/CD:** GitHub Actions, Docker, AWS CodePipeline  

---

## Innovation Highlights
- **AI-Powered Inventory Optimization:** Real-time stock analysis and predictive restocking.  
- **Dynamic Pricing:** Adjust prices based on demand using PyCaret models.  
- **Marketplace for Manufacturers:** Expands seller reach through Amazon MCF.  

---

## Methodology/Architecture Diagram
**[View Diagram](https://drive.google.com/file/d/1ecn-HXdILDlC7_ECxTXjzZRMFG1biRlU/view?usp=sharing)**  
![read drawio](https://github.com/user-attachments/assets/2463668f-1a22-4b35-a1a8-eed1923ae94a)


---

## Demonstration
**Prototype Demo:** [View Demo](https://drive.google.com/drive/folders/1zgua0Z-7xckWaaR21-l1juH-s15EPIFs?usp=sharing)  
**Deployment Link:** [Vyapaar](https://amazon-asambhav.vercel.app/)  
---

## Screenshots and Videos
Dashboard
![Screenshot 2024-12-25 162809](https://github.com/user-attachments/assets/b9b59715-e141-4d11-b6a4-801282a9d900)

Marcket Place
![Screenshot 2024-12-25 162741](https://github.com/user-attachments/assets/3689f738-3218-4826-b211-799afd1dbd75)

Developer Plughin
![Screenshot 2024-12-25 162757](https://github.com/user-attachments/assets/0a0e953f-b17c-4536-8bba-66d1f94e6aa5)


---

## Instructions

### Next.js Setup
1. Clone the repository:  
   git clone https://github.com/anshuman-rai-27/amazon_asambhav.git

2. Install dependencies:  
   cd amazon_asambhav
   npm install

3. Run the development server:  
   npm run dev

4. Open http://localhost:3000 in your browser.

### Docker Setup
1. Build the Docker image:  
   docker build -t vyapaar-app .

2. Run the container:  
   docker run -p 3000:3000 vyapaar-app

3. Access the application at http://localhost:3000.

### Environment Variables (Example)
Create a `.env.local` file in the root directory and add the following:  
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/dbname
NEXT_PUBLIC_USER_POOL_ID=
NEXT_PUBLIC_USER_POOL_CLIENT_ID=
KMS_KEY_ID=
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET_KEY=
SCOPES=['write_customers','read_customers', 'write_orders', 'write_products', 'read_orders', 'read_products', 'read_draft_orders']
DB_USER=
DB_PASSWORD=
DB_NAME=postgres
S3_BUCKET_NAME=
PINPOINT_PROJECT_ID=
GROQ_API_KEY=


