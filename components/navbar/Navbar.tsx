"use client";
import { signOut } from "next-auth/react";
import AiButton from "../AiButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-4 py-2 fixed top-0">
      <div className="h-[30px] w-[30px] bg-primary1 rounded-full flex items-center justify-center"></div>
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
