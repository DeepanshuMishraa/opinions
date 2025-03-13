import express, { Router } from "express";
import { userRouter } from "./user/user";

const app = express();
app.use(express.json());


app.use("/user", userRouter);


app.listen(process.env.PORT!, () => {
  console.log(`App running on ${process.env.PORT!}`)
})
