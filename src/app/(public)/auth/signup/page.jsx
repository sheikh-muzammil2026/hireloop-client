"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || '/'
  const [isVisible, setIsVisible] = useState(false);
  const [role, setRole] = useState("job_seeker"); // default role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading]   = useState(false);

 const router = useRouter()
  const toggleVisibility = () => setIsVisible(!isVisible);
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
        
    })
     
    if(error){
      toast.error(error.message || "Signup failed!");
      return
    }
    if(data && !error){
         toast.success("Account created successfully 🎉");
        router.push(redirectTo)

    }
      
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("error on try catch:", error);
      
    }finally{
      setLoading(false)
    }

     
  };

  const handleGoogleLogin = () =>{
      toast.success("Signup with Google is processing...")
    }
   

  return (
  <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0B0B0F] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">

  {/* BACKGROUND GLOW EFFECTS */}
  <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

  {/* SIGN UP CARD */}
  <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-[#12121A]/60 p-8 backdrop-blur-xl shadow-2xl relative z-10">

    {/* HEADER */}
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Create Account
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        Join Hire Loop today and get started
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

    {/* ROLE SELECTION */}
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/5 p-1.5">
      <button
        type="button"
        onClick={() => setRole("job_seeker")}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
          role === "job_seeker"
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      >
        Job Seeker
      </button>

      <button
        type="button"
        onClick={() => setRole("recruiter")}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
          role === "recruiter"
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      >
        Recruiter
      </button>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

      {/* NAME */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium text-sm">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="h-12 w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 text-white placeholder:text-gray-500 text-sm transition-all"
        />
      </div>

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
        <label className="text-gray-300 font-medium text-sm">Password</label>

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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
          >
            {isVisible ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* TERMS */}
      <div className="flex items-start px-1 pt-1">
        <input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-white/10 bg-white/5 text-violet-600"
        />
        <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
          I agree to the Terms and Privacy Policy
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

    </form>

    {/* SIGN IN */}
    <p className="text-center text-sm text-gray-400">
      Already have an account?{" "}
      <a href={`/auth/signin?redirect=${redirectTo}`} className="text-violet-400 hover:underline">
        Sign In
      </a>
    </p>

  </div>
</div>
  );
}