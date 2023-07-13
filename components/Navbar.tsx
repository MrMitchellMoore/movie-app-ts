import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link href={"/"}>
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          Netflick
        </h1>
      </Link>
      <div>
        <Link href={"/login"}>
          <button className="text-white pr-4">Sign In</button>
        </Link>
        <Link href={"/signup"}>
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
