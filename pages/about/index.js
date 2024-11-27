"use client";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Inner from "../../components/Layout/Inner";
import Footer from "@/components/Footer";
import ImageMouseGallery from "@/components/ImageGalleryMouse/ImageMouseGallery";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import { splitParagraphByCharacterLength } from "@/utils/utils";
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
        "-=0.3"
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

  const bio =
    "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia, looked up one ofthe more obscure Latin words, consectetur, from a Lorem Ipsumpassage, and going through the cites of the word in classicalliterature, discovered the undoubtable source. <br /> Lorem Ipsumcomes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum etMalorum (The Extremes of Good and Evil) by Cicero, written in 45BC. This book is a treatise on the theory of ethics, very popularduring the Renaissance. The first line of Lorem Ipsum, Loremipsum dolor sit amet.. comes from a line in section 1.10.32. Thestandard chunk of Lorem Ipsum used since the 1500s is reproducedbelow for those interested. Sections 1.10.32 and 1.10.33 from deFinibus Bonorum et Malorum by Cicero are also reproduced in theirexact original form, accompanied by English versions from the 1914translation by H. Rackham.";
  const phrases = splitParagraphByCharacterLength(bio, 150);

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
            className="text-7xl font-semibold flex flex-col uppercase tracking-wide text-center"
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
        className="h-screen absolute md:overflow-hidden inset-0 w-full flex justify-between items-center"
      >
        <div className="h-[80vh] flex flex-col md:flex-row px-5">
          <div
            className="w-full h-[40vh] md:hidden flex relative overflow-hidden flex-shrink-0"
            ref={addToRevealRefs}
          >
            <Image
              src={"/meki.webp"}
              alt="biopic"
              fill
              className="object-cover"
            />
          </div>
          <div
            // style={{ fontSize: "0.85rem" }}
            className="w-full md:w-6/12 flex md:overflow-hidden"
          >
            <div
              ref={addToRevealRefs}
              className="flex flex-col pt-4 md:pt-0 w-12/12 justify-between"
            >
              <div className="flex flex-col">
                <div className="text-xl md:text-2xl font-bold mb-2 tracking-tighter">
                  MEKLIT FEKADU
                </div>
                <div className="w-full md:w-10/12 font-light text-sm">
                  Nice to meet you ♥ Im Meklit. I am a photographer based in
                  Berlin, Germany. In my advertising photography, I specialize
                  in people and fashion, bringing a free, natural approach to
                  visual storytelling. I love capturing honest moments and
                  letting the subjects lead the narrative. Beyond my
                  commissioned work, I pursue my passion for melancholic,
                  aesthetic art photography, focusing on BIPoC stories and
                  perspectives.
                  <br />
                  <br />
                  My greatest inspirations come from music, the people in my
                  life, and the rich, multifaceted culture of my native
                  Ethiopia. I pour my heart into my art, taking a stand with
                  every image I create. Feel free to reach out anytime!
                  <br />
                  Love, Meklit
                </div>
              </div>

              <div className="flex flex-col pt-4 md:pt-0 mb-12 md:mb-0">
                <div className="uppercase mb-4 text-xl md:text-2xl tracking-tighter font-bold">
                  Selected Clients
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img
                      src="/AALogos/Reebok_International_logo.svg"
                      alt="Logo"
                      width="75"
                    />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img src="/AALogos/Logo_Nike.svg" alt="Logo" width="75" />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img src="/AALogos/Mytheresa.svg" alt="Logo" width="75" />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img src="/AALogos/VOGUE_LOGO.svg" alt="Logo" width="75" />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 py-5 div-with-borders flex items-center">
                    <img
                      src="/AALogos/Telekom_Logo_2013_white.svg"
                      alt="Logo"
                      width="75"
                    />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img src="/AALogos/Puma-logo.svg" alt="Logo" width="75" />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img
                      src="/AALogos/Levi's_logo_(2011).svg"
                      alt="Logo"
                      width="75"
                    />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] sm:p-[16vw] md:p-4 div-with-borders flex items-center">
                    <img src="/AALogos/H&M-Logo.svg" alt="Logo" width="75" />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  <div className="p-[12vw] py-[16vw] sm:p-[16vw] sm:py-[18vw] md:p-4 md:py-7 div-with-borders flex items-center">
                    <img
                      src="/AALogos/About_You_logo.svg"
                      alt="Logo"
                      width="75"
                    />
                    <div className="border-left"></div>
                    <div className="border-right"></div>
                  </div>
                  {/* <div className="p-3 py-7 flex items-center div-with-borders">
                      Content
                      <div className="border-left"></div>
                      <div className="border-right"></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full md:w-6/12 hidden md:block relative overflow-hidden"
            ref={addToRevealRefs}
          >
            <Image
              src={"/meki.webp"}
              alt="biopic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        style={{ zIndex: 9999, fontSize: "0.8rem" }}
        className="fixed bottom-0 w-full flex uppercase pb-2 px-5"
      >
        <div className="w-6/12 flex flex-col justify-end">
          <div className="overflow-hidden ">
            <div
              className="invisible flex justify-between"
              ref={addToHeaderRevealRefs}
            >
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
        <div className="w-6/12 flex gap-2">
          <div className="w-4/12 hidden md:flex justify-end flex-col">
            <div className="overflow-hidden flex justify-start">
              <div className="invisible" ref={addToRightMostHeaderRevealRefs}>
                <a
                  href="https://www.malikkotb.com"
                  _target="_blank"
                  className=""
                  ref={addToHeaderRevealRefs}
                >
                  WEBSITE BY: MALIK
                </a>
              </div>
            </div>
          </div>
          <div className="w-6/12 md:w-4/12 flex justify-end flex-col">
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
          <div className="w-6/12 md:w-4/12 flex justify-end flex-col">
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
