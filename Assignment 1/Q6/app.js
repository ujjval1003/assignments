const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

/**
 * Extracts a ZIP file to a specified destination folder.
 * @param {string} zipFilePath - Path to the ZIP file to extract.
 * @param {string} extractToPath - Destination folder where files will be extracted.
 */
function extractZip(zipFilePath, extractToPath) {
  try {
    if (!fs.existsSync(zipFilePath)) {
      console.error("The specified ZIP file does not exist.");
      return;
    }

    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(extractToPath)) {
      fs.mkdirSync(extractToPath, { recursive: true });
    }

    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(extractToPath, true);

    console.log(`ZIP file extracted successfully to: ${extractToPath}`);
  } catch (error) {
    console.error("An error occurred while extracting the ZIP file:", error.message);
  }
}

// Example usage
const zipFilePath = path.resolve("D:/Ujjval/sem-7 prac/Mern stack/Assignment 1/Q5/upload/compressed_folder.zip"); // Replace with your ZIP file path
const extractToPath = path.resolve("upload"); // Replace with desired extraction folder path

extractZip(zipFilePath, extractToPath);