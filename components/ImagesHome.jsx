import React, { useRef, useState } from "react";
import Image from "next/image";
import { data } from "./data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
export default function ImagesHome({ setFocusedProject, setOpenDetails }) {
  const [currentProject, setCurrentProject] = useState(0);

  function handleLeftClick() {
    if (currentProject === 0) {
      setCurrentProject(data.length - 1);
    } else {
      setCurrentProject(currentProject - 1);
    }
  }

  function handleRightClick() {
    if (currentProject === data.length - 1) {
      setCurrentProject(0);
    } else {
      setCurrentProject(currentProject + 1);
    }
  }

  const bottomImageRef = useRef(null);
  const imageMaskRef = useRef(null);

  const setInitialStates = () => {
    gsap.set(bottomImageRef.current, {
      yPercent: 105,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({});

    tl.to(
      bottomImageRef.current,
      {
        yPercent: 0,
        duration: 1.4,
        ease: "power4.out",
      },
      "<"
    ).to(
      imageMaskRef.current,
      {
        scaleY: 0,
        duration: 1.1,
        ease: "power4.out",
      },
      "<0.2"
    );
  };

  useGSAP(() => {
    const master = gsap.timeline();
    master.add(setInitialStates).add(preloaderAnimation());
  }, []);

 
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="h-[70vh] w-[70vw] relative" ref={bottomImageRef}>
        <div
          style={{ zIndex: 10 }}
          ref={imageMaskRef}
          className="w-full h-full absolute origin-top bg-black"
        ></div>
        <Image
          src={data[currentProject].src}
          alt="image"
          fill
          className="object-contain"
        />
      </div>

      <div style={{ zIndex: 1 }} className="w-full h-full flex absolute">
        <div
          onClick={() => handleLeftClick()}
          className="arrowCursorLeft w-1/2 h-full "
        ></div>
        <div
          onClick={() => handleRightClick()}
          className="arrowCursorRight w-1/2 h-full "
        ></div>
      </div>
      <div
        style={{ zIndex: 10000, fontSize: "0.8rem" }}
        className="bg-transparent font-bold pl-2 flex items-center h-6 uppercase w-1/2 fixed left-0 bottom-0"
      >
        <div className="hidden sm:block font-normal sm:w-3/4 text-nowrap">
          <div>
            {data[currentProject].projectName}, Creative Direction & Branding
          </div>
        </div>
        <div className="w-1/4">
          {/* <div
            className="headerLink text-nowrap"
            onClick={() => {
              setFocusedProject(data[currentProject]);
              setOpenDetails(true);
            }}
          >
            See Project
          </div> */}
          <Link
            href={`/${data[currentProject].projectName}`}
            className={`headerLink text-nowrap`}
          >
            See Full Project
          </Link>
        </div>
      </div>
    </div>
  );
}
