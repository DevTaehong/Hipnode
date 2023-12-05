import * as z from "zod";

export const postFormValidationSchema = z.object({
  heading: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, { message: "Required" }),
  image: z.any(),
  group: z.string().min(1, { message: "Required" }),
  contentType: z.string().min(1, { message: "Required" }),
  tags: z.array(z.string().min(1).max(10)).min(1).max(5),
});
