import express, { urlencoded } from "express";
import { upload } from "./src/pdfupload.js";
import { createDocument } from "./src/controllers/document.controller.js";
import { ingestDocument } from "./src/ingestion.js";
import { storeChunks } from "./src/controllers/chunks.controller.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.post("/upload", upload.single(`doc`), async (req, res, next) => {
  try {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(8000, () => {
  console.log(`Listening on: 8000`);
});
