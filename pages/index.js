"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ALLprojects, projects } from "../components/data";
import { useEffect, useRef, useState } from "react";
import Counter from "@/components/Counter";
import Image from "next/image";
import Inner from "../components/Layout/Inner";
import ProjectDetails from "@/components/ProjectDetails";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

export let hasPageLoaded = false;

function findProjectByImage(src) {
  return projects.find((project) => project.images.includes(src)) || null;
}

export default function Home() {
  gsap.registerPlugin(useGSAP);

  const counterRef = useRef(null);

  const revealRefs = useRef([]);
  const imageRefs = useRef([]);
  const contentRef = useRef(null);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToImageRefs = addToRefs(imageRefs);
  const addToRevealRefs = addToRefs(revealRefs);

  useEffect(() => {
    // Check if this is the first load by checking our flag
    if (!hasPageLoaded) {
      // Code that should only run on a full page reload
      console.log("This code runs only on a full page reload!");

      // Set the flag to indicate the page has been loaded
      hasPageLoaded = true;
    }
  }, []);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
    gsap.set(imageRefs.current, {
      yPercent: 250,
      opacity: 0,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {},
    });

    if (counterRef.current) {
      tl.to(
        counterRef?.current,
        {
          delay: 1.7,
          duration: 1.3,
          yPercent: -150,
          opacity: 0,
          ease: "power3.inOut",
        },
        "<"
      )
        .to(
          imageRefs.current,
          {
            visibility: "visible",
          },
          "-=0.5"
        )
        .to(
          imageRefs.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.01,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          revealRefs.current,
          {
            visibility: "visible",
          },
          "-=2"
        )
        .to(
          revealRefs.current,
          {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );
    } else {
      tl.to(imageRefs.current, {
        visibility: "visible",
      })
        .to(
          imageRefs.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.01,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          revealRefs.current,
          {
            visibility: "visible",
          },
          "-=1.7"
        )
        .to(
          revealRefs.current,
          {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );
    }
  };

  useGSAP(() => {
    const master = gsap.timeline({ paused: true });
    master.add(setInitialStates).add(preloaderAnimation()).play();
  }, []);

  const [openDetails, setOpenDetails] = useState(false);
  const [focusedProject, setFocusedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Inner backgroundColor={"#B0AD98"}>
      {/* <CustomCursor hovered={hovered} /> */}
      {openDetails && (
        <ProjectDetails
          project={focusedProject}
          setOpenDetails={setOpenDetails}
          openDetails={openDetails}
        />
      )}
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
              <Link href={"/"} className={`underline hidden md:block`}>
                Overview
              </Link>
            </div>
            <div className="invisible" ref={addToRevealRefs}>
              <Link href={"/selected"} className={`headerLink`}>
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

        <div className="mb-44">
          {!hasPageLoaded && (
            <div
              ref={counterRef}
              className="fixed top-0 pl-1 w-full flex uppercase text-7xl"
            >
              <div className="w-8/12">
                <Counter />
              </div>
              <div className="w-4/12">100</div>
            </div>
          )}

          {/* PageContent */}
          <div
            ref={contentRef}
            // ${
            //   hasPageLoaded ? "mt-36" : "mt-24"
            // }
            className={`flex flex-col gap-16 px-5 pt-8 md:pt-16`}
          >
            <div className="flex w-full flex-wrap gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-12 justify-between">
              {ALLprojects.map((project, index) => (
                <div
                  key={index}
                  ref={addToImageRefs}
                  onClick={() => {
                    console.log(project);
                    const updatedProject = project
                      .replace(/^\/[^/]+\//, "")
                      .replace(/\.jpg$/, ".webp");
                    console.log(updatedProject);

                    const matchingProject = findProjectByImage(project);
                    setFocusedProject(matchingProject);
                    setOpenDetails(true);
                  }}
                  onMouseEnter={() => {
                    setHovered(true);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHovered(false);
                    setHoveredIndex(null);
                  }}
                  className="w-3/12 sm:w-1/12 cursor-pointer invisible max-w-20 max-h-24 overflow-hidden relative"
                >
                  <Image
                    style={{
                      opacity: hoveredIndex === index ? 0.5 : 1,
                      transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    // ${
                    //   hoveredIndex !== null && hoveredIndex !== index
                    //     ? "opacity-30"
                    //     : ""
                    // }
                    src={project}
                    height={700}
                    width={500}
                    alt={project}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Inner>
  );
}
