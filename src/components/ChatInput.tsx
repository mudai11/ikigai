"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from "nanoid";
import { MessageSchema } from "@/lib/validators/message";
import { MessagesContext } from "@/context/messages";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    updatingMessage,
  } = useContext(MessagesContext);
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (_message: MessageSchema) => {
      if (input.length === 0) {
        toast({
          title: "There seems to be a problem!",
          description:
            "You either sent an empty message or you're typing too fast, please try again.",
          variant: "destructive",
        });
        return;
      }
      const response = await fetch("/api/ai/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");
      const id = nanoid();
      const responseMessage: MessageSchema = {
        id,
        isUserMessage: false,
        text: "",
      };
      addMessage(responseMessage);
      updatingMessage(true);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }
      updatingMessage(false);
      setInput("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      toast({
        title: "Something went wrong!",
        description: "We couldn't generate a response, please try again!",
        variant: "destructive",
      });
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.length === 0) return;
        const message: MessageSchema = {
          id: nanoid(),
          isUserMessage: true,
          text: input,
        };
        sendMessage(message);
      }
    },
    [input, sendMessage]
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    []
  );

  return (
    <div className={cn("border-t border-zinc-300", className)} {...props}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          rows={2}
          maxRows={4}
          onKeyDown={handleKeyDown}
          value={input}
          onChange={handleChange}
          disabled={isLoading}
          autoFocus
          placeholder="Ask for recommendations..."
          className="peer pl-2 disabled:opacity-50 pr-14 resize-none block w-full border-0 outline-none bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5">
          <kbd
            className={`inline-flex items-center rounded px-1 font-sans text-xs text-gray-900 ${
              isLoading ? "" : "cursor-pointer"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin " />
            ) : (
              <CornerDownLeft className="w-3 h-5" />
            )}
          </kbd>
        </div>
        <div
          className="absolute w-full inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-[#09090b]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ChatInput;
