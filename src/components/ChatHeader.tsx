"use client";

const ChatHeader = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="w-full flex gap-3 justify-start items-center text-zinc-800"
    >
      <div className="flex flex-col items-start text-sm">
        <p className="text-sm">Chat with</p>
        <div className="flex gap-1.5 items-center">
          <div className="retalive w-2 h-2 rounded-full bg-red-500">
            <p className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <p className="font-medium">Ikigai-AI</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
