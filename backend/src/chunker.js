import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const createChunks = async (pages, url) => {
  const docs = pages.map(
    (page) =>
      new Document({
        pageContent: page.text,
        metadata: {
          source: url,
          pageNumber: page.pageNumber,
          uploadedAt: Date.now(),
        },
      }),
  );

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitDocuments(docs);
  return chunks;
};
