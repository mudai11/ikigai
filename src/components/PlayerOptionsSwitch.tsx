"use client";

import { FC, HTMLAttributes } from "react";
import { Switch } from "./ui/switch";

interface PlayerOptionsSwitchProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  trigger: boolean;
  disabled?: boolean;
}

const PlayerOptionsSwitch: FC<PlayerOptionsSwitchProps> = ({
  label,
  trigger,
  disabled,
  ...props
}) => {
  if (disabled)
    return (
      <div
        className="flex flex-col 2xs:flex-row items-center gap-2 cursor-not-allowed text-gray-500"
        {...props}
      >
        <span>{label}</span>
        <Switch checked={false} disabled={true} className="hidden sm:block" />
        <span className="sm:hidden cursor-pointer">OFF</span>
      </div>
    );
  return (
    <div
      className="flex flex-col 2xs:flex-row items-center gap-2 cursor-pointer"
      {...props}
    >
      <span>{label}</span>
      <Switch checked={trigger} className="hidden sm:block" />
      <span className="sm:hidden cursor-pointer">
        {trigger === true ? "ON" : "OFF"}
      </span>
    </div>
  );
};

export default PlayerOptionsSwitch;
