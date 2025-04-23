"use client";
import { signOut } from "next-auth/react";
import AiButton from "../AiButton";
import { useEffect } from "react";
import useUserStore from "../provider/userStore";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.email as string);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between w-full px-4 py-2 fixed top-0">
      <div className=" flex items-center justify-center text-slate-200 space-x-2">
        {user?.profileImage ? (
          <Image
            src={user?.profileImage}
            alt="Profile Image"
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <div className="h-[30px] w-[30px] bg-primary1 rounded-full flex items-center justify-center">
            <p className="text-white text-[22px] font-extrabold capitalize">
              {user?.username?.charAt(0)}
            </p>
          </div>
        )}
        <p className="capitalize">{user?.username}</p>
      </div>
      <div className="flex items-center space-x-2">
        <AiButton
          onPress={() => {}}
          title="Try Premium"
          icon="mingcute:mic-ai-fill"
        />
        <AiButton
          onPress={async () => {
            await signOut({ callbackUrl: "/sign_in" });
          }}
          title="Sign out"
          icon=""
        />
      </div>
    </nav>
  );
};

export default Navbar;
