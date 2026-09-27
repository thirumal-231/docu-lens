import express, { Router } from "express";
import { syncUsers } from "../controllers/users.controller.js";
import { protect } from "../middlewares/protect.middleware.js";

export const userRouter = express.Router();

userRouter.use(protect);

userRouter.post("/sync", syncUsers);
