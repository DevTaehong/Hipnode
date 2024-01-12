import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { shuffle } from "@/utils";
import { FollowRelationsTypes } from "@/types";

export async function createFollowings(users: User[]) {
  const numberOfFollows = 10;
  const followRelations: FollowRelationsTypes[] = [];

  for (const user of users) {
    const otherUsers = users.filter((u) => u.id !== user.id);
    shuffle(otherUsers);

    const usersToFollow = otherUsers.slice(0, numberOfFollows);

    usersToFollow.forEach((randomUser) => {
      followRelations.push({
        followerId: user.id,
        followedId: randomUser.id,
      });
    });
  }

  const followCreationPromises = followRelations.map((relation) =>
    prisma.follower.create({
      data: relation,
    })
  );

  await prisma.$transaction(followCreationPromises);
}
