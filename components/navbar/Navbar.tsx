"use client";
import { signOut } from "next-auth/react";
import AiButton from "../AiButton";
import { memo, useEffect, useState } from "react";
import useUserStore from "../provider/userStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = memo(() => {
  const path = usePathname();
  const Router = useRouter();
  const { user, setUser } = useUserStore();
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.email as string);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aiLogo = document.getElementById("aiLogo");
      if (aiLogo) {
        if (window.scrollY > 50) {
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
    if (path !== "/") {
      Router.push("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handShowSubMenu = () => {
    setShowSubMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const navbar = document.getElementById("navbar");
      if (navbar && !navbar.contains(e.target as Node)) {
        setShowSubMenu(false);
      }
    };
    const handleScroll = (e: Event) => {
      const navbar = document.getElementById("navbar");
      if (navbar && !navbar.contains(e.target as Node)) {
        setShowSubMenu(false);
      }
    };

    if (showSubMenu) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [showSubMenu]);

  return (
    <nav
      id="navbar"
      className={`w-full fixed z-[200] top-0 h-[60px] transition-all duration-300 ease-in-out bg-dark1/60 ${
        showNav
          ? "bg-dark1/60 backdrop-blur-[15px] sm:rounded-b-2xl sm:shadow-md shadow-black/20"
          : ""
      }`}
    >
      <div className="flex items-center justify-between h-full p-4 relative">
        <div className=" hidden sm:flex items-center justify-center text-slate-200 space-x-2">
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
            className={`opacity-0 left-[2%] sm:left-[44.5%]  absolute flex  h-[50px] w-[50px] text-4xl rounded-3xl  items-center justify-center  bg-gradient-to-bl from-dark/30 via-white/5 to-primary1/10  backdrop-blur-md text-white shadow-inner  border border-white/5 text-center hover:bg-gradient-to-bl hover:from-dark/50 hover:to-primary1/50 transition-all ${
              showNav || path !== "/"
                ? "opacity-100  !sm:left-[50%] cursor-pointer "
                : "opacity-0"
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
            extraClasses="hidden sm:flex"
          />
          <AiButton
            onPress={async () => {
              await signOut({ callbackUrl: "/sign_in" });
            }}
            title="Sign out"
            icon=""
            extraClasses="hidden sm:flex"
          />
        </div>
        <AiButton
          onPress={handShowSubMenu}
          title=""
          icon={`${
            !showSubMenu ? "mi:menu" : "line-md:menu-to-close-alt-transition"
          }`}
          extraClasses="sm:hidden"
        />
      </div>
      <div
        className={`bg-dark1 backdrop-blur-[15px] absolute py-10 w-full  top-[60px] rounded-b-2xl shadow-black/20 flex flex-col items-start justify-center space-y-4 px-4 z-10   ${
          showSubMenu ? "opacity-100 left-0" : "opacity-0 left-[100%]"
        }`}
      >
        <div className="w-full max-w-[300px]  flex items-center justify-start text-slate-200 space-x-2">
          {user?.profileImage ? (
            <Image
              src={user?.profileImage}
              alt="Profile Image"
              width={20}
              height={20}
              className="rounded-full border border-white/40 shadow-md shadow-black/20"
            />
          ) : (
            <div className="h-[22px] w-[22px] bg-primary1 rounded-full flex items-center justify-center border border-white/40 shadow-md shadow-black/20">
              <button className="text-white text-[15px] font-extrabold capitalize cursor-pointer">
                {user?.username?.charAt(0)}
              </button>
            </div>
          )}
          <p className="capitalize">{user?.username}</p>
        </div>
        <AiButton
          onPress={() => {
            setShowSubMenu(false);
            return Router.push("/");
          }}
          title="Home"
          icon=""
          extraClasses=" w-full max-w-[300px] "
        />
        <AiButton
          onPress={() => {}}
          title="Try Premium"
          icon=""
          extraClasses=" w-full max-w-[300px] "
        />
        <AiButton
          onPress={async () => {
            await signOut({ callbackUrl: "/sign_in" });
          }}
          title="Sign out"
          icon=""
          extraClasses="w-full max-w-[300px] "
        />
      </div>
    </nav>
  );
});

export default Navbar;
