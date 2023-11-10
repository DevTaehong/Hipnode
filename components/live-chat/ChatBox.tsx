import React, { useEffect, useState, useRef } from "react";
import { useChannel } from "ably/react";
import Image from "next/image";

interface ChatUser {
  id: string;
  name: string;
  image: string;
}

interface ChatProps {
  username: string;
  userImage: string;
}

interface ChatMessage {
  data: {
    text: string;
    user: ChatUser;
  };
  connectionId: string;
}

const ChatBox = ({ username, userImage }: ChatProps) => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<string[]>([]);
  console.log(users);

  const { channel, ably } = useChannel("chat-demo", (message: ChatMessage) => {
    const history = receivedMessages.slice(-199);
    const formattedMessage = {
      ...message,
      user: message.data.user,
      text: message.data.text,
    };
    setMessages([...history, formattedMessage]);
  });

  const currentUser = {
    id: "1",
    name: username,
    image: userImage,
  };

  const sendChatMessage = (messageText: string) => {
    const chatMessage = {
      text: messageText,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.image,
      },
    };

    channel.publish({ name: "chat-message", data: chatMessage });
    setMessageText("");
    inputBox.current?.focus();
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  channel.presence.subscribe("enter", function (member) {
    console.log(member.data);
    console.log("Member " + currentUser.name + " entered");
    setUsers((prevUsers) => {
      const memberName = currentUser.name; // Assuming clientId is the username
      if (!prevUsers.includes(memberName)) {
        console.log(users);
        return [...prevUsers, memberName];
      } else {
        console.log(users);
        return prevUsers;
      }
    });
  });

  channel.presence.enter();

  channel.presence.get(function (err, members) {
    if (err) {
      console.error("Error fetching channel presence:", err);
      return;
    }
    console.log("There are " + members.length + " members on this channel");
    if (members.length > 0) {
      console.log("The first member has client ID: " + members[0].clientId);
    }
  });

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <div
        key={index}
        className={`flex w-fit gap-1 ${
          author === "me" ? "self-end text-green" : "self-start text-red"
        }`}
        data-author={author}
      >
        <strong>{message.data.user.name}: </strong> {message.data.text}
        <figure className="h-5 w-5 rounded-full">
          <Image
            src={message.data.user.image}
            alt={message.data.user.name}
            height={20}
            width={20}
            className="rounded-full"
          />
        </figure>
      </div>
    );
  });

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  return (
    <div className="flex-center fixed bottom-10 right-10 h-[450px] w-[450px] flex-col bg-white">
      <div className="flex w-full flex-col">
        {users.map((user) => (
          <p key={user}>{user}</p>
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
          onKeyPress={handleKeyPress}
          className="h-10 w-40"
        ></textarea>
        <button type="submit" className="bg-red" disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
