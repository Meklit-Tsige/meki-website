import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Inner from "../../components/Layout/Inner";
import { selected, selectedMini } from "../../components/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
export default function Selected() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      root: containerRef.current,
      rootMargin: "0px -99% 0px 0px", // Very narrow margin on the left
      threshold: 0, // Trigger when an image barely enters the left side
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setCurrentIndex(index);
        }
      });
    }, options);

    const slides = containerRef.current.querySelectorAll(".image-slide");
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      slides.forEach((slide) => observer.unobserve(slide));
    };
  }, [selected]);

  const imageRefs = useRef([]);
  const bottomImageRef = useRef(null);
  const imageMaskRef = useRef(null);
  const revealRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToImageRefs = addToRefs(imageRefs);
  const addToRevealRefs = addToRefs(revealRefs);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
    gsap.set(imageRefs.current, {
      yPercent: 250,
      opacity: 0,
    });
    gsap.set(bottomImageRef.current, {
      yPercent: 105,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {},
    });

    tl.to(imageRefs.current, {
      visibility: "visible",
    })
      .to(
        imageRefs.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        bottomImageRef.current,
        {
          yPercent: 0,
          duration: 1.6,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        imageMaskRef.current,
        {
          scaleY: 0,
          duration: 1.3,
          ease: "power4.out",
        },
        "<0.2"
      )
      .to(
        revealRefs.current,
        {
          visibility: "visible",
        },
        "-=1.3"
      )
      .to(
        revealRefs.current,
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      );
  };

  const imageVariants = {
    initial: {
      y: "250%",
      opacity: 0,
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1], // Equivalent to "power3.out"
      },
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.02, // Staggering effect
      },
    },
  };

  useGSAP(() => {
    const master = gsap.timeline();
    master.add(setInitialStates).add(preloaderAnimation());
  }, []);

  return (
    <Inner backgroundColor={"#B0AD98"}>
      <CustomCursor hovered={false} />
      <div className="flex flex-col">
        <div
          style={{ zIndex: 9999, fontSize: "0.8rem" }}
          className="px-5 py-3 flex font-medium items-center uppercase w-full"
        >
          <div className="w-6/12 flex overflow-hidden">
            <div className="invisible" ref={addToRevealRefs}>
              <Link href={"/"} className={`text-nowrap`}>
                MEKLIT FEKADU
              </Link>
            </div>
          </div>
          <div className="w-6/12 flex justify-between overflow-hidden">
            <div className="invisible" ref={addToRevealRefs}>
              <Link href={"/"} className={`headerLink hidden md:block`}>
                Overview
              </Link>
            </div>
            <div className="invisible" ref={addToRevealRefs}>
              <Link href={"/selected"} className={`underline`}>
                Selected
              </Link>
            </div>
            <div className="invisible" ref={addToRevealRefs}>
              <Link href={"/about"} className={`headerLink `}>
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-6 mt-12">
          <div
            ref={imageMaskRef}
            style={{ zIndex: 10 }}
            className="w-full h-full absolute origin-top bg-black"
          ></div>
          <div
            className="w-[90vw] ml-5 overflow-hidden md:w-[45vw] max-h-[70vh]"
            ref={bottomImageRef}
          >
            <Image
              src={selected[currentIndex]}
              width={500}
              height={500}
              className="object-contain self-end object-bottom"
              alt=""
            />
          </div>
        </div>

        <motion.div
          // variants={containerVariants}
          // initial="initial"
          // animate="animate"
          style={{ zIndex: 15 }}
          ref={containerRef}
          className="noScrollBar w-full fixed h-[100svh] top-0 bottom-0 pt-[calc(100svh-80px)] pl-5 flex gap-2 overflow-x-auto overflow-y-hidden z-50 pr-[calc(100vw-48px)]"
        >
          {[...selectedMini].map((image, index) => (
            <motion.div
              key={index}
              // variants={imageVariants}
              data-index={index}
              ref={addToImageRefs}
              // invisible
              className="invisible relative max-h-16 min-w-12 image-slide"
            >
              <Image
                src={image}
                fill
                sizes="10vw"
                className="object-cover object-top block"
                alt={image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Inner>
  );
}
