"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Sounds = [
  { value: "Sound1", label: "Sound1" },
  { value: "Sound2", label: "Sound2" },
  { value: "Sound3", label: "Sound3" },
  { value: "Sound4", label: "Sound4" },
  { value: "Sound5", label: "Sound5" },
];

export function Combobox({ value, onChange }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? Sounds.find((fw) => fw.value === value)?.label
            : "Select sound..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sound..." className="h-9" />
          <CommandList>
            <CommandEmpty>No sound found.</CommandEmpty>
            <CommandGroup>
              {Sounds.map((sound) => (
                <CommandItem
                  key={sound.value}
                  value={sound.value}
                  onSelect={(currentValue) => {
                    const selected = currentValue === value ? "" : currentValue;
                    onChange(selected);
                    setOpen(false);
                  }}
                >
                  {sound.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === sound.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
