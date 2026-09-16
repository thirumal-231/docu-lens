import { PDFParse } from "pdf-parse";

export const readPDF = async (url) => {
  const parser = new PDFParse({ url: `./uploads/${url}` });
  const result = await parser.getText();

  const pagesContent = [
    ...result.pages.map((pageContent) => ({
      text: pageContent.text,
      pageNumber: pageContent.num,
    })),
  ];
  //   console.log(pagesContent);
  return pagesContent;
};
