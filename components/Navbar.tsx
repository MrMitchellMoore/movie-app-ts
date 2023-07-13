"use client";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export function Navbar() {
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      if (!logOut) {
        return;
      } else {
        logOut();
        redirect("/");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link href={"/"}>
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          Netflick
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link href={"/account"}>
            <button className="text-white pr-4">Account</button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link href={"/login"}>
            <button className="text-white pr-4">Log In</button>
          </Link>
          <Link href={"/signup"}>
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
