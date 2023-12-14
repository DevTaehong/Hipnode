"use server";

import { load } from "cheerio";

export const fetchMetadataServer = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const image = $('meta[property="og:image"]').attr("content");
    const description = $('meta[property="og:description"]').attr("content");

    return { title, image, description };
  } catch (error) {
    console.error("Error fetching URL:", error);
  }
};
