const fs = require("fs");
const util = require("util");

const unlinkAsync = util.promisify(fs.unlink);

async function deleteFile(filePath) {
  try {
    await unlinkAsync(filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File not found: ${filePath}`);
    } else {
      console.error(`Error deleting file: ${error.message}`);
    }
  }
}

const filePath = "test.txt";

deleteFile(filePath);