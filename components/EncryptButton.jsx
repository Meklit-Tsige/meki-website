import React, { useState, useEffect } from "react";

const ShuffleButton = ({ text }) => {
  const [shuffledText, setShuffledText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const velocity = 200;

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle text function
  const shuffleText = (originalText) => {
    let textArray = originalText.split("");
    let currentIndex = 0;

    const repeatShuffle = (times) => {
      if (currentIndex === times) {
        setShuffledText(originalText);
        return;
      }

      setTimeout(() => {
        let shuffledArray = shuffleArray(textArray);
        for (let i = 0; i < currentIndex; i++) {
          shuffledArray[i] = originalText[i];
        }
        setShuffledText(shuffledArray.join(""));
        currentIndex++;
        repeatShuffle(times);
      }, velocity);
    };

    repeatShuffle(3);
  };

  // Handle hover
  useEffect(() => {
    if (isHovering) {
      shuffleText(text);
    }
  }, [isHovering, text]);

  return (
    <button
      className="uppercase"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {shuffledText}
    </button>
  );
};

export default ShuffleButton;