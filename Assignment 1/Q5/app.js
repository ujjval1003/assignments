const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

function compressFolder(folderPath, zipFilePath) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.error("The specified folder does not exist.");
      return;
    }

    const zip = new AdmZip();

    zip.addLocalFolder(folderPath);

    zip.writeZip(zipFilePath);

    console.log(`Folder compressed successfully! ZIP file saved to: ${zipFilePath}`);
  } catch (error) {
    console.error("An error occurred while compressing the folder:", error.message);
  }
}

const folderPath = path.resolve("D:/Ujjval/sem-7 prac/Mern stack/Assignment 1/Q5");
const zipFilePath = path.resolve("upload/compressed_folder.zip");

compressFolder(folderPath, zipFilePath);