'use client';

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import { buttonVariants } from './ui/button'
import UserButton from "./UserButton";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="h-20 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[30%]">
        <Link href="/" className="font-bold text-xl text-white">
          <Image
            src="/image/logo.jpg"
            alt="CSE Alumni Logo"
            width={100} 
            height={100}
            className="object-contain"
            priority // optional: ensures it's preloaded
          />
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center justify-between w-[60%]">
        {/* LINKS */}
        <div className="flex gap-6 text-white font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <span> Home </span>
          </Link>
          <Link href="/notice" className="flex items-center gap-2">
            <span>Notice</span>
          </Link>
          <Link href="/alumni" className="flex items-center gap-2">
            <span> Alumni Info </span>
          </Link>

          <Link href="/alumni/form" className="flex items-center gap-2">
            <span>Alumni Form</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2">
            <span className="text-center">Events</span>
          </Link>
          <Link href="/about" className="flex items-center gap-2">
            <span>About Us</span>
          </Link>
          
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[-40%] flex items-center gap-4 xl:gap-8 justify-end font-semibold">
        {" "}<UserButton />{" "}
        {/* <Link className={buttonVariants()} href="/sign-in">
          {" "}
          <UserButton />{" "}
        </Link> */}



        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;