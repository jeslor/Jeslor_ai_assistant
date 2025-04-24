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

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      const aiLogo = document.getElementById("aiLogo");
      const aiWord = document.getElementById("aiWord");

      if (navbar && aiLogo && aiWord) {
        if (window.scrollY > 90) {
          navbar.classList.add(
            "bg-white/5",
            "backdrop-blur-[15px]",
            "rounded-b-2xl",
            "shadow-md",
            "shadow-black/20"
          );
          aiLogo.classList.add("showLogo");
          aiWord.classList.add("hidden");
        } else {
          navbar.classList.remove(
            "bg-white/5",
            "backdrop-blur-[15px]",
            "rounded-b-2xl",
            "shadow-md",
            "shadow-black/20"
          );
          aiLogo.classList.remove("showLogo");
          aiWord.classList.remove("hidden");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className=" flex items-center justify-between w-full p-4 fixed z-[200] top-0 h-[60px] transition-all duration-300 ease-in-out bg-transparent">
      <div className=" flex items-center justify-center text-slate-200 space-x-2">
        {user?.profileImage ? (
          <Image
            src={user?.profileImage}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full border border-white/40 shadow-md shadow-black/20"
          />
        ) : (
          <div className="h-[40px] w-[40px] bg-primary1 rounded-full flex items-center justify-center border border-white/40 shadow-md shadow-black/20">
            <button className="text-white text-[22px] font-extrabold capitalize cursor-pointer">
              {user?.username?.charAt(0)}
            </button>
          </div>
        )}
        <p className="capitalize">{user?.username}</p>
      </div>

      <div className="flex items-center space-x-2 ">
        <button
          id="aiLogo"
          className="  flex  px-4 text-4xl rounded-3xl  items-center justify-center w-fit  bg-gradient-to-bl from-dark/30 via-white/5 to-primary1/10  backdrop-blur-md text-white shadow-inner  border border-white/5 text-center "
        >
          <Image
            src="/media/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full  object-cover"
          />
          <span
            id="aiWord"
            className=" text-white rounded-2xl  cursor-pointer font-light text-[15px]"
          >
            Mood <span className="font-bold text-[18px]">AI</span> Assistant
          </span>
        </button>
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
