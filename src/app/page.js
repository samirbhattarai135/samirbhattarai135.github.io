"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "/src/app/globals.css";
import { gsap } from "gsap";
import { Circ } from "gsap/all";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (event, sectionId) => {
    if (event && event.preventDefault) {
      event.preventDefault();
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

  const [isResumeVisible, setIsResumeVisible] = useState(false);

  // Function to toggle resume visibility
  const toggleResumeVisibility = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  useEffect(() => {
    var width, height, largeHeader, canvas, ctx, points, target;
    var animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width, y: height };

      largeHeader = document.getElementById("large-header");
      if (largeHeader) {
        // Set height only if the element is found
        const height = window.innerHeight;
        largeHeader.style.height = height + "px";
      } else {
        console.warn("Element with id 'large-header' not found.");
      }

      canvas = document.getElementById("demo-canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        console.warn("Canvas element not found.");
      }
      ctx = canvas.getContext("2d");

      // create points
      points = [];
      for (var x = 0; x < width; x = x + width / 20) {
        for (var y = 0; y < height; y = y + height / 20) {
          var px = x + (Math.random() * width) / 20;
          var py = y + (Math.random() * height) / 20;
          var p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
          var p2 = points[j];
          if (!(p1 == p2)) {
            var placed = false;
            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (var i in points) {
        var c = new Circle(
          points[i],
          2 + Math.random() * 2,
          "rgba(255,255,255,0.3)"
        );
        points[i].circle = c;
      }
    }

    // Event handling
    function addListeners() {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    }

    function mouseMove(e) {
      var posx = 0; // Initialize posx
      var posy = 0; // Initialize posy

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // animation
    function initAnimation() {
      animate();
      for (var i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height);
        for (var i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: "circ.inOut",
        onComplete: function () {
          shiftPoint(p);
        },
      });
    }

    // Canvas manipulation
    function drawLines(p) {
      if (!p.active || !ctx) return;
      for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      var _this = this;

      // constructor
      (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
      })();

      this.draw = function () {
        if (!_this.active || !ctx) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
        ctx.fill();
      };
    }

    // Util
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <link rel="icon" type="image/png" href="/favicon.png" />

      {/* Navbar */}
      <nav
        className={`bg-transparent fixed top-0 left-0 w-full flex justify-between items-center py-4 px-8 z-50 transition-all duration-500 ${
          sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a href="/" className="text-2xl font-bold">
          Samir
        </a>
        <a
          href="/Resume_Samir.pdf"
          target="_blank"
          onClick={toggleResumeVisibility}
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-800 hover:text-white"
        >
          Resume
        </a>

        <div className="flex space-x-4">
          <a
            className="hidden md:inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-gray-800 hover:text-white"
            href="mailto:samirbhattarai135@gmail.com"
          >
            GET IN TOUCH
          </a>
          <button
            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700"
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
              <a href="/">About me</a>
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
              <a href="" onClick={(event) => scrollToSection(event, "footer")}>
                Contact
              </a>
            </li>
            <li>
              <a
                href="/Resume_Samir.pdf"
                target="_blank"
                onClick={toggleResumeVisibility}
                className="cursor-pointer hover:underline hover:text-white hover:text-shadow-lg"
              >
                Resume
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
              <div onClick={(event) => scrollToSection(event, "0day")}>
                Zero Day Classification
              </div>
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
              <a href="https://www.instagram.com/saaammmiiirrrrr/">Instagram</a>
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
        <div className="relative w-full min-h-screen overflow-hidden bg-transparent">
          <canvas id="demo-canvas"></canvas>
          <div className="main-content">
            <div
              className="container-bio rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center relative"
              id="aboutme"
            >
              <div className="md:w-1/3 pb-5">
                <div className=" relative w-full h-full rounded-lg overflow-hidden transform  ">
                  <Image
                    src="/samir.png"
                    alt="Profile"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-4 z-[1000]">
                <h2 className="text-xl ">Hey there! I'm</h2>
                <h1 className="text-4xl font-bold mb-4">Samir Bhattarai</h1>
                <h2 className="text-xl text-gray-400 mb-6">
                  Computer Engineering and Mathematics
                </h2>
                <p className="text-lg mb-6">
                  I'm a computer engineering student at the University of
                  Southern Mississippi with a passion for crafting amazing
                  software and hardware experiences. I am currently studying
                  computer engineering with a mathematics minor to deepen my
                  understanding of how to build sleek and efficient computer
                  software and machines to make our daily experiences better.
                </p>
                <p>
                  While I'm not busy coding you'll often find me soaking up
                  inspiration from the world of technology. Whether it's
                  exploring new robotics innovations, machine learning models
                  from hugging face, or just learning to play guitar a bit
                  better, I love bringing creativity into work.
                </p>
                <div className="flex items-center mt-4">
                  {/* Signature Placeholder */}
                  <div className="text-2xl italic">S. Bhattarai</div>
                </div>
                {/* Social Media Icons */}
                <div className="flex items-center mt-6 space-x-4">
                  <a
                    href="https://github.com/samirbhattarai135"
                    className="text-yellow-500 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samir-bhattarai-1640011a7/"
                    className="text-yellow-500 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/saaammmiiirrrrr/"
                    className="text-yellow-500 hover:underline"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Projects Content */}
        <h2 className="text-4xl font-bold text-center" id="projects">
          Selected Projects
        </h2>
        <div className="relative flex flex-wrap px-3 py-5 md:w-full py-10 lg:w-full lg:items-start z-10">
          {/* Left Section: Project Description */}
          <div
            className="text-section w-full md:w-1/2 md:p-12 md:sticky lg:top-4 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
            id="visionbot"
          >
            <h3 className="text-3xl font-bold mb-4">Vision Bot (2023)</h3>
            <p className="text-lg mb-4">
              Vision Bot is an autonomous robot utilizing the ESP32 camera
              module and the YOLOv9 object detection model. The robot is capable
              of detecting and avoiding obstacles in real-time by dynamically
              adjusting its path.
            </p>
            <p className="text-lg mb-4">
              The autonomous object detection and avoidance robot integrates an
              ESP32 camera module to capture real-time video streams, enabling
              it to detect obstacles in its environment. By utilizing the YOLOv9
              object detection model, the robot can accurately identify objects
              within its surroundings, which facilitates precise path planning.
              Sophisticated algorithms are being implemented for dynamic
              obstacle avoidance, allowing the robot to navigate autonomously in
              complex, changing environments.
            </p>
          </div>

          {/* Right Section: Project Video */}
          <div className="w-full md:w-1/2 lg:max-w-7xl lg:gap-x-8 lg:px-8 py-10 ">
            <div className="project-card bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6">
              <Image
                src="/vision_bot/image2.png"
                alt="Project 1"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md my-4"
              />
              <Image
                src="/vision_bot/3Ddesign.jpg"
                alt="Project 1"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md my-4"
              />
              <video
                loop
                autoPlay
                muted
                width="100%"
                height="auto"
                className="object-cover rounded-md "
              >
                <source src="/vision_bot/video.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap flex-row-reverse px-5 py-5 md:w-full py-10 lg:w-full lg:items-start">
          {/* Right Section: Project Description */}
          <div
            className="text-section w-full md:sticky md:w-1/2 md:p-12 lg:top-4 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
            id="kritisana"
          >
            <h3 className="text-3xl font-bold mb-4"> KritiSana(2023)</h3>
            <p className="text-lg mb-4 ">
              E-commerce product Recommendation Engine
            </p>
            <p className="text-lg mb-4 ">
              KritiSana is an e-commerce recommendation engine tailored to
              enhance user experience by providing personalized product
              recommendations based on user interactions and historical data.
              This project involved building a dynamic web application that
              integrates multiple data sources, including user-uploaded data and
              external databases, to generate insightful and personalized
              product suggestions.
            </p>
            <p className="text-lg mb-4 ">
              The application leverages various recommendation algorithms,
              including collaborative filtering and content-based filtering, to
              suggest products that are most relevant to users. Additionally,
              the system categorizes products based on interactions such as
              views, purchases, and clicks, allowing users to filter
              recommendations by different time frames and interaction types.
            </p>
          </div>
          {/* Right Section: Project Images */}
          <div className="w-full md:w-1/2 lg:max-w-7xl lg:gap-x-8 lg:px-8 py-10">
            <div className="project-card bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6">
              <Image
                src="/kritisana/image0.png"
                alt="Project 1"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image3.png"
                alt="Project 2"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image4.png"
                alt="Project 3"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image5.png"
                alt="Project 4"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image8.png"
                alt="Project 5"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image6.png"
                alt="Project 6"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/kritisana/image9.png"
                alt="Project 6"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md"
              />
            </div>
            {/* Add more images as needed */}
          </div>
        </div>
        <div
          className="relative flex flex-wrap px-5 py-5 md:w-full py-10 lg:w-full lg:items-start"
          id="0day"
        >
          {/* Right Section: Project Description */}
          <div className="text-section w-full md:sticky md:w-1/2 md:p-12 lg:top-4 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <h3 className="text-3xl font-bold mb-4">
              Classification of Zero-Day Exploitation Types
            </h3>
            <p className="text-lg mb-4">
              This project focuses on the classification of zero-day
              exploitation types using advanced machine learning techniques.
              Leveraging a comprehensive cybersecurity dataset, we employed
              neural networks to identify and categorize different types of
              exploits. The project involved extensive feature engineering,
              including the encoding of categorical variables and scaling of
              features, to optimize the performance of the models.
            </p>
            <p className="text-lg mb-4">
              Key aspects of the project included handling class imbalances,
              tuning hyperparameters, and addressing potential overfitting
              issues. The result is a model that achieves a high level of
              accuracy in predicting exploitation types, with applications in
              enhancing cybersecurity measures and threat detection.
            </p>
          </div>

          {/* Right Section: Project Images */}
          <div className="w-full md:w-1/2 lg:max-w-7xl lg:gap-x-8 lg:px-8 py-10">
            <div className="project-card bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6">
              <Image
                src="/0-day/image0.png"
                alt="Project 1"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/0-day/image3.png"
                alt="Project 2"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/0-day/image4.png"
                alt="Project 3"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/0-day/image2.png"
                alt="Project 4"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/0-day/image1.png"
                alt="Project 5"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md mb-4"
              />
              <Image
                src="/0-day/image6.png"
                alt="Project 6"
                layout="responsive"
                width={100}
                height={60}
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div class="more-products">
          <div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-center">
              More Projects
            </h2>
            <div class=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src="/tts.png"
                    alt="Front of men&#039;s Basic Tee in black."
                    width={100}
                    height={100}
                    className="w-full object-cover object-center lg:h-auto lg:w-full"
                  ></Image>
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm">
                      <a href="https://github.com/samirbhattarai135/Esp32-with-Chat-GPT">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0"
                        ></span>
                        Esp32 TTS Audio Streaming and Download Server
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <video
                    loop
                    autoPlay
                    muted
                    width="100%"
                    height="auto"
                    className="object-cover rounded-md "
                  >
                    <source src="/video.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm">
                      <a href="https://github.com/samirbhattarai135/Arduino-Robotics">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0"
                        ></span>
                        3x3 LED CUBE
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src="/slot_machine.jpg"
                    alt="Front of men&#039;s Basic Tee in black."
                    width={100}
                    height={100}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  ></Image>
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm">
                      <a href="https://github.com/samirbhattarai135/Python-Projects">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0"
                        ></span>
                        Classic Slot Machine
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <video
                    loop
                    autoPlay
                    muted
                    width="100%"
                    height="auto"
                    className="object-cover rounded-md "
                  >
                    <source src="/snake_game.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm">
                      <a href="https://github.com/samirbhattarai135/C---projects">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0"
                        ></span>
                        Classic Snake Game
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer text-white py-12" id="footer">
          <div className="footer-div">
            <div className="mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8 ">
              <div>
                <h3 className="text-lg font-bold mb-4">Sitemap</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:underline"
                      onClick={(event) => scrollToSection(event, "aboutme")}
                    >
                      About me
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:underline"
                      onClick={(event) => scrollToSection(event, "projects")}
                    >
                      Projects
                    </a>
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
                    <a
                      href="https://www.instagram.com/saaammmiiirrrrr/"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              {/* Work With Me */}
              <div>
                <h3 className="text-lg font-bold mb-4">Work With Me:</h3>
                <a
                  href="mailto:samirbhattarai135@gmail.com"
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
          </div>
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
        </footer>
      </motion.div>
    </>
  );
}
