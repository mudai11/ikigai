"use client";

import { useState, FC, useMemo, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ComboboxProps {
  items: {
    value: string;
    label: string;
  }[];
  title: string;
  params: string;
}

export const Combobox: FC<ComboboxProps> = ({ items, title, params }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialValue = searchParams!.get(params);
  const [value, setValue] = useState(initialValue || "");
  const current = new URLSearchParams(Array.from(searchParams!.entries()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? items.find((item) => item.value === value)?.label : title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => {
                  setValue(item.value === value ? "" : item.value);
                  if (item.value === value) {
                    current.delete(params);
                  } else {
                    current.set(params, item.value);
                  }
                  const search = current.toString();
                  const query = search ? `?${search}` : "";
                  router.push(`${pathname}${query}`);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
