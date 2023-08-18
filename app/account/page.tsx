"use client";
import Image from "next/image";
import netflixBg from "@/public/netflixBg.jpg";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SavedShow } from "@/components/SavedShow";

export default function Account() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (!auth.currentUser) {
        router.push("/");
      }
      return;
    });
  });

  return (
    <>
      <div className="w-full text-white">
        <Image
          alt="Netflix BG"
          src={netflixBg}
          className="w-full h-[400px] object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShow />
    </>
  );
}
