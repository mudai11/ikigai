"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Play } from "lucide-react";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="bg-transparent"
            onPointerMove={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            Catalog
          </NavigationMenuTrigger>
          <NavigationMenuContent onPointerLeave={(e) => e.preventDefault()}>
            <ul className="flex flex-col w-[250px] gap-3 p-4 ">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                    href={"/catalog/anime"}
                  >
                    <div className="flex flex-row justify-start items-center gap-3">
                      <Play className="w-5 h-5" />
                      <div className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          Anime
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse All Anime
                        </p>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                    href={"/catalog/manga"}
                  >
                    <div className="flex flex-row justify-start items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <div className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          Manga
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse All Manga
                        </p>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
