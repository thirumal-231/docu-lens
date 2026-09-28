import { readPDF } from "./readpdf.js";
import { createChunks } from "./chunker.js";

export const ingestDocument = async (path) => {
  const pages = await readPDF(path);
  const chunks = await createChunks(pages);
  return chunks;
};
