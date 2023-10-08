import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

export async function createGroups() {
  const groupCount = 10;
  const groupPromises = Array.from({ length: groupCount }).map(
    async (_, index) => {
      const group = await prisma.group.create({
        data: {
          groupName: faker.lorem.words(2),
          details: faker.lorem.sentence(),
        },
      });
      return group;
    }
  );
  const groups = await Promise.all(groupPromises);
  return groups;
}
