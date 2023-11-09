import Navbar from "@/components/Navbar";
import NavbarBackground from "@/components/NavbarBackground";

export const metadata = {
  title: "Ikigai - Anime",
  description: "Anime info.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarBackground>
        <Navbar />
      </NavbarBackground>
      {children}
    </div>
  );
};
export default Layout;
