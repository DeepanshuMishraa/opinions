'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Hero() {
  let signedIn = true;
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-[30rem]">
      <div className="max-w-2xl px-6 text-center">
        <h1 className="text-5xl font-bold">
          Your Voice. <span className="text-red-600">Your Opinion.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Speak freely. Be heard. Make an impact.
        </p>
        <div className="mt-8">
          <Button onClick={() => {
            if (signedIn) {
              router.push('/opinions');
            } else {
              router.push('/login');
            }
          }} className="bg-red-600 hover:bg-red-700 text-white">
            Share Your Opinion
          </Button>
        </div>
      </div>
    </div>
  )
}
