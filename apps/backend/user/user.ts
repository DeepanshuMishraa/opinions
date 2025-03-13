import { Router } from "express";
import { authType } from "types"
import { db } from "db"
import jwt from "jsonwebtoken"

export const userRouter = Router();


userRouter.post("/sign-in", async (req, res) => {
  try {
    const parsedBody = authType.safeParse(await req.body);
    if (!parsedBody.success) {
      res.status(501).json({
        message: "Invaild types"
      });
      return;
    }

    const { email, name } = parsedBody.data;

    const userExists = await db.user.findFirst({
      where: {
        email
      }
    });

    if (userExists) {
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h"
    })

    const user = await db.user.create({
      data: {
        email,
        name,
        token
      }
    })

    res.json({
      message: "User created",
      token: user.token
    })
  } catch (err) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})
