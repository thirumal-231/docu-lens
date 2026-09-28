import { supabaseClient } from "../embedding.js";
import { ingestDocument } from "../ingestion.js";
import { catchAsync } from "../utils/catchAsync.js";
import { storeChunks } from "./chunks.controller.js";

export const createDocument = async (name, userid) => {
  const { data, error } = await supabaseClient
    .from("documents")
    .insert({
      name: name,
      user_id: userid,
    })
    .select("document_id")
    .single();

  if (error) {
    console.error("Supabase error", error);
    throw error;
  }

  return data.document_id;
};

export const uploadDocument = catchAsync(async (req, res, next) => {
  const fileName = req.file.originalname;
  console.log(req.user);
  const { data: fetchedUserData, error: fetchedUserDataError } =
    await supabaseClient
      .from("users")
      .select()
      .eq("clerk_user_id", req.user.id)
      .single();
  const documentId = await createDocument(fileName, fetchedUserData.user_id);
  console.log("Doc ID: ", documentId);

  const chunks = await ingestDocument(fileName);

  await storeChunks(chunks, documentId);

  res.json({
    message: "Document processed successfully",
    documentId,
    chunks: chunks.length,
  });
});
