import { Router } from "express";
import { authType } from "types"
import { db } from "db"
import jwt from "jsonwebtoken"
import { userMiddleware } from "../middleware";

export const userRouter = Router();

userRouter.post("/sign-in", async (req, res) => {
  try {
    const parsedBody = authType.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid input data"
      });

      return;
    }

    const { email, name } = parsedBody.data;

    const userExists = await db.user.findFirst({
      where: { email }
    });

    let user = userExists;
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    if (!userExists) {
      user = await db.user.create({
        data: {
          email,
          name,
          token
        }
      });
    } else {
      user = await db.user.update({
        where: { id: userExists.id },
        data: { token }
      });
    }

    res.json({
      message: userExists ? "Signed in successfully" : "User created successfully",
      user: {
        email: user.email,
        name: user.name
      },
      token: token
    });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});


//@ts-ignore
userRouter.get("/me", userMiddleware, async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { email: req.email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.json({
      user
    });
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({
    message: "Logged out successfully"
  });
});
