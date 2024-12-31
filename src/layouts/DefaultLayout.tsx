import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthenticationProvider";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const auth = useAuth();
  return (
    <main className="component:DefaultLayout h-screen w-screen">
      <NavigationBar />
      <ScrollArea className="main-container bg-bgContainerContent h-full w-full">
        {/* {auth.isLogged && <SideBar />} */}
        <div
          className={cn("main-container__content", auth.isLogged && "logged")}
        >
          {props.children}
        </div>
      </ScrollArea>
      <Footer />
    </main>
  );
};

export default DefaultLayout;
