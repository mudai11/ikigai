"use client";

import { useCallback } from "react";

const AIChatTrigger = () => {
  const handleClick = useCallback(() => {
    document.getElementById("ai-chat")?.click();
  }, []);

  return (
    <span
      id="external-ai-trigger"
      className="underline cursor-pointer hidden xs:block"
      onClick={handleClick}
    >
      Click here.
    </span>
  );
};

export default AIChatTrigger;
