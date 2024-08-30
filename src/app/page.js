"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link from next/link

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`bg-transparent fixed top-0 left-0 w-full flex justify-between items-center py-4 px-8 z-50 transition-all duration-500 ${
          sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-2xl font-bold">Samir</div>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">
            GET IN TOUCH
          </button>
          <button
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: sidebarOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.5 }}
        className={`fixed top-0 right-0 w-3/4 max-w-md h-full bg-black text-white z-60 p-8 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-white text-3xl absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Go to</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/about">About me</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/projects">Projects</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">
            Selected Projects
          </h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/projects/schumacher">Schumacher</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/projects/snapserve">Snapserve</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="/projects/pricemonitor">Price monitor</Link>
            </li>
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">Follow Us</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="https://github.com">GitHub</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="https://linkedin.com">LinkedIn</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="https://instagram.com">Instagram</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <Link href="https://twitter.com">Twitter</Link>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        animate={{
          scale: sidebarOpen ? 0.9 : 1,
          filter: sidebarOpen ? "blur(5px)" : "blur(0px)",
          opacity: sidebarOpen ? 0.5 : 1,
        }}
        transition={{ type: "tween", duration: 0.5 }}
        className="p-8"
      >
        {/* Replace with your main content */}
        <div className="pt-16">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex items-center">
            {/* Left Section: Profile Image */}
            <div className="w-1/2 pr-8">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/samir.jpg"
                  alt="Profile"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Section: Details */}
            <div className="w-1/2 pl-8">
              <h1 className="text-4xl font-bold mb-4">Samir Bhattarai</h1>
              <h2 className="text-xl text-gray-400 mb-6">
                Computer Engineering and Mathematics
              </h2>
              <p className="text-lg mb-6">
                Hey there! I'm a 22-year-old computer engineering student at the
                University of Southern Mississippi with a passion for crafting
                amazing software and hardware experiences. I am currently
                studying computer engineering with a mathematics minor to deepen
                my understanding of how to build sleek and efficient computer
                software and machines to make our daily experiences better.
              </p>
              <p>
                While I'm not busy coding you'll often find me soaking up
                inspiration from the world of technology. Whether it's exploring
                new robotics innovations, machine learning models from hugging
                face, or just learning to play guitar a bit better, I love
                bringing creativity into work.
              </p>
              <div className="flex items-center mt-4">
                {/* Signature Placeholder */}
                <div className="text-2xl italic">S. Bhattarai</div>
              </div>
              {/* Social Media Icons */}
              <div className="flex items-center mt-6 space-x-4">
                <a href="#" className="text-yellow-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-yellow-500">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-yellow-500">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
