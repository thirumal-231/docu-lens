import { getAuth, clerkClient } from "@clerk/express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const protect = catchAsync(async (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    return next(new AppError("You're not logged in. Please log in.", 401));
  }
  const user = await clerkClient.users.getUser(userId);
  req.user = user;
  next();
});
