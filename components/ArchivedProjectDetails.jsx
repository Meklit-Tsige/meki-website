import Link from "next/link";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
export default function ProjectDetails({
  project,
  setOpenDetails,
  openDetails,
}) {
  console.log(project);

  // to prevent body from scrolling when a modal is open
  useEffect(() => {
    if (openDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openDetails]);
  // TODO: get actual proejct details

  const revealRefs = useRef([]);
  const imageRefs = useRef([]);
  const descriptionRefs = useRef(null);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };
  const addToRevealRefs = addToRefs(revealRefs);
  const addToImageRefs = addToRefs(imageRefs);

  const setInitialStates = () => {
    gsap.set(revealRefs.current, {
      yPercent: 100,
    });
    gsap.set(imageRefs.current, {
      yPercent: 100,
      opacity: 0,
    });
    gsap.set(descriptionRefs.current, {
      yPercent: 100,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({});

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
        imageRefs.current,
        {
          visibility: "visible",
        },
        "-=1"
      )
      .to(
        imageRefs.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.02,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        descriptionRefs.current,
        {
          visibility: "visible",
        },
        "-=1.5"
      )
      .to(
        descriptionRefs.current,
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
      style={{ zIndex: 10000 }}
      className="h-screen top-0 bg-black fixed w-full flex-col flex"
    >
      {/* Header */}
      <div
        style={{ zIndex: 10999, fontSize: "0.8rem" }}
        className="px-5 py-3 flex font-medium items-center uppercase w-full"
      >
        <div className="md:w-6/12 w-4/12 flex overflow-hidden">
          <div className="invisible" ref={addToRevealRefs}>
            <div className="text-nowrap">MEKLIT FEKADU</div>
          </div>
        </div>
        <div className="w-8/12 md:w-6/12 flex justify-between overflow-hidden">
          <div className="invisible" ref={addToRevealRefs}>
            <Link href={"/"} className={`underline`}></Link>
          </div>
          <div className="invisible" ref={addToRevealRefs}>
            <Link href={"/selected"} className={`headerLink`}></Link>
          </div>
          <div className="invisible" ref={addToRevealRefs}>
            <motion.div
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenDetails(false)}
              className="cursor-pointer"
            >
              <Cross1Icon />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="px-5 pb-4 mt-4 font-medium text-3xl md:text-4xl uppercase flex">
        <div className="overflow-hidden">
          <div className="invisible" ref={addToRevealRefs}>
            {/* TODO: get real projectName */}
            {project.projectName} About You
          </div>
        </div>
        <div className="overflow-hidden items-end flex">
          <div
            ref={addToRevealRefs}
            className="invisible text-lg pl-5 md:text-xl opacity-70"
          >
            {/* TODO: get real project Year and month */}
            OCT {project.year} 2024
          </div>
        </div>
      </div>
      <div className="h-full w-full flex">
        <div className="  overflow-hidden">
          <div className="flex px-5  overflow-y-hidden gap-5 noScrollBar">
            {/* TODO: change this to images for only this project */}
            {data.map((image, index) => (
              <div
                key={index}
                ref={addToImageRefs}
                className="invisible h-[60vh] md:h-[65vh] w-[80vw] md:w-[40vw] relative shrink-0 overflow-hidden"
              >
                <Image
                  src={image.src}
                  className="object-cover"
                  // TODO: change this to object-contain to make width variable but height fixed
                  fill
                  alt={image.src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="overflow-hidden">
          <div
            ref={descriptionRefs}
            className="px-5 pt-5 w-full h-full borderr invisible"
          >
            {/* TODO: get description:  */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            dolorem voluptatem voluptates totam distinctio nostrum? Eius dolore,
            dolores ipsa iure qui quibusdam impedit deserunt necessitatibus
            voluptatem facere delectus laboriosam soluta?
          </div>
        </div>
      </div>
    </div>
  );
}

////////
