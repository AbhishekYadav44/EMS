import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <Hero />
    </main>
  );
}