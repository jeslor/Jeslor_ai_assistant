"use client";
import { signOut } from "next-auth/react";
import AiButton from "../AiButton";
import { useEffect, useState } from "react";
import useUserStore from "../provider/userStore";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.email as string);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aiLogo = document.getElementById("aiLogo");
      if (aiLogo) {
        if (window.scrollY > 90) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`w-full fixed z-[200] top-0 h-[60px] transition-all duration-300 ease-in-out bg-transparent ${
        showNav
          ? "bg-[#363636] backdrop-blur-[15px] rounded-b-2xl shadow-md shadow-black/20"
          : ""
      }`}
    >
      <div className="flex items-center justify-between h-full p-4 relative">
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
            onClick={handleScrollToTop}
            id="aiLogo"
            className={`opacity-0 left-[44.5%]  absolute flex  h-[50px] w-[50px] text-4xl rounded-3xl  items-center justify-center  bg-gradient-to-bl from-dark/30 via-white/5 to-primary1/10  backdrop-blur-md text-white shadow-inner  border border-white/5 text-center hover:bg-gradient-to-bl hover:from-dark/50 hover:to-primary1/50 transition-all ${
              showNav ? "opacity-100 left-[50%] cursor-pointer " : "opacity-0"
            } transition-all duration-300 ease-in-out`}
          >
            <Image
              src="/media/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full  object-cover"
            />
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
      </div>
    </nav>
  );
};

export default Navbar;
