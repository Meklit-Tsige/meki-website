// // utils.js

export function splitParagraphByCharacterLength(paragraph, targetLength = 45) {
  const words = paragraph.split(" ");
  const phrases = [];
  let currentPhrase = [];
  let currentLength = 0;

  words.forEach((word) => {
    // Add the word and its following space to the current length
    const wordLength = word.length + 1; // Adding 1 for the space

    // If adding this word exceeds the target length, finalize the current phrase
    if (currentLength + wordLength > targetLength && currentPhrase.length > 0) {
      phrases.push(currentPhrase.join(" "));
      currentPhrase = [];
      currentLength = 0;
    }

    // Add the word to the current phrase
    currentPhrase.push(word);
    currentLength += wordLength;
  });

  // Add the last phrase if there's any leftover
  if (currentPhrase.length > 0) {
    phrases.push(currentPhrase.join(" "));
  }

  return phrases;
}

export async function generateBlurPlaceholder(src) {
  try {
    // Fetch the image from the public folder
    const response = await fetch(src);

    // Ensure the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the file as a buffer
    const buffer = await response.arrayBuffer();

    // Generate the placeholder
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    console.log("base64", base64);

    return base64;
  } catch (err) {
    console.error("Error generating blur placeholder:", err);
    throw new Error("Failed to generate blur placeholder.");
  }
}

// import fs from "node:fs/promises";
// import { getPlaiceholder } from "plaiceholder";

// /**
//  * Generates a base64 blur placeholder for a given image.
//  * @param {string} src - The path to the image (relative to the public folder, e.g., "./public/images/picture.jpg").
//  * @returns {Promise<string>} - The base64 string of the blur placeholder.
//  */
// export async function generateBlurPlaceholder(src) {
//   try {
//     // Read the file directly
//     const file = await fs.readFile(src);
//     const { base64 } = await getPlaiceholder(file);

//     return base64;
//   } catch (err) {
//     console.error("Error generating blur placeholder:", err);
//     throw new Error("Failed to generate blur placeholder.");
//   }
// }
