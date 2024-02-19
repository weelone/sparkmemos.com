import Image from "next/image";

import appIcon from "@/public/app-icon.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <Image
        className="h-20 w-20 rounded-xl shadow-lg shadow-gray-200/80"
        src={appIcon}
        width={200}
        height={200}
        alt="App Icon"
      />
      <h1 className="font-bold text-lg text-orange-500">Spark Memos</h1>
    </main>
  );
}
