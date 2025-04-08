import Header from "@/components/header";
import TabsContainer from "@/components/tabs/tabs-container";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-start bg-gray-100 p-1">
        <Header />
        <div className="w-full h-full pb-2">
        <TabsContainer />
        </div>
    </div>
  );
}
