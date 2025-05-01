'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/")
}
  return (
      session ? ( // if logged in
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
            <div className="flex gap-4 items-center">
              <span>{session.user?.name}</span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || "undefined"}
                />
                <AvatarFallback className="bg-red-800 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={()=>handleSignOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : ( // if not logged in
          <Link  href='/sign-in'> Sign In  </Link>        
      )
  );
};

export default UserButton;