"use client";
import { data } from "@/app/data";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="flex fixed overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data.map((card, index) => {
            return (
              <motion.div key={index} className="relative shrink-0">
                <Image
                  src={card.src}
                  height={700}
                  width={500}
                  alt={card.src}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
