import express, { Router } from "express";
import { protect } from "../middlewares/protect.middleware.js";
import { getAllDocuments } from "../controllers/document.controller.js";

export const documentRouter = express.Router();

documentRouter.use(protect);

documentRouter.get("/", getAllDocuments);
