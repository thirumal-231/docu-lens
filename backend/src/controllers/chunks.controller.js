import { embeddings, supabaseClient } from "../embedding.js";

export const storeChunks = async (chunks, documentId) => {
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
    console.error("Supabase error", error);
    throw error;
  }
  return data;
};
