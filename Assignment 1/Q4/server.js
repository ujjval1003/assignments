const WebSocket = require("ws");
const { getResponse } = require("./chatbot");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.on("message", (message) => {
    console.log(`Client: ${message}`);
    const response = getResponse(message);
    ws.send(response);
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});