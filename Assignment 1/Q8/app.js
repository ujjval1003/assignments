const fetch = require("node-fetch");

async function fetchGooglePage() {
  try {
    const response = await fetch("https://www.google.com");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();

    console.log("Fetched Google Homepage:");
    console.log(html.substring(0, 500));
  } catch (error) {
    console.error("An error occurred while fetching Google homepage:", error.message);
  }
}

fetchGooglePage();