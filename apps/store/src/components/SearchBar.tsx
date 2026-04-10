import { InputGroup, InputGroupAddon, InputGroupInput } from "@livinglog/ui";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <InputGroup className="max-w-112.5 h-13.5 w-full rounded-full border-2 border-white/20 bg-[#FCF9F4] px-4 py-2">
      <InputGroupAddon align={"inline-start"} className="pr-2">
        <Search width={18} strokeWidth={1.5} className="text-[#7E766D]" />
      </InputGroupAddon>
      <InputGroupInput
        className="placeholder:text-sm px-3 pb-2.25 pt-2 outline-0"
        id="inline-start-input"
        placeholder="Search for serenity..."
      />
    </InputGroup>
  );
}
