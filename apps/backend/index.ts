import express, { Router } from "express";
import { userRouter } from "./user/user";
import { opinionRouter } from "./opinion/opinions";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/user", userRouter);
app.use("/opinions", opinionRouter);

app.listen(process.env.PORT!, () => {
  console.log(`App running on ${process.env.PORT!}`)
});
