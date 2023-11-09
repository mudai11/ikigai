import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { List } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

const SideNavbar = async () => {
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden ml-3">
                <List className="w-6 h-6 " />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent className="duration-75">
            <p>Open menu</p>
          </TooltipContent>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <aside className="flex flex-col gap-3 mt-5">
              <Link href="/browse">
                <Button variant="ghost" className="w-full h-8">
                  Home
                </Button>
              </Link>
              <Link href="/catalog/anime">
                <Button variant="ghost" className="w-full h-8">
                  Anime Catalog
                </Button>
              </Link>
              <Link href="/catalog/manga">
                <Button variant="ghost" className="w-full h-8">
                  Manga Catalog
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="w-full h-8">
                  About
                </Button>
              </Link>
            </aside>
          </SheetContent>
        </Tooltip>
      </TooltipProvider>
    </Sheet>
  );
};

export default SideNavbar;
