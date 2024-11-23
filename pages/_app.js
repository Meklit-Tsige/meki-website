import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import Lenis from "lenis";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  

  return (
    <div className="parent">
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}
