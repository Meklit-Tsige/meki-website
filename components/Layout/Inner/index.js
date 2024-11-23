import React from "react";
import { motion } from "framer-motion";
import { slide, perspective } from "./anim";

const anim = (variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

export default function Layout({ children }) {
  return (
    <div className="innerr bg-black">
      <motion.div
        style={{ zIndex: 12000 }}
        className="slidee h-screen w-full fixed left-0 top-0 bg-black"
        {...anim(slide)}
      />
      <motion.div className="origin-top" {...anim(perspective)}>{children}</motion.div>
    </div>
  );
}
