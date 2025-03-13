import Header from "@/components/header";
import TabsContainer from "@/components/tabs-container";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-start bg-indigo-100/20 gap-1 p-1">
        <Header />
        <div className="w-full h-full py-2">
        <TabsContainer />
        </div>
    </div>
  );
}
