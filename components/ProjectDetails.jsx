"use client";
import { motion } from "framer-motion";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

function splitParagraphByCharacterLength(paragraph, targetLength = 45) {
  const words = paragraph.split(" ");
  const phrases = [];
  let currentPhrase = [];
  let currentLength = 0;

  words.forEach((word) => {
    // Add the word and its following space to the current length
    const wordLength = word.length + 1; // Adding 1 for the space

    // If adding this word exceeds the target length, finalize the current phrase
    if (currentLength + wordLength > targetLength && currentPhrase.length > 0) {
      phrases.push(currentPhrase.join(" "));
      currentPhrase = [];
      currentLength = 0;
    }

    // Add the word to the current phrase
    currentPhrase.push(word);
    currentLength += wordLength;
  });

  // Add the last phrase if there's any leftover
  if (currentPhrase.length > 0) {
    phrases.push(currentPhrase.join(" "));
  }

  return phrases;
}

export default function ProjectDetails({
  project,
  setOpenDetails,
  openDetails,
}) {
  // to prevent body from scrolling when a modal is open
  useEffect(() => {
    if (openDetails) {
      console.log("stop scroll");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openDetails]);

  const revealRefs = useRef([]);
  const imageRefs = useRef([]);
  const headerRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };
  const addToImageRefs = addToRefs(imageRefs);
  const addToHeaderRefs = addToRefs(headerRefs);

  const setInitialStates = () => {
    gsap.set(imageRefs.current, {
      yPercent: 100,
      opacity: 0,
    });
    gsap.set(headerRefs.current, {
      yPercent: 100,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({});

    tl.to(
      imageRefs.current,
      {
        visibility: "visible",
      },
      "<"
    )
      .to(imageRefs.current, {
        yPercent: 0,
        delay: 0.1,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
      })
      .to(
        headerRefs.current,
        {
          visibility: "visible",
        },
        "-=0.5"
      )
      .to(
        headerRefs.current,
        {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
  };

  useGSAP(() => {
    const master = gsap.timeline();
    master.add(setInitialStates).add(preloaderAnimation());
  }, []);

  const phrases = splitParagraphByCharacterLength(project.description);

  const animation = {
    initial: { y: "100%" },
    enter: (i) => {
      console.log(`Animating phrase ${i}`);

      return {
        y: "0%",
        transition: {
          duration: 0.75,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.075 * i,
        },
      };
    },
  };

  return (
    <motion.div
      initial={{ y: "100%" }} // Start off-screen (100% from its position)
      animate={{ y: "0%" }} // Move to its final position
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ zIndex: 10000 }}
      className="h-[100vh] top-0 bg-black fixed w-full flex flex-col"
    >
      {/* Header */}
      <div
        style={{ fontSize: "0.8rem" }}
        className="px-5 py-3 flex font-medium items-center uppercase w-full"
      >
        <div className="md:w-6/12 w-4/12 flex overflow-hidden"></div>
        <div className="w-8/12 md:w-6/12 flex justify-end overflow-hidden">
          <div className="invisible" ref={addToHeaderRefs}>
            <motion.div
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenDetails(false)}
              className="cursor-pointer"
            >
              <Cross1Icon />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row pt-8 md:pt-24">
        <div className="w-0 md:w-1/12 order-2 sm:order-1"></div>
        <div className="md:w-4/12 w-12/12 px-5 md:pt-0 pt-5 md:px-0 flex flex-col order-3 sm:order-2">
          <div className="flex flex-col">
            <div className={"overflow-hidden flex justify-between"}>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.75,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.75,
                }}
              >
                {project.title}
              </motion.div>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                className="text-sm opacity-70 items-center flex md:hidden font-light"
                transition={{
                  duration: 0.75,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.75,
                }}
              >
                {project.year}
              </motion.div>
            </div>
            {/* <div className={"overflow-hidden"}>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                className="text-xl italic opacity-70"
                transition={{
                  duration: 0.75,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.75 + 0.075,
                }}
              >
                {project.projectName}
              </motion.div>
            </div> */}
          </div>
          <div className={"overflow-hidden hidden opacity-70 md:flex"}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              className="mt-2 w-8/12 text-sm font-light"
              transition={{
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.75 + 0.075 * 2,
              }}
            >
              {project.year}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <div className="mt-4 md:mt-8 w-12/12 text-sm hidden md:block font-light">
              {phrases.map((phrase, index) => {
                return (
                  <div key={index} className={"overflow-hidden"}>
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.75,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.75 + 0.075 * (index + 2),
                      }}
                    >
                      {phrase}
                    </motion.div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 md:mt-8 w-12/12 block md:hidden text-xs font-light">
              {splitParagraphByCharacterLength(project.description, 70).map(
                (phrase, index) => {
                  return (
                    <div key={index} className={"overflow-hidden"}>
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.75,
                          ease: [0.33, 1, 0.68, 1],
                          delay: 0.75 + 0.075 * (index + 2),
                        }}
                      >
                        {phrase}
                      </motion.div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="w-full px-5 md:px-0 md:w-7/12 h-[65vh] md:h-[70vh] overflow-hidden mr-5 order-0 sm:order-3">
          <div className="flex overflow-y-hidden gap-8">
            {project.images.map((image, index) => (
              <div
                ref={addToImageRefs}
                key={index}
                className="h-50 w-50 relative shrink-0"
              >
                <Image src={image} height={700} width={500} alt={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
