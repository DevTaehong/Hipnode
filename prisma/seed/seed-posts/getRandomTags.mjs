export async function getRandomTags(tags, faker) {
  try {
    const shuffledTags = faker.helpers.shuffle(tags);
    const randomTags = shuffledTags.slice(
      0,
      faker.number.int({ min: 1, max: tags.length })
    );
    return randomTags;
  } catch (error) {
    console.error(`Failed to create random tags`, error);
  }
}
