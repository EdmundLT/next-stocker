import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-[#2C3333] h-screen overflow-hidden">
      <Head>
        <title>Stocker</title>
        <meta name="description" content="Stalk Your Stock" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
}
