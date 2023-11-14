import React, { useState, useRef, useEffect, useMemo } from "react";
import { useChannel, useAbly, usePresence } from "ably/react";
import Image from "next/image";

interface ChatProps {
  username: string;
  userImage: string;
  userId: number;
}

interface ChatMessage {
  connectionId: string;
  data: {
    user: {
      id: string;
      username: string;
      image: string;
    };
    text: string;
  };
}

const ChatBoxTest = ({ username, userImage, userId }: ChatProps) => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<ChatProps[]>([]);

  const { channel } = useChannel("chat-demo", (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
  });

  const { presenceData } = usePresence("chat-demo", {
    data: "Online",
  });

  useEffect(() => {
    const newUserList = presenceData
      .map((data) => {
        if (data.data) {
          try {
            const userData = JSON.parse(JSON.stringify(data.data));
            return userData;
          } catch (error) {
            console.error("Error parsing presence data: ", error);
            return null; // In case of error, return null or some default value
          }
        }
        return null;
      })
      .filter((user) => user !== null); // Filter out null or undefined values

    setUsers(newUserList);
  }, [presenceData]);

  const ablyClient = useAbly().connection.id;

  const currentUser = useMemo(
    () => ({
      id: userId,
      username,
      image: userImage,
    }),
    [username, userImage, userId]
  );

  const sendChatMessage = async (messageText: string) => {
    if (messageText.trim().length === 0) return;

    const chatMessage = {
      text: messageText,
      user: currentUser,
    };

    try {
      await channel.publish("chat-message", chatMessage);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }

    inputBox.current?.focus();
  };

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await sendChatMessage(messageText);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !messageTextIsEmpty) {
      event.preventDefault(); // Prevent default to avoid newline in textarea
      await sendChatMessage(messageText);
      setMessageText(""); // Clear the message input after sending
    }
  };

  useEffect(() => {
    const enterPresence = () => {
      channel.presence.enter(currentUser);
    };

    enterPresence();

    return () => {
      channel.presence.leave();
    };
  }, [channel.presence, currentUser]);

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ablyClient ? "me" : "other";
    const name = message.data.user.username;
    const text = message.data.text;
    const image = message.data.user.image;

    // Check if the user is present in the chat
    const isUserPresent = users.some((user) => user.username === name);

    return (
      <div
        key={index}
        className={`flex w-fit gap-1 ${
          author === "me"
            ? "self-end text-green-500"
            : "self-start text-red-500"
        }`}
        data-author={author}
      >
        <div
          className={`h-2.5 w-2.5 self-center rounded-full bg-green ${
            isUserPresent ? "flex" : "hidden"
          }`}
        />
        <strong>{name}: </strong> {text}
        <figure className="h-5 w-5 rounded-full">
          <Image
            src={image}
            alt={name}
            height={20}
            width={20}
            className="rounded-full"
          />
        </figure>
      </div>
    );
  });

  return (
    <div className="flex-center fixed bottom-10 right-10 h-[450px] w-[450px] flex-col bg-white">
      <div className="flex w-full flex-col">
        <p>Online</p>
        {users.map((user) => (
          <p key={user.userId}>{user.username} </p>
        ))}
        {messages}
        <div ref={messageEnd} />
      </div>
      <form onSubmit={handleFormSubmission} className="flex h-20 w-80">
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-10 w-40"
        ></textarea>
        <button
          type="submit"
          className="bg-red-500"
          disabled={messageTextIsEmpty}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBoxTest;
