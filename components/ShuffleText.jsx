import React, { useEffect, useState } from "react";

const ShuffleText = () => {
  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // The function that shuffles the text on hover
  const shuffleTextEffect = (element, originalText, velocity) => {
    const elementTextArray = originalText.split("");
    let randomText = [];
    let index = 0;

    const repeatShuffle = () => {
      if (index === originalText.length) {
        element.innerText = originalText; // Restore original text
        return;
      }

      setTimeout(() => {
        randomText = shuffleArray([...elementTextArray]);
        for (let i = 0; i < index; i++) {
          randomText[i] = originalText[i];
        }
        element.innerText = randomText.join("");
        index++;
        // repeatShuffle();
      }, velocity);
    };

    repeatShuffle();
  };

  // UseEffect to initialize the event listeners
  useEffect(() => {
    const velocity = 70; // Effect velocity in ms
    const shuffleElements = document.querySelectorAll(".shuffle");

    shuffleElements.forEach((element) => {
      const originalText = element.innerText;
      element.setAttribute("data-text", originalText);

      const handleMouseEnter = () => {
        shuffleTextEffect(element, originalText, velocity);
      };

      element.addEventListener("mouseenter", handleMouseEnter);

      // Cleanup event listeners on unmount
      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
      };
    });
  }, []);

  return (
    <nav>
      <ul className="flex">
        <li className="mr-12 last:mr-0">
          <a className=" uppercase tracking-wider" href="#">
            shuffle
          </a>
        </li>
        <li className="mr-12 last:mr-0">
          <a className=" uppercase tracking-wider" href="#">
            texts
          </a>
        </li>
        <li className="mr-12 last:mr-0">
          <a className=" uppercase tracking-wider" href="#">
            MEKLIT FEKADU
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ShuffleText;
