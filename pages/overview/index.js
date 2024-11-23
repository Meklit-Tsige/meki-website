"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

import Inner from "../../components/Layout/Inner";
import ImagesHome from "@/components/ImagesHome";
import ProjectDetails from "../../components/ProjectDetails";
import Footer from "@/components/Footer";

export default function Home() {
  gsap.registerPlugin(useGSAP);

  const revealRefs = useRef([]);
  const headerRevealRefs = useRef([]);
  const rightHeaderRevealRefs = useRef([]);
  const rightMostHeaderRevealRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToHeaderRevealRefs = addToRefs(headerRevealRefs);
  const addToRightHeaderRevealRefs = addToRefs(rightHeaderRevealRefs);
  const addToRightMostHeaderRevealRefs = addToRefs(rightMostHeaderRevealRefs);
  const addToRevealRefs = addToRefs(revealRefs);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
    gsap.set(headerRevealRefs.current, {
      yPercent: 100,
    });
    gsap.set(rightHeaderRevealRefs.current, {
      yPercent: 100,
    });
    gsap.set(rightMostHeaderRevealRefs.current, {
      yPercent: 100,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {},
    });

    tl.to(revealRefs.current, {
      visibility: "visible",
      delay: 0.5,
    })
      .to(
        revealRefs.current,
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        [headerRevealRefs.current],
        {
          visibility: "visible",
        },
        "-=1"
      )
      .to(
        [rightHeaderRevealRefs.current],
        {
          visibility: "visible",
        },
        "<"
      )
      .to(
        [rightMostHeaderRevealRefs.current],
        {
          visibility: "visible",
        },
        "<"
      )
      .to(
        [headerRevealRefs.current],
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        [rightHeaderRevealRefs.current],
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        [rightMostHeaderRevealRefs.current],
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      );
  };

  useGSAP(() => {
    const master = gsap.timeline();
    master.add(setInitialStates).add(preloaderAnimation());
  }, []);

  const [openDetails, setOpenDetails] = useState(false);
  const [focusedProject, setFocusedProject] = useState(null);

  return (
    <Inner backgroundColor={"#B0AD98"}>
      {openDetails && (
        <ProjectDetails
          project={focusedProject}
          setOpenDetails={setOpenDetails}
        />
      )}
      <Footer />
      {/* <div
        style={{ zIndex: 9998 }}
        className="fixed w-full flex uppercase font-bold pt-2 pl-2"
      >
        <div className="w-8/12 sm:w-4/12 flex flex-col">
          <div className="overflow-hidden">
            <div className="invisible pl-3" ref={addToHeaderRevealRefs}>
              MEKLIT FEKADU
            </div>
          </div>
        </div>
        <div className="sm:w-4/12"></div>
        <div className="w-4/12 sm:w-4/12 flex flex-col sm:flex-row gap-2 text-[1.15vw] sm:leading-[1.43vw]">
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col headerLink w-fit">
              <div className="overflow-hidden ">
                <div className="invisible" ref={addToRightHeaderRevealRefs}>
                  Photographer
                </div>
              </div>
              <div className="overflow-hidden ">
                <div className="invisible" ref={addToRightHeaderRevealRefs}>
                  <a href="hhtps://instagram.com/">Prudentos Studios</a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <span className="w-fit">
              <div className="overflow-hidden ">
                <div className="invisible" ref={addToRightMostHeaderRevealRefs}>
                  <a
                    href={"https://www.instagram.com/meklit.fekadu/"}
                    target="_blank"
                    className="headerLink"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </span>
            <span className="w-fit">
              <div className="overflow-hidden">
                <div className="invisible" ref={addToRightMostHeaderRevealRefs}>
                  <a href={"mailto:hello@meklit.com"} className="headerLink">
                    EMAIL
                  </a>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div> */}
      <ImagesHome
        setFocusedProject={setFocusedProject}
        setOpenDetails={setOpenDetails}
      />
    </Inner>
  );
}
