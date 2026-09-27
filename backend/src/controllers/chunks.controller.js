import { embeddings, supabaseClient } from "../embedding.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const storeChunks = catchAsync(async (chunks, documentId) => {
  const rows = [];

  for (const chunk of chunks) {
    const embedding = await embeddings.embedQuery(chunk.pageContent);

    rows.push({
      document_id: documentId,
      content: chunk.pageContent,
      page_number: chunk.metadata.pageNumber,
      embedding,
    });
  }
  const { data, error } = await supabaseClient.from("chunks").insert(rows);
  if (error) {
    throw new AppError(`Supabase error: ${error.message}`, 500);
  }
  return data;
});
