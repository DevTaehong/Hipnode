import Ably from "ably/promises";

export async function GET() {
  if (!process.env.ABLY_API_KEY) {
    throw new Error("ABLY_API_KEY is not defined");
  }
  const client = new Ably.Realtime(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  return Response.json(tokenRequestData);
}
