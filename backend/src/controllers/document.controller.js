import { supabaseClient } from "../embedding.js";
import { catchAsync } from "../utils/catchAsync.js";

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
  const documentId = await createDocument(
    fileName,
    "597ee0dd-8f8b-4433-8d44-1010e538a7e5",
  );
  console.log("Doc ID: ", documentId);

  const chunks = await ingestDocument(fileName);

  await storeChunks(chunks, documentId);

  res.json({
    message: "Document processed successfully",
    documentId,
    chunks: chunks.length,
  });
});
