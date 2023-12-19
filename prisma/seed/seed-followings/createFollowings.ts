import prisma from "../../../lib/prisma";

export async function createFollowings(users: any) {
  for (const user of users) {
    const otherUsers = users.filter((u: any) => u.id !== user.id);

    const randomUser =
      otherUsers[Math.floor(Math.random() * otherUsers.length)];

    await prisma.follower.create({
      data: {
        followerId: user.id,
        followedId: randomUser.id,
      },
    });
  }
}
