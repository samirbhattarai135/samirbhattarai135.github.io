"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import "/src/app/globals.css";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (event, sectionId) => {
    // Check if 'event' is an object and has preventDefault function
    if (event && event.preventDefault) {
      event.preventDefault(); // Prevent the default link behavior
    } else {
      console.warn("Invalid event object passed:", event);
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("No section found with id:", sectionId);
    }
  };

  return (
    <>
      <div className="lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

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
        className={`fixed top-0 right-0 w-3/4 max-w-md h-full  text-white z-[1000] p-8 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
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
              <a href="/">Home</a>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a
                href="#about"
                onClick={(event) => scrollToSection(event, "about")}
              >
                About me
              </a>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a
                href="#projects"
                onClick={(event) => scrollToSection(event, "projects")}
              >
                Projects
              </a>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a
                href="#contact"
                onClick={(event) => scrollToSection(event, "footer")}
              >
                Contact
              </a>
            </li>
          </ul>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">
            Selected Projects
          </h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <div onClick={(event) => scrollToSection(event, "visionbot")}>
                Vision Bot
              </div>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <div onClick={(event) => scrollToSection(event, "kritisana")}>
                KritiSana
              </div>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <div>Chat GPT with Esp32</div>
            </li>
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">Follow me on</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a href="https://github.com/samirbhattarai135">GitHub</a>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a href="https://www.linkedin.com/in/samir-bhattarai-1640011a7/">
                LinkedIn
              </a>
            </li>
            <li className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg">
              <a href="https://instagram.com">Instagram</a>
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
        className="p-8 pb-8 md:pb-0"
      >
        {/* Replace with your main content */}
        <div className="pt-16">
          <div className="container-bio rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center relative">
            <div className="md:w-1/2 pb-5">
              <div className=" relative w-full h-full rounded-lg overflow-hidden transform translate-x-[-0px] translate-y-[-120px]">
                <Image
                  src="/samir.png"
                  alt="Profile"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 pl-8 ">
              <h1 className="text-4xl font-bold mb-4">Samir Bhattarai</h1>
              <h2 className="text-xl text-gray-400 mb-6">
                Computer Engineering and Mathematics
              </h2>
              <p className="text-lg mb-6">
                Hey there! I'm a computer engineering student at the University
                of Southern Mississippi with a passion for crafting amazing
                software and hardware experiences. I am currently studying
                computer engineering with a mathematics minor to deepen my
                understanding of how to build sleek and efficient computer
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
                <a
                  href="https://github.com/samirbhattarai135"
                  className="text-yellow-500"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/samir-bhattarai-1640011a7/"
                  className="text-yellow-500"
                >
                  LinkedIn
                </a>
                <a href="https://instagram.com" className="text-yellow-500">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Projects Section */}
        <h2 className="text-4xl font-bold mb-8 text-center py-10" id="projects">
          Projects
        </h2>
        <section className="flex flex-wrap">
          {/* Left Section: Project Description */}
          <div className="w-full md:w-1/2 pr-8 mb-8 sticky top-0">
            <h3 className="text-3xl font-bold mb-4" id="visionbot">
              Vision Bot (2023)
            </h3>
            <p className="text-lg mb-4 text-gray-400">
              Vision Bot is an AI-powered, interactive, and user-friendly
              platform designed to help creative professionals discover,
              understand, and implement innovative design solutions.
            </p>
            <p className="text-lg mb-4 text-gray-400">
              The platform aims to provide creative professionals with a
              comprehensive, accessible, and engaging platform to discover,
              understand, and implement innovative design solutions.
            </p>
          </div>
          {/* Right Section: Project Images */}
          <div className="w-full md:w-1/2 overflow-y-auto h-96">
            <Image
              src="/kritisana/image1.jpeg"
              alt="Project 1"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            <Image
              src="/kritisana/image2.png"
              alt="Project 2"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            <Image
              src="/kritisana/image1.jpeg"
              alt="Project 3"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            {/* Add more images as needed */}
          </div>
        </section>
        <div className=" flex flex-row-reverse bg-blue">
          {/* Left Section: Project Description */}
          <section className="w-full md:w-1/2 pr-8 px-4 mb-8" id="kritisana">
            <h3 className="text-3xl font-bold mb-4"> KritiSana(2023)</h3>
            <p className="text-lg mb-4 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adip
            </p>
            <p className="text-lg mb-4 text-gray-400">
              KritiSana is an online platform designed to help creative
              professionals discover, understand, and implement innovative
              design solutions.
            </p>
            <p className="text-lg mb-4 text-gray-400">
              KritiSana aims to provide creative professionals with a
              comprehensive, accessible, and engaging platform to discover,
              understand, and implement innovative design solutions.
            </p>
          </section>
          {/* Right Section: Project Images */}
          <div className="w-full md:w-1/2 overflow-y-auto h-96">
            <Image
              src="/kritisana/image1.jpeg"
              alt="Project 1"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            <Image
              src="/kritisana/image2.png"
              alt="Project 2"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            <Image
              src="/kritisana/image1.jpeg"
              alt="Project 3"
              layout="responsive"
              width={100}
              height={60}
              className="object-cover rounded-md mb-4"
            />
            {/* Add more images as needed */}
          </div>
        </div>

        <footer className="footer bg-black text-white py-12" id="footer">
          <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sitemap */}

            <div>
              <h3 className="text-lg font-bold mb-4">Sitemap</h3>
              <ul className="space-y-2">
                <li>
                  <a href="home" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:underline">
                    About me
                  </a>
                </li>
                <li>
                  <a className="hover:underline">Projects</a>
                </li>
              </ul>
            </div>

            {/* Follow me */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow me</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/samirbhattarai135"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/samir-bhattarai-1640011a7/"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Work With Me */}
            <div>
              <h3 className="text-lg font-bold mb-4">Work With Me:</h3>
              <a
                href="/samirbhattarai135@gmail.com"
                className="hover:underline"
              >
                samirbhattarai135@gmail.com
              </a>
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2 flex justify-between text-sm mt-8 md:mt-0">
              <div>
                <p>Based in United States</p>
              </div>
              <div>
                <p>Availability</p>
                <p>Currently available for part-time</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="container mx-auto px-8 mt-12 flex justify-between items-center text-sm">
            <div>&copy; 2024 - Samir Bhattarai All Rights Reserved</div>
            <div>
              <a href="#top" className="hover:underline">
                <span className="text-xl">&uarr;</span> Back to Top
              </a>
            </div>
          </div>
        </footer>
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </motion.div>
    </>
  );
}
