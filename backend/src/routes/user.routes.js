import express from "express";
import { syncUsers } from "../controllers/users.controller.js";

export const userRouter = express.Router();

userRouter.post("/sync", syncUsers);
