import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/config/db.js";
import authRouter from "./src/router/auth.routes.js";
import quizRouter from "./src/router/quiz.routes.js";
import questionRouter from "./src/router/question.routes.js";
import attemptRouter from "./src/router/quizattempt.routes.js";
import { connectWebSocket } from "./src/config/webstocket.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.Frontend_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/question", questionRouter);
app.use("/api/quizattempt", attemptRouter);
app.get("/", (req, res) => {
  return res.json({
    message: "Server is Started",
  });
});
const server = http.createServer(app);
connectWebSocket(server);
server.listen(process.env.PORT, () => {
  console.log(`Server running http://localhost:${process.env.PORT}`);
  connectDB();
});
