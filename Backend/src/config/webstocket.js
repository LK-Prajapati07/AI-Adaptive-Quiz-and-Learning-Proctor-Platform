import { WebSocketServer } from "ws";
import { analyzeProctor } from "../services/proctor.service.js";

export const connectWebSocket = (server) => {
  const wss = new WebSocketServer({
    server,
  });
  wss.on("connection", (ws, req) => {
    console.log("New WebSocket Connection");
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        switch (data.type) {
          case "PROCTOR_FRAME": {
            console.log("Received Proctor Frame");
            const frameBuffer = Buffer.from(data.frame, "base64");
            const result = await analyzeProctor({
              userId: data.userId,
              attemptId: data.attemptId,
              frameBuffer,
            });

            ws.send(
              JSON.stringify({
                type: "PROCTOR_RESULT",
                data: result,
              }),
            );
            break;
          }
          case "SUBMIT_ANSWER": {
            console.log("Received Submit Answer");
            console.log(data);
            break;
          }
          default:
            console.log("Unknown event", data.type);
        }
      } catch (error) {
        console.log(error.message);
        ws.send(
          JSON.stringify({
            type: "ERROR",
            message: error.message,
          }),
        );
      }
    });

    ws.on("close", () => {
      console.log("WebSocket Closed");
    });
  });

  return wss;
};
