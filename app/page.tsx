import Image from "next/image";
import Logo from "@/images/logo2.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoryWriter from "@/components/StoryWriter";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-purple-300 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pb-10">
          <Image src={Logo} height={250} alt="Logo" />
          <Button asChild className="px-20 bg-purple-500 p-10 text-xl">
            <Link href="/stories">Explore Story Library</Link>
          </Button>
        </div>

        {/* StoryWriter */}
        <StoryWriter />
      </section>
    </main>
  );
}
