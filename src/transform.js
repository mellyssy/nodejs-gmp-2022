import csv from "csvtojson";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";

pipeline(
  createReadStream(".csv/file.csv"),
  csv({
    headers: ["book", "author", "amount", "price"],
    colParser: {
      book: "string",
      author: "string",
      amount: "omit",
      price: "number",
    },
    checkType: true,
  }),
  createWriteStream("./dist/result.txt"),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
);
