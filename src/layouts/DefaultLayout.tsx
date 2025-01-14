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
      <ScrollArea className="main-container h-full w-full bg-bgContainerContent">
        {/* {auth.isLogged && <SideBar />} */}
        <NavigationBar />
        <div
          className={cn("main-container__content", auth.isLogged && "logged")}
        >
          {props.children}
        </div>
        <Footer />
      </ScrollArea>
    </main>
  );
};

export default DefaultLayout;
