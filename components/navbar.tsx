"use client";

import { github } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import SearchDialog from "./search-dialog";
import { Button } from "./ui/button";

function Navbar() {
  const router = useRouter();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ModeToggle />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => router.push("https://github.com/tathatahy")}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
