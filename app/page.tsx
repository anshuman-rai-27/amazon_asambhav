'use client'
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { handleSignOut } from './actions/cognitoActions'


// export default function Home() {
//   const router = useRouter();

//   const handelShopify = async()=>{
//     router.push('/api/auth/')
//   }
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <Link
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="/auth/signup"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Signup
//           </Link>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="/auth/login"
//             rel="noopener noreferrer"
//           >
//             Login
//           </a>
//           <button className='p-2 rounded-md bg-black text-white' onClick={handelShopify}>Connect Shopify</button>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

import Head from 'next/head'

const Home: React.FC = () => {
  const router = useRouter();

  const handelShopify = async()=>{
    router.push('/api/auth/')
  }
  const handleLogout = async() => {
    await handleSignOut();
  }
  return (
    <>
      <Head>
        <title>One Stop Vyapaar</title>
        <meta name="description" content="Integrate Shopify with Amazon Multi-Channel Fulfillment seamlessly." />
      </Head>

      <main className="bg-gray-50">
        {/* Navbar */}
        <header className="flex justify-between items-center py-6 px-10 bg-white shadow">
          <h1 className="text-2xl font-bold text-indigo-600">One Stop Vyapaar</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact Us</a>
          </nav>
          <button className='p-2 rounded-md bg-black text-white' onClick={handelShopify}>Connect Shopify</button>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center bg-indigo-600 text-white py-20 px-4">
          <h2 className="text-4xl font-bold mb-4">Effortless Shopify and Amazon Fulfillment Integration</h2>
          <p className="max-w-2xl text-lg mb-8">One Stop Vyapaar lets you connect your Shopify store with Amazon's multi-channel fulfillment, simplifying inventory, shipping, and order management.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-100">Get Started for Free</button>
        </section>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/auth/signup"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Signup
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/auth/login"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <button onClick={handleLogout}>
          Log out
          </button>
            
          
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 px-10 bg-gray-50">
          <h3 className="text-3xl font-semibold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Seamless Integration" description="Connect Shopify and Amazon with a few clicks." />
            <FeatureCard title="Centralized Dashboard" description="Manage orders, inventory, and fulfillment in one place." />
            <FeatureCard title="Automated Syncing" description="Keep stock levels and order statuses updated in real time." />
          </div>
        </section>
        

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-10 bg-white text-gray-800">
          <h3 className="text-3xl font-semibold text-center mb-12">Pricing</h3>
          <div className="flex justify-center space-x-8">
            <PricingCard plan="Basic" price="$29/month" features={["Basic Integration", "Limited Orders", "Email Support"]} />
            <PricingCard plan="Pro" price="$59/month" features={["Advanced Integration", "Unlimited Orders", "Priority Support"]} />
            <PricingCard plan="Enterprise" price="Custom" features={["Custom Solutions", "Dedicated Support", "API Access"]} />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-10 bg-gray-50 text-gray-800">
          <h3 className="text-3xl font-semibold text-center mb-12">How It Works</h3>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p>1. Sign up and connect your Shopify store.</p>
            <p>2. Authorize access to Amazon Multi-Channel Fulfillment.</p>
            <p>3. Start syncing products and processing orders effortlessly.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-10 bg-white text-gray-800 text-center">
          <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
          <p className="mb-8">Have questions? Reach out to our team for support.</p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">Get in Touch</button>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-600 bg-gray-200">
          &copy; {new Date().getFullYear()} One Stop Vyapaar. All rights reserved.
        </footer>
      </main>
    </>
  )
}

interface FeatureCardProps {
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
)

interface PricingCardProps {
  plan: string
  price: string
  features: string[]
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features }) => (
  <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
    <h4 className="text-xl font-semibold text-indigo-600 mb-2">{plan}</h4>
    <p className="text-2xl font-bold mb-4">{price}</p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="text-gray-600">{feature}</li>
      ))}
    </ul>
    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700">Choose Plan</button>
  </div>
)

export default Home
