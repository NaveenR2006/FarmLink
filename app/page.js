'use client'
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

const TestimonialCard = ({ image, name, location, review }) => (
  <div className="relative w-full md:w-[337px] h-[305px] bg-gray-50 rounded-lg shadow-lg transition-transform hover:scale-105 p-6 border border-gray-200">
    <div className="flex items-center gap-4">
      <Image
        src={image}
        alt={name}
        width={71}
        height={68}
        className="rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-xl">{name}</h3>
        <p className="font-light text-gray-600">{location}</p>
      </div>
    </div>
    <div className="flex gap-2 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
          key={star}
          src="/star-1.svg"
          alt="star"
          width={32}
          height={28}
        />
      ))}
    </div>
    <p className="mt-6 font-light text-gray-700">{review}</p>
  </div>
);

const NavButton = ({ href, children }) => (
  <Link href={href}>
    <Button
      variant="contained"
      color="success"
      className="bg-green-800 hover:bg-green-900"
    >
      {children}
    </Button>
  </Link>
);

const Page = () => {
  const router = useRouter();

  const testimonials = [
    {
      image: "/ellipse-13@2x.png",
      name: "Andres Ivan",
      location: "Bangalore",
      review: "Very fresh and reliable."
    },
    {
      image: "/ellipse-14@2x.png",
      name: "Adriana",
      location: "Mangalore",
      review: "Very fresh and reliable."
    },
    {
      image: "/ellipse-15@2x.png",
      name: "Walmart",
      location: "Tamil Nadu",
      review: "Very fresh and reliable."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <Image
          src="/alimentos-orgnicos--quais-os-benefcios--1@2x.png"
          alt="Fresh Produce"
          layout="fill"
          objectFit="cover"
          priority
        />
        <nav className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-green-800 hover:text-green-700 cursor-pointer">
                FarmLink
              </h1>
            </Link>
            <div className="space-x-4">
              <NavButton href="/FarmerLogin">Farmer</NavButton>
              <NavButton href="/RetailerLogin">Retailer</NavButton>
            </div>
          </div>
        </nav>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
  <div className="flex flex-col items-center space-y-6 text-center">
    <h2 className="text-5xl font-bold mb-4">Connect. Trade. Grow.</h2>
    <p className="text-xl mb-8">Bridging farmers and retailers for a sustainable future</p>
    <div className="flex gap-4">
      <Button
        variant="contained"
        color="success"
        className="bg-green-800 hover:bg-green-900"
        onClick={() => router.push('/FarmerRegistration')}
      >
        Register as Farmer
      </Button>
      <Button
        variant="contained"
        color="success"
        className="bg-green-800 hover:bg-green-900"
        onClick={() => router.push('/RetailerRegistration')}
      >
        Register as Retailer
      </Button>
    </div>
  </div>
</div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Why Choose FarmLink?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-2xl font-semibold mb-2">Direct From Farmers</h3>
              <p>Get fresh produce directly from local farmers</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold mb-2">Fair Prices</h3>
              <p>Transparent pricing that benefits both parties</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚛</div>
              <h3 className="text-2xl font-semibold mb-2">Quick Delivery</h3>
              <p>Efficient logistics for timely deliveries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">FarmLink</h3>
              <p>Connecting farmers and retailers across India</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/FarmerLogin" className="hover:text-green-300">
                    Farmer Login
                  </Link>
                </li>
                <li>
                  <Link href="/RetailerLogin" className="hover:text-green-300">
                    Retailer Login
                  </Link>
                </li>
                <li>
                  <Link href="/FarmerRegistration" className="hover:text-green-300">
                    Farmer Registration
                  </Link>
                </li>
                <li>
                  <Link href="/RetailerRegistration" className="hover:text-green-300">
                    Retailer Registration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p>Email: info@farmlink.com</p>
              <p>Phone: +91 123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center">
            <p>&copy; 2025 FarmLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
