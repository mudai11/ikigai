"use client";

import { useIsScrolled } from "@/hooks/useIsScrolled";

const NavbarBackground = ({ children }: { children: React.ReactNode }) => {
  const { isScrolled } = useIsScrolled();

  return (
    <header
      className={`${
        !isScrolled && "bg-transparent text-white border-none"
      } flex justify-around items-center h-14 w-screen border-b gap-2 fixed z-50 top-0 bg-background transition-colors`}
    >
      {children}
    </header>
  );
};

export default NavbarBackground;
