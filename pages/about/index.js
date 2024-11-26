"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Inner from "../../components/Layout/Inner";
import Footer from "@/components/Footer";
import ImageMouseGallery from "@/components/ImageGalleryMouse/ImageMouseGallery";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
export default function About() {
  gsap.registerPlugin(useGSAP);

  const revealRefs = useRef([]);
  const headerRevealRefs = useRef([]);
  const rightMostHeaderRevealRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToHeaderRevealRefs = addToRefs(headerRevealRefs);
  const addToRightMostHeaderRevealRefs = addToRefs(rightMostHeaderRevealRefs);
  const addToRevealRefs = addToRefs(revealRefs);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
    gsap.set(headerRevealRefs.current, {
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

  return (
    <Inner backgroundColor={"#B0AD98"}>
      <CustomCursor hovered={false} />
      <Footer />
      {/* <ImageMouseGallery>
        <div
          style={{
            zIndex: 10000,
            pointerEvents: "none",
          }}
          className="absolute flex flex-col justify-center items-center"
        >
          <div
            style={{ fontSize: "7vw", lineHeight: "7vw" }}
            className="text-7xl font-medium flex flex-col uppercase tracking-wide text-center"
          >
            <div className="overflow-hidden">
              <div className="overflow-hidden ">
                <div className="invisible" ref={addToRevealRefs}>
                  Meklit Fekadu
                </div>
              </div>
              <div className="invisible" ref={addToRevealRefs}>
                Photographer
              </div>
            </div>

            <div className="overflow-hidden ">
              <div className="invisible" ref={addToRevealRefs}>
                C.2025
              </div>
            </div>
          </div>
        </div>
      </ImageMouseGallery> */}
      <div
        style={{
          zIndex: 10,
        }}
        className="h-screen absolute  inset-0 w-full flex justify-between items-center"
      >
        <div className="px-12 h-[80vh] flex">
          <div className="w-5/12 mb-[30vh] mr-4 relative overflow-hidden" ref={addToRevealRefs}>
            <Image
              src={"/hugh/IMG_9254.webp"}
              alt="biopic"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-7/12 font-bold pl-4 flex items-end overflow-hidden">
            <div ref={addToRevealRefs} className=" font-bold flex items-end">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. <br /> Lorem Ipsum
              comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32. The
              standard chunk of Lorem Ipsum used since the 1500s is reproduced
              below for those interested. Sections 1.10.32 and 1.10.33 from "de
              Finibus Bonorum et Malorum" by Cicero are also reproduced in their
              exact original form, accompanied by English versions from the 1914
              translation by H. Rackham.
            </div>
          </div>

          {/* <div className="text-[10vw] borderr leading-[10vw] md:text-[7vw] md:leading-[7vw] font-medium flex flex-col uppercase tracking-wide text-center">
            <div className="overflow-hidden">
              <div className="overflow-hidden">
                <div
                  className="invisible selection:bg-white selection:text-black"
                  ref={addToRevealRefs}
                >
                  Meklit Fekadu
                </div>
              </div>
              <div
                className="invisible selection:bg-white selection:text-black"
                ref={addToRevealRefs}
              >
                Photographer
              </div>
            </div>
            <div className="overflow-hidden ">
              <div
                className="invisible selection:bg-white selection:text-black"
                ref={addToRevealRefs}
              >
                C.2025
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div
        style={{ zIndex: 9999, fontSize: "0.8rem" }}
        className="fixed bottom-0 w-full flex uppercase pb-2 px-5"
      >
        <div className="w-6/12 sm:w-8/12 flex flex-col justify-end">
          <div className="overflow-hidden ">
            <div className="invisible" ref={addToHeaderRevealRefs}>
              <a
                href="mailto:meklit-tsige@outlook.de"
                className="headerLink"
                ref={addToHeaderRevealRefs}
              >
                meklit-tsige@outlook.de
              </a>
            </div>
          </div>
        </div>
        <div className="w-6/12 sm:w-4/12 flex gap-2">
          <div className="w-1/2 flex justify-end flex-col">
            <div className="overflow-hidden flex justify-end">
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
          </div>
          <div className="w-1/2 flex justify-end flex-col">
            <div className="overflow-hidden flex justify-end">
              <div className="invisible" ref={addToRightMostHeaderRevealRefs}>
                <a
                  href={"https://www.vogue.com/photovogue/photographers/356363"}
                  target="_blank"
                  className="headerLink"
                >
                  Vogue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Inner>
  );
}
