import prisma from "../../../lib/prisma";

export async function createFollowings(users: any) {
  const numberOfFollows = 10;

  for (const user of users) {
    const otherUsers = users.filter((u: any) => u.id !== user.id);

    for (let i = 0; i < numberOfFollows; i++) {
      if (otherUsers.length === 0) break;

      const randomIndex = Math.floor(Math.random() * otherUsers.length);
      const randomUser = otherUsers[randomIndex];

      await prisma.follower.create({
        data: {
          followerId: user.id,
          followedId: randomUser.id,
        },
      });

      otherUsers.splice(randomIndex, 1);
    }
  }
}
