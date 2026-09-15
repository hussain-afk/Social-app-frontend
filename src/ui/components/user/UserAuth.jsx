import { useState, useContext } from "react";

import useAuth from "../../../hooks/useAuth";
import { MainContext } from "../../../context/main.context";

function UserAuth() {
    const { user, loading } = useContext(MainContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authType, setAuthType] = useState("login");

    const { handleRegister, handleLogin } = useAuth();

    console.log(username, email, password);

    const handleAuthType = () => {
        if (authType === "login") {
            setAuthType("signup");
        } else {
            setAuthType("login");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authType === "login") {
            await handleLogin(username, password);
            //   console.log(response);
        } else {
            await handleRegister(username, email, password);
            //   console.log(response);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-black animate-spin" />
                    <p className="text-xs font-medium text-gray-500">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-6">

            {/* Main Auth Container */}
            <div
                className="
          w-full max-w-[850px]
          min-h-[500px]
          max-h-[620px]
          bg-white
          rounded-[26px]
          border border-gray-200
          shadow-[0_20px_60px_rgba(0,0,0,0.10)]
          overflow-hidden
          flex
        "
            >

                {/* ========================================
            LEFT SIDE
        ======================================== */}
                <div
                    className="
            hidden md:flex
            w-[45%]
            bg-black
            text-white
            relative
            overflow-hidden
            p-8
            flex-col
            justify-between
          "
                >

                    {/* Background Shapes */}
                    <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-white/[0.06]" />
                    <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-white/[0.05]" />

                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3">

                            <div
                                className="
                  h-10 w-10
                  rounded-xl
                  bg-white
                  text-black
                  flex items-center justify-center
                  font-black text-sm
                "
                            >
                                S
                            </div>

                            <div>
                                <p className="text-sm font-bold tracking-tight">
                                    Socially
                                </p>

                                <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">
                                    Connect. Share. Discover.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Center Message */}
                    <div className="relative z-10">

                        <div className="mb-5 flex -space-x-2">

                            <div className="h-9 w-9 rounded-full bg-white text-black border-2 border-black flex items-center justify-center text-[10px] font-bold">
                                A
                            </div>

                            <div className="h-9 w-9 rounded-full bg-gray-300 text-black border-2 border-black flex items-center justify-center text-[10px] font-bold">
                                H
                            </div>

                            <div className="h-9 w-9 rounded-full bg-gray-500 text-white border-2 border-black flex items-center justify-center text-[10px] font-bold">
                                M
                            </div>

                            <div className="h-9 w-9 rounded-full bg-white/10 border-2 border-black flex items-center justify-center text-[11px] text-white/70">
                                +
                            </div>

                        </div>

                        <h2 className="text-3xl lg:text-[34px] font-black leading-[1.05] tracking-tight">
                            Share your
                            <br />
                            <span className="text-white/45">
                                world.
                            </span>
                        </h2>

                        <p className="mt-4 text-xs leading-5 text-white/45 max-w-[270px]">
                            Connect with people, share your moments,
                            discover new ideas and build your community.
                        </p>

                    </div>

                    {/* Bottom */}
                    <div className="relative z-10 flex items-center justify-between">

                        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                            Your social space
                        </span>

                        <span className="text-[10px] text-white/30">
                            01 / 02
                        </span>

                    </div>

                </div>

                {/* ========================================
            RIGHT SIDE
        ======================================== */}
                <div
                    className="
            w-full md:w-[55%]
            flex items-center
            justify-center
            px-6 py-7
            sm:px-10
            bg-white
          "
                >

                    <div className="w-full max-w-[350px]">

                        {/* Heading */}
                        <div className="mb-6">

                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                                {authType === "login"
                                    ? "Welcome back"
                                    : "Get started"}
                            </p>

                            <h1 className="text-2xl sm:text-[28px] font-black tracking-tight text-black">
                                {authType === "login"
                                    ? "Sign in to Socially"
                                    : "Create your account"}
                            </h1>

                            <p className="text-xs text-gray-400 mt-2 leading-5">
                                {authType === "login"
                                    ? "Continue your journey and connect with your community."
                                    : "Join the community and start sharing your world."}
                            </p>

                        </div>

                        {/* Login / Signup Switch */}
                        <div className="flex items-center p-1 bg-gray-100 rounded-xl mb-6">

                            <button
                                type="button"
                                onClick={() => setAuthType("login")}
                                className={`
                  flex-1
                  h-9
                  rounded-lg
                  text-xs
                  font-bold
                  transition-all duration-200
                  ${authType === "login"
                                        ? "bg-black text-white shadow-sm"
                                        : "text-gray-400 hover:text-black"
                                    }
                `}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => setAuthType("signup")}
                                className={`
                  flex-1
                  h-9
                  rounded-lg
                  text-xs
                  font-bold
                  transition-all duration-200
                  ${authType === "signup"
                                        ? "bg-black text-white shadow-sm"
                                        : "text-gray-400 hover:text-black"
                                    }
                `}
                            >
                                Sign Up
                            </button>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="space-y-4"
                        >

                            {/* Username */}
                            <div>

                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Username
                                </label>

                                <div className="relative">

                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                        @
                                    </span>

                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Enter username"
                                        className="
                      w-full
                      h-11
                      rounded-xl
                      border border-gray-200
                      bg-gray-50
                      pl-9 pr-4
                      text-xs
                      text-black
                      placeholder:text-gray-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-black
                      focus:ring-4
                      focus:ring-black/[0.04]
                    "
                                    />

                                </div>

                            </div>

                            {/* Email */}
                            {authType === "signup" && (
                                <div>

                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                        Email Address
                                    </label>

                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="
                      w-full
                      h-11
                      rounded-xl
                      border border-gray-200
                      bg-gray-50
                      px-4
                      text-xs
                      text-black
                      placeholder:text-gray-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-black
                      focus:ring-4
                      focus:ring-black/[0.04]
                    "
                                    />

                                </div>
                            )}

                            {/* Password */}
                            <div>

                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="
                    w-full
                    h-11
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4
                    text-xs
                    text-black
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-black
                    focus:ring-4
                    focus:ring-black/[0.04]
                  "
                                />

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="
                  group
                  w-full
                  h-11
                  rounded-xl
                  bg-black
                  text-white
                  text-xs
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-1
                  transition-all duration-200
                  hover:bg-gray-800
                  active:scale-[0.98]
                  shadow-lg shadow-black/10
                "
                            >
                                <span>
                                    {authType === "login"
                                        ? "Continue"
                                        : "Create Account"}
                                </span>

                                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>

                        </form>

                        {/* Bottom Switch */}
                        <div className="text-center mt-5">

                            <p className="text-[11px] text-gray-400">

                                {authType === "login"
                                    ? "Don't have an account?"
                                    : "Already have an account?"}

                                <button
                                    type="button"
                                    onClick={() => handleAuthType()}
                                    className="
                    ml-1
                    font-bold
                    text-black
                    hover:underline
                    underline-offset-4
                  "
                                >
                                    {authType === "login"
                                        ? "Sign Up"
                                        : "Log In"}
                                </button>

                            </p>

                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-center gap-2 mt-6">

                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                            <span className="text-[9px] text-gray-400">
                                Secure & private community
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserAuth;