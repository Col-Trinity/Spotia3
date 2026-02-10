import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <button
      className="text-[rgb(38,255,0)] bg-black rounded-lg px-2"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </button>
  );
}
