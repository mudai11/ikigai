import Logo from "./Logo";
import AnimeSearchDialog from "./AnimeSearchDialog";
import SideNavbar from "./SideNavbar";
import { getMostFavoritedAnimes } from "@/lib/animesFetcher";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";

const Navbar = async () => {
  const initialData = await getMostFavoritedAnimes();

  if (!initialData) return notFound();

  return (
    <>
      <nav className="flex gap-5 justify-center items-center">
        <SideNavbar />
        <div className="hidden sm:block">
          <Logo />
        </div>
        <ul className="hidden sm:flex gap-5 text-base tracking-tight items-center justify-center h-full lg:text-md">
          <li>
            <Link href="/browse">
              <Button variant="ghost">Home</Button>
            </Link>
          </li>
          <Navigation />
          <li>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center px-5 items-center gap-2 w-full sm:w-[300px]">
        <AnimeSearchDialog initialData={initialData} />
      </div>
    </>
  );
};

export default Navbar;
