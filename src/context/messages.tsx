import { createContext, useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { MessageSchema } from "@/lib/validators/message";

const defaultValue = [
  {
    id: nanoid(),
    text: "Hello, how can I help you? (Please note that I sometimes don't remember the context of previous texts for now as I'm still in beta.)",
    isUserMessage: false,
  },
];

export const MessagesContext = createContext<{
  messages: MessageSchema[];
  isMessageUpdating: boolean;
  addMessage: (message: MessageSchema) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  updatingMessage: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  updatingMessage: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const updatingMessage = useCallback((isUpdating: boolean) => {
    setIsMessageUpdating(isUpdating);
  }, []);
  const addMessage = useCallback((message: MessageSchema) => {
    setMessages((prev) => [...prev, message]);
  }, []);
  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);
  const updateMessage = useCallback(
    (id: string, updateFn: (prevText: string) => string) => {
      setMessages((prev) =>
        prev.map((message) => {
          if (message.id === id) {
            return { ...message, text: updateFn(message.text) };
          }
          return message;
        })
      );
    },
    []
  );

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        updatingMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
