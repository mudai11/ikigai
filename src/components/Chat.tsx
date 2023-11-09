"use client";

import {
  ChatAccordion,
  ChatAccordionItem,
  ChatAccordionTrigger,
  ChatAccordionContent,
} from "./ui/chataccordion";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <ChatAccordion
      type="single"
      collapsible
      className="relative hidden bg-white z-40 shadow xs:block"
    >
      <ChatAccordionItem value="item-1">
        <div className="fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <ChatAccordionTrigger className="px-6 border-b border-zinc-300">
              <ChatHeader id="ai-chat" />
            </ChatAccordionTrigger>
            <ChatAccordionContent>
              <div className="flex flex-col h-80">
                <ChatMessages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" />
              </div>
            </ChatAccordionContent>
          </div>
        </div>
      </ChatAccordionItem>
    </ChatAccordion>
  );
};

export default Chat;
