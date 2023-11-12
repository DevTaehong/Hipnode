import * as z from "zod";

export const postFormValidationSchema = z.object({
  heading: z.string().min(1, {
    message: "Name is required",
  }),
  mainText: z.string().min(1, { message: "Main Text is required" }),
  coverImage: z.any(),
  group: z.string().min(1, { message: "Select Group is required" }),
  post: z.string().min(1, { message: "Select Post is required" }),
  tags: z.array(z.string().min(1).max(10)).min(1).max(5),
});
