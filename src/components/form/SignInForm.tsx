"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FloatingInput } from "@/components/ui/floating-input";

// react icons
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import { config } from "@/lib/config";
import { useAuthStore } from "@/store/authStore";

const SignInForm = () => {
  const { setRefreshToken, fetchUser, autoRefresh, setAccessToken } = useAuthStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const result = await fetch(`${config.apiBaseUrl}/v1/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await result.json();
    if (result.status === 422) {
      data.detail.forEach((error: { msg: string }) => {
        toast.error(error.msg);
      });
      setPending(false);
    } else if (!result.ok) {
      console.log("Sign-in data:", data);
      setError(data.detail);
      setPending(false);
    } else {
      await setRefreshToken(data.refresh_token);
      await setAccessToken(data.access_token);
      await autoRefresh();
      await fetchUser();
      router.push("/");
      toast.success("login successful");
      setPending(false);
    }
  };

  const handleProvider = (event: React.MouseEvent<HTMLButtonElement>, value: "github" | "google") => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to sign in.
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3">
            <FloatingInput
              type="email"
              disabled={pending}
              placeholder="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FloatingInput
              type="password"
              disabled={pending}
              placeholder="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              className="w-full"
              size="lg"
              disabled={pending}>
              Continue
            </Button>
          </form>

          <Separator />
          {/*<div className="flex my-2 justify-evenly mx-auto items-center">
            <Button
              disabled={false}
              onClick={(e) => {
                handleProvider(e, "google");
              }}
              variant="outline"
              size="lg"
              className="bg-slate-200 hover:bg-white hover:scale-110">
              <FaGoogle className="size-8 left-2.5 top-2.5" />
            </Button>

            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-200 hover:bg-white hover:scale-110">
              <FaGithub className="size-8 left-2.5 top-2.5" />
            </Button>
          </div>*/}

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Create new account.
            <Link
              className="text-blue-500 ml-4 hover:underline cursor-pointer"
              href="sign-up">
              {" "}
              Sign Up{" "}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default SignInForm;
