import { z } from "zod"


export const validateIdParam = (req, res, next) => {
  
  const idSchema = z.string().regex(/^\d+$/, "The Id must be a numeric string").transform(str => parseInt(str, 10))

  const validatedId = idSchema.safeParse(req.params.id)
  if (validatedId.success) {
    req.params.id = validatedId.data
    next()
  } else {
    const errorMessage = validatedId.error.issues.map(issue => issue.message).join(", ");
    const err = new Error(`Invalid Id: ${errorMessage}`);
    err.status = 400;
    next(err);
  }

}