"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";


export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/';

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading]  = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    setLoading(true)
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true

    })

    if(data && !error ){
      toast.success("login successfull.")
      router.push(redirectTo)
    }
    
   } catch (error) {
    console.log(error)
    
   }finally{
    setLoading(false)
   }
   
    
  };

  const handleGoogleLogin = () =>{
    console.log("google login clicked")
  }
  return (
  <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0B0B0F] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">

  {/* BACKGROUND GLOW EFFECTS */}
  <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

  {/* LOGIN CARD */}
  <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-[#12121A]/60 p-8 backdrop-blur-xl shadow-2xl relative z-10">

    {/* HEADER */}
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Welcome Back
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        Sign in to your Hire Loop account
      </p>
    </div>

    {/* GOOGLE LOGIN */}
    <div className="space-y-4">

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
      >
        {/* Google Icon */}
        <svg className="h-5 w-5" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.658 32.91 29.201 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.668 6.053 29.558 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.668 6.053 29.558 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.16 0 9.804-1.977 13.409-5.192l-6.19-5.238C29.164 35.091 26.715 36 24 36c-5.189 0-9.632-3.317-11.281-7.946l-6.533 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a11.95 11.95 0 01-4.084 5.57l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>

        Continue with Google
      </button>

      {/* OR DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-gray-500">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium text-sm">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="h-12 w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 text-white placeholder:text-gray-500 text-sm transition-all"
        />
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-300 font-medium text-sm">Password</label>

          <Link
            href="/auth/forgot-password"
            className="text-xs text-violet-400 hover:text-violet-300 hover:underline transition"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative w-full">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="h-12 w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl pl-4 pr-12 text-white placeholder:text-gray-500 text-sm transition-all"
          />

          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {isVisible ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* REMEMBER ME */}
      <div className="flex items-center px-1 pt-1">
        <input
          id="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={(e) =>
            setFormData({ ...formData, rememberMe: e.target.checked })
          }
          className="h-4 w-4 rounded border-white/10 bg-white/5 text-violet-600 cursor-pointer"
        />
        <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-400">
          Remember me
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
      >
        {loading ? "Processing..." : "Sign In"}
      </button>

    </form>

    {/* SIGN UP LINK */}
    <p className="text-center text-sm text-gray-400">
      Don&apos;t have an account?{" "}
      <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-white hover:underline">
        Sign Up
      </Link>
    </p>

  </div>
</div>
  );
}