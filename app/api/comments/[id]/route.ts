import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const pathParts = req.url?.split("/") || [];
  const commentId =
    pathParts.length > 0 ? Number(pathParts[pathParts.length - 1]) : null;

  if (!commentId) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  try {
    await prisma.comment.deleteMany({ where: { parentId: commentId } });
    await prisma.comment.delete({ where: { id: commentId } });
    revalidatePath(`/posts/${commentId}`);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
}
