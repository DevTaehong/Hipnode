import { faker } from "@faker-js/faker";
import { User, Group } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function createMemberships(users: User[], groups: Group[]) {
  const membershipPromises = [];

  for (const user of users) {
    for (const group of groups) {
      if (Math.random() > 0.5) {
        try {
          const existingMembership = await prisma.membership.findUnique({
            where: {
              userId_groupId: {
                userId: user.id,
                groupId: group.id,
              },
            },
          });

          if (!existingMembership) {
            membershipPromises.push(
              prisma.membership.create({
                data: {
                  userId: user.id,
                  groupId: group.id,
                  joinedAt: faker.date.recent(),
                },
              })
            );
          } else {
            console.log(
              `Membership already exists - User: ${user.id}, Group: ${group.id}`
            );
          }
        } catch (error) {
          console.error(
            `Error for User: ${user.id}, Group: ${group.id}`,
            error
          );
        }
      }
    }
  }
  try {
    await Promise.all(membershipPromises);
  } catch (error) {
    console.error("Error in creating one or more memberships: ", error);
  }
}
