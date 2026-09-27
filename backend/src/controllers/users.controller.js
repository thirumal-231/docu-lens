import { clerkClient } from "@clerk/express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { supabaseClient } from "../embedding.js";

export const syncUsers = catchAsync(async (req, res, next) => {
  const email = req.user.emailAddresses[0].emailAddress;
  const clerkId = req.user.id;

  // check if user exists in supabase
  const { data: foundUserData, error: foundUserError } = await supabaseClient
    .from("users")
    .select()
    .eq("clerk_user_id", clerkId);

  if (foundUserError) {
    return next(new AppError(`Finding user error: ${foundUserError}`, 500));
  }

  // insert in DB
  if (!foundUserData || foundUserData.length === 0) {
    const { data: createdUser, error: userCreationError } = await supabaseClient
      .from("users")
      .insert({ email, clerk_user_id: clerkId })
      .select();

    if (userCreationError) {
      return next(new AppError(`User not created: ${userCreationError}`, 500));
    }
    console.log("Created User", createdUser);

    return res.status(200).json({
      message: "Authenticated.",
      clerkUserId: clerkId,
      user: createdUser,
    });
  }
  console.log("Found user", foundUserData);
  return res.status(200).json({
    message: "Authenticated.",
    clerkUserId: clerkId,
    user: foundUserData[0],
  });
});
