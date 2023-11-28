import { auth } from "@clerk/nextjs/server";

export const verifyAuth = (message = "You must be logged in to perform this action.") => {
    const user = auth();

    if (!user?.userId) throw new Error(message);

    return user;
}
