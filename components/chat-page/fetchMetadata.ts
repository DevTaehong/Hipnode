"use server";

export const fetchMetadataServer = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const titleMatch = html.match(
      /<meta property="og:title" content="([^"]+)"/
    );
    const imageMatch = html.match(
      /<meta property="og:image" content="([^"]+)"/
    );
    const descriptionMatch = html.match(
      /<meta property="og:description" content="([^"]+)"/
    );

    const title = titleMatch ? titleMatch[1] : "";
    const image = imageMatch ? imageMatch[1] : "";
    const description = descriptionMatch ? descriptionMatch[1] : "";

    return { title, image, description };
  } catch (error) {
    console.error("Error fetching URL:", error);
    return null;
  }
};
