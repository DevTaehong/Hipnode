import { User, Group ,PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMemberships(users : User[], groups: Group[]) {
  const membershipPromises = [];

  for (const user of users) {
    for (const group of groups) {
      if (Math.random() > 0.5) {
        membershipPromises.push(
          prisma.membership.create({
            data: {
              userId: user.id,
              groupId: group.id,
            },
          })
        );
      }
    }
  }

  await Promise.all(membershipPromises);
}
