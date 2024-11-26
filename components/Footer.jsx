"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function Footer() {
  const pathname = usePathname();

  const revealRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };
  const addToRevealRefs = addToRefs(revealRefs);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({});

    tl.to(revealRefs.current, {
      visibility: "visible",
    }).to(
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

  useGSAP(() => {
    const master = gsap.timeline();
    master.add(setInitialStates).add(preloaderAnimation());
  }, []);

  return (
    <div
      style={{ zIndex: 9999, fontSize: "0.8rem" }}
      className={`fixed top-0 px-5 py-3 flex font-medium items-center uppercase w-full`}
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
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "underline" : "headerLink"
            } hidden md:block`}
          >
            Overview
          </Link>
        </div>
        <div className="invisible" ref={addToRevealRefs}>
          <Link
            href={"/selected"}
            className={`${
              pathname === "/selected" ? "underline" : "headerLink"
            }`}
          >
            Selected
          </Link>
        </div>
        <div className="invisible" ref={addToRevealRefs}>
          <Link
            href={"/about"}
            className={`${pathname === "/about" ? "underline" : "headerLink"}`}
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
