/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import path from "path";
import errorMiddleware from "./middlewares/errorMiddleware";
import BaseRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", BaseRouter);
app.use(errorMiddleware)

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path.join(__dirname, "static");
app.use(express.static(staticDir));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    "index.html", {
    root: viewsDir
  }
  );
});

export default app;