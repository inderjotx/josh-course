"use client";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen flex-col gap-3 items-center justify-center">
      <Button className="bg-purple-500 overflow-hidden hover:bg-purple-500/80 relative group bg-radial-[at_50%_-10%] from-purple-300 to-purple-600">
        <span className="z-10">Shimmer Button</span>
        <span className="block absolute inset-0 opacity-55 duration-1000 transition-all bg-gradient-to-r from-transparent   via-white  to-transparent translate-x-[-100%] group-hover:translate-x-[100%]"></span>
      </Button>
    </div>
  );
}
