import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link className="text-5xl" href="/heart">
        Heart
      </Link>
    </div>
  );
}
