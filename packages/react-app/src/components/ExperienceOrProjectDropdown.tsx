import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function ExperienceOrProjectDropdown({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [position, setPosition] = useState<string>("Experience");

  const handleValueChange = (value: string) => {
    setPosition(value);
    onChange(value);
    console.log(value);
  };
  return (
    <div className="w-full h-10 border rounded-md px-2 py-1 outline-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-24">
            {position}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>{position}</DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleValueChange}
          >
            <DropdownMenuRadioItem value="Experience">
              Experience
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Project">
              Project
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
