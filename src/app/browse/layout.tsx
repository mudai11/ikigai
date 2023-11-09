import Navbar from "@/components/Navbar";
import Chat from "@/components/Chat";
import NavbarBackground from "@/components/NavbarBackground";

export const metadata = {
  title: "Ikigai - Browse Anime",
  description: "Browse a collection of anime.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen">
      <NavbarBackground>
        <Navbar />
      </NavbarBackground>
      <Chat />
      {children}
    </div>
  );
};
export default Layout;
