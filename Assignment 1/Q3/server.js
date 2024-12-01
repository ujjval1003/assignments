const readline = require("readline");
const colors = require("colors");
const { responses, getResponse } = require("./chatbot");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(responses.greeting.green);

function startChat() {
  rl.question("You: ".cyan, (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("Chatbot: Goodbye! Have a nice day.".yellow);
      rl.close();
      return;
    }

    const reply = getResponse(userInput);
    console.log(`Chatbot: ${reply}`.magenta);
    startChat();
  });
}

startChat();