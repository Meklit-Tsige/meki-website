// // utils.js
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
