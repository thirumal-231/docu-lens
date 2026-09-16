import multer from "multer";
import path from "node:path";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf format allowed."), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.file);
    cb(null, "./uploads");
  },
  filename: function (res, file, cb) {
    const suffix = Date.now();
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const timeStamp = Date.now();
    const fullFileName = `${baseName}-${timeStamp}${extension}`;
    cb(null, file.originalname);

    // const pageContent = await readPDF(file.originalname);
    // const chunks = await createChunks(pageContent, file.originalname);
    // console.log("___chunks___\n", chunks);
  },
});

export const upload = multer({ storage: storage, fileFilter: fileFilter });
