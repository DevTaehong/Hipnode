export async function deleteCommentOrReply(id: number): Promise<void> {
  console.log(id);
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the comment");
  }
}
