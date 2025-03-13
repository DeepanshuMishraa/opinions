import z from "zod";


export const authType = z.object({
  email:z.string().email(),
  name:z.string().min(2)
})
