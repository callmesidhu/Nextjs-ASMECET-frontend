import Image from "next/image";
import Navbar from "./lib/navbar";
import Landing from "./lib/landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Landing />
      
    </main>
  );
}
