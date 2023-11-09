import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Ikigai - Advanced Search",
  description: "Browse a collection of anime.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <header className="flex justify-around items-center h-14 w-screen border-b gap-2 fixed z-50 top-0 bg-background transition-colors">
        <Navbar />
      </header>
      {children}
    </div>
  );
};
export default Layout;
