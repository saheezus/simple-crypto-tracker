import { Home } from "./components/home.js";
import { Navbar } from "./components/navbar.js";

export default async function Page() {
  return (
    <div className="flex flex-col bg-white text-black h-screen">
      <Navbar />
      <Home />
    </div>
  );
}
