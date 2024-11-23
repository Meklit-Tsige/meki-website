// "use client";
// import { data } from "../data";
// import { motion } from "framer-motion";
// import { Cross1Icon } from "@radix-ui/react-icons";
// import Image from "next/image";
// import Inner from "../../components/Layout/Inner";
// import { useRouter } from "next/router";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";
// import Footer from "@/components/Footer";
// import Link from "next/link";

// // export default function Page() {
// //   const router = useRouter()
// //   return <p>Post: {router.query.slug}</p>
// // }
// //

// export default function page({ params }) {


//   const router = useRouter();
//   //   const projectName = router.query.project;
//   const projectName = "ProjectAlpha";

//   const projectDetails = projectName
//     ? data.find((project) => project.projectName === projectName)
//     : null;

//   console.log("proje details: ", projectDetails);

//   const revealRefs = useRef([]);
//   const imageRefs = useRef([]);
//   const headerRevealRefs = useRef([]);
//   const rightHeaderRevealRefs = useRef([]);
//   const rightMostHeaderRevealRefs = useRef([]);

//   const addToRefs = (refsArray) => (el) => {
//     if (el && !refsArray.current.includes(el)) {
//       refsArray.current.push(el);
//     }
//   };
//   const addToHeaderRevealRefs = addToRefs(headerRevealRefs);
//   const addToRightHeaderRevealRefs = addToRefs(rightHeaderRevealRefs);
//   const addToRightMostHeaderRevealRefs = addToRefs(rightMostHeaderRevealRefs);
//   const addToRevealRefs = addToRefs(revealRefs);
//   const addToImageRefs = addToRefs(imageRefs);

//   const setInitialStates = () => {
//     gsap.set(revealRefs.current, {
//       yPercent: 100,
//     });
//     gsap.set(imageRefs.current, {
//       yPercent: 100,
//       opacity: 0,
//     });
//     gsap.set(headerRevealRefs.current, {
//       yPercent: 100,
//     });
//     gsap.set(rightHeaderRevealRefs.current, {
//       yPercent: 100,
//     });
//     gsap.set(rightMostHeaderRevealRefs.current, {
//       yPercent: 100,
//     });
//   };

//   const preloaderAnimation = () => {
//     const tl = gsap.timeline({});

//     tl.to(revealRefs.current, {
//       visibility: "visible",
//     })
//       .to(
//         revealRefs.current,
//         {
//           yPercent: 0,
//           duration: 1,
//           stagger: 0.05,
//           ease: "power2.out",
//         },
//         "<"
//       )
//       .to(
//         headerRevealRefs.current,
//         {
//           visibility: "visible",
//         },
//         "<"
//       )
//       .to(
//         headerRevealRefs.current,
//         {
//           yPercent: 0,
//           duration: 1,
//           stagger: 0.05,
//           ease: "power2.out",
//         },
//         "<"
//       )
//       .to(
//         rightHeaderRevealRefs.current,
//         {
//           visibility: "visible",
//         },
//         "<"
//       )
//       .to(
//         rightHeaderRevealRefs.current,
//         {
//           yPercent: 0,
//           duration: 1,
//           stagger: 0.05,
//           ease: "power2.out",
//         },
//         "<"
//       )
//       .to(
//         rightMostHeaderRevealRefs.current,
//         {
//           visibility: "visible",
//         },
//         "<"
//       )
//       .to(
//         rightMostHeaderRevealRefs.current,
//         {
//           yPercent: 0,
//           duration: 1,
//           stagger: 0.05,
//           ease: "power2.out",
//         },
//         "<"
//       )
//       .to(
//         imageRefs.current,
//         {
//           visibility: "visible",
//         },
//         "-=1"
//       )
//       .to(
//         imageRefs.current,
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 1.5,
//           stagger: 0.02,
//           ease: "power3.out",
//         },
//         "<"
//       );
//   };

//   useGSAP(() => {
//     const master = gsap.timeline();
//     master.add(setInitialStates).add(preloaderAnimation());
//   }, []);

//   //   if (!projectDetails) {
//   //     // You can return a loading state or null if projectDetails is not yet defined
//   //     return <div className="text-black">Loading...</div>;
//   //   }

//   return (
//     <>
//       <div
//         style={{ zIndex: 9999, fontSize: "0.8rem" }}
//         className="px-5 py-3 flex font-medium items-center uppercase w-full fixed top-0"
//       >
//         <div className="md:w-6/12 w-4/12 flex overflow-hidden">
//           <div className="invisible" ref={addToRevealRefs}>
//             <div className="text-nowrap"></div>
//           </div>
//         </div>
//         <div className="w-8/12 md:w-6/12 flex justify-between overflow-hidden">
//           <div className="invisible" ref={addToRevealRefs}>
//             <Link href={"/"} className={`underline`}>
//               Overview
//             </Link>
//           </div>
//           <div className="invisible" ref={addToRevealRefs}>
//             <Link href={"/selected"} className={`headerLink`}>
//               Selected
//             </Link>
//           </div>
//           <div className="invisible" ref={addToRevealRefs}>
//             <motion.div
//               whileHover={{ rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setOpenDetails(false)}
//               className="cursor-pointer"
//             >
//               <Cross1Icon />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//       <div className="px-5 pb-4 mt-20 font-medium text-3xl md:text-4xl uppercase flex">
//         <div>{projectDetails.projectName} About YOu</div>
//         <div className="text-lg pl-5 md:text-xl items-end flex ">
//           October {projectDetails.year}
//         </div>
//       </div>
//       <div className="h-full w-full flex">
//         <div className="  overflow-hidden">
//           <div className="flex px-5  overflow-y-hidden gap-5 noScrollBar">
//             {data.map((image, index) => (
//               <div
//                 key={index}
//                 ref={addToImageRefs}
//                 className="invisible h-[60vh] md:h-[70vh] w-[80vw] md:w-[40vw] relative shrink-0 overflow-hidden"
//               >
//                 <Image
//                   src={image.src}
//                   className="object-cover"
//                   fill
//                   alt={image.src}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
