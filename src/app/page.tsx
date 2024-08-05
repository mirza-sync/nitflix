"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import NetflixLogo from "../../public/netflix-logo.png";
import { useState } from "react";

export default function Start() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    router.push("/home");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        className={`-scale-y-100 animate-pulse cursor-pointer rounded-xl hover:shadow hover:shadow-white ${isStarting && "animate-spin"}`}
        src={NetflixLogo}
        alt="Nitflix"
        width={100}
        height={100}
        priority
        onClick={() => handleStart()}
      />
      <span className="pt-2 text-xs text-neutral-500">Click To Start</span>
    </div>
  );
}
