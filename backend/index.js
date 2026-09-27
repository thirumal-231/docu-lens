// index.js
import "dotenv/config.js";
import express, { urlencoded } from "express";
import { upload } from "./src/pdfupload.js";
import { uploadDocument } from "./src/controllers/document.controller.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { userRouter } from "./src/routes/user.routes.js";
import { globalErrorHandler } from "./src/controllers/error.controller.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.post("/test", (req, res) => {
  res.json({ message: "CORS Works!" });
});

app.use(clerkMiddleware());

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.post("/upload", upload.single(`doc`), uploadDocument);

app.use("/users", userRouter);

app.use(globalErrorHandler);

app.listen(8000, () => {
  console.log(`Listening on: 8000`);
});
