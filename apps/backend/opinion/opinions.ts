import { Router } from "express"
import type { Request, Response, NextFunction } from "express"
import { userMiddleware } from "../middleware";
import { db } from "db";

export const opinionRouter = Router();

// @ts-ignore
opinionRouter.get("/all", userMiddleware, async (req: Request, res: Response) => {
  const opinions = await db.opinions.findMany({
    select: {
      id: true,
      opinion: true,
      user: {
        select: {
          name: true,
        },
      },
      upvotes: true,
      downvotes: true
    }
  });

  if (!opinions) {
    return res.status(404).json({
      message: "No opinions found."
    })
  }

  res.json(opinions);
});


// @ts-ignore
opinionRouter.post("/create", userMiddleware, async (req: Request, res: Response) => {
  const { opinion } = req.body;
  const user = await db.user.findUnique({
    where: { email: (req as any).email }
  });
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const newOpinion = await db.opinions.create({
    data: {
      opinion,
      userId: user.id,
      upvotes: 0,
      downvotes: 0
    }
  });

  return res.status(201).json(newOpinion);
});


// @ts-ignore
opinionRouter.put("/:id/upvote", userMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const opinion = await db.opinions.findUnique({
    where: { id }
  });
  if (!opinion) {
    return res.status(404).json({ message: "Opinion not found" });
  }

  await db.opinions.update({
    where: { id },
    data: { upvotes: opinion.upvotes + 1 }
  });

  return res.status(200).json({ message: "Upvoted" });
})


// @ts-ignore
opinionRouter.put("/:id/downvote", userMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const opinion = await db.opinions.findUnique({
    where: { id }
  });
  if (!opinion) {
    return res.status(404).json({ message: "Opinion not found" });
  }

  await db.opinions.update({
    where: { id },
    data: { downvotes: opinion.downvotes + 1 }
  });

  return res.status(200).json({ message: "Downvoted" });
})
