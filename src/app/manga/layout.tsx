import Navbar from "@/components/Navbar";
import NavbarBackground from "@/components/NavbarBackground";

export const metadata = {
  title: "Ikigai - Manga",
  description: "Manga info.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="flex justify-around items-center h-14 w-screen border-b gap-2 fixed z-50 top-0 bg-background transition-colors">
        <Navbar />
      </header>
      {children}
    </div>
  );
};
export default Layout;
