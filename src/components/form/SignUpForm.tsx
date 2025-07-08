"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingFileInput } from "@/components/ui/floating-input-file";

// react icons
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";


import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { config } from "@/lib/config";



const SignUpForm = () => {
  const [form, setForm] = useState({
    studentID: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch(`${config.apiBaseUrl}/v1/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: form.studentID,
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      // Forward to sign-in page after successful sign-up
      router.push("/sign-in")
    }
    else if (res.status === 422) {
      data.detail.forEach(
        (error: { msg: string }) => toast.error(error.msg)
      );
      setPending(false)
    }
    else if (res.status >= 400 && res.status < 500) {
      setError(data.detail)
      setPending(false)
    }
    else if (res.status >= 500) {
      setError(data.detail)
      setPending(false)
    } else {
      setPending(false);
    }
  }

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>

          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create account.
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="CE____"
              value={form.studentID}
              label="Student ID"
              onChange={(e) => setForm({ ...form, studentID: e.target.value })}
              required
            />

            <FloatingInput
              type="text"
              disabled={pending}
              placeholder="Full name"
              value={form.name}
              label="Full name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <FloatingInput
              type="email"
              disabled={pending}
              placeholder="email"
              value={form.email}
              label="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <FloatingInput
              type="password"
              disabled={pending}
              placeholder="password"
              label="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <FloatingInput
              type="password"
              disabled={pending}
              placeholder="Confirm password"
              value={form.confirmPassword}
              label="Confirm password"
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />

            <Button className="w-full" size="lg" disabled={false}>
              Continue
            </Button>
          </form>

          <Separator />
          {/*<div className="flex my-2 justify-evenly mx-auto items-center">
            <Button
              disabled={false}
              onClick={(e) => { handleProvider(e, "google") }}
              variant="outline"
              size="lg"
              className="bg-slate-200 hover:bg-white hover:scale-110"
            >
              <FaGoogle className="size-8 left-2.5 top-2.5" />
            </Button>

            <Button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-200 hover:bg-white hover:scale-110"
            >
              <FaGithub className="size-8 left-2.5 top-2.5" />
            </Button>
          </div>*/}

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Already have an account?
            <Link className="text-blue-500 ml-4 hover:underline cursor-pointer" href="sign-in"> Sign In </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};
export default SignUpForm;
