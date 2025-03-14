import express, { Router } from "express";
import { userRouter } from "./user/user";
import { opinionRouter } from "./opinion/opinions";

const app = express();
app.use(express.json());


app.use("/user", userRouter);
app.use("/opinions", opinionRouter);

app.listen(process.env.PORT!, () => {
  console.log(`App running on ${process.env.PORT!}`)
})
