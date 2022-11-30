import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./src/routers/index.js";
import connectDb from "./src/utils/db.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use(router);

app.listen(port, (req, res) => {
  console.log(`server is listening at port ${process.env.PORT}`);
});
