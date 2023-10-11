import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/user.actions";

const webhookSecret = process.env.WEBHOOK_SECRET || "";
type EventType = "user.updated" | "user.deleted" | "user.created" | "*";
type Event = {
  data: {
    email_addresses: { email_address: string }[];
    [key: string]: string | number | { email_address: string }[];
  };
  object: "event";
  type: EventType;
};

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let event: Event | null = null;

  try {
    event = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = event.type;
  if (eventType === "user.updated") {
    const { id, ...attributes } = event.data;

    const {
      username,
      first_name: firstName,
      last_name: lastName,
      profile_image_url: profileImageUrl,
      email_addresses: [{ email_address: emailAddress }],
    } = attributes;

    const stringId = id.toString();
    const stringUsername = username.toString();
    const stringPictureUrl = profileImageUrl.toString();

    const updatedUser = await updateUser(stringId, {
      clerkId: stringId,
      name: `${firstName} ${lastName}`,
      username: stringUsername,
      email: emailAddress,
      picture: stringPictureUrl,
    });
    return updatedUser;
  } else if (eventType === "user.deleted") {
    const { id } = event.data;

    const deletedUser = await deleteUser(id.toString());
    return deletedUser;
  } else if (eventType === "user.created") {
    const { id, ...attributes } = event.data;

    const {
      email_addresses: emailAddresses,
      first_name: firstName,
      last_name: lastName,
      username,
      image_url: imageUrl,
    } = attributes;

    const stringId = id.toString();
    const stringUsername = username.toString();
    const stringImageUrl = imageUrl.toString();

    const emailAddress = emailAddresses[0].email_address;

    const user = createUser({
      clerkId: stringId,
      name: `${firstName} ${lastName}`,
      username: stringUsername,
      picture: stringImageUrl,
      email: emailAddress,
    });

    return user;
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
