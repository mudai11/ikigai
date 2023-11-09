"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-gray scrollbar-thumb-rounded  scrollbar-w-2 scrolling-touch",
        className
      )}
      {...props}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div key={message.id} id="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden rounded-lg",
                {
                  "bg-[#09090b] text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                }
              )}
            >
              <p
                className={cn("px-4 py-2", {
                  "bg-[#09090b] text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                })}
              >
                <MarkdownLite text={message.text} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
