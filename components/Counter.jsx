import { useEffect, useState } from "react";

export default function Counter() {
  const cumulativeSteps = [
    0, 7, 15, 21, 30, 38, 45, 55, 63, 73, 74, 80, 86, 91, 98, 99, 100,
  ]; // Predefined sequence
  const interval = 100; // 0.1 seconds
  const [index, setIndex] = useState(0); // Track the current index in the sequence

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Stop at the last index of cumulativeSteps
        if (nextIndex >= cumulativeSteps.length) {
          clearInterval(timer);
          return prevIndex; // Keep the index the same to stop at the last value
        }
        return nextIndex;
      });
    }, interval);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return <div>{cumulativeSteps[index]}</div>;
}
