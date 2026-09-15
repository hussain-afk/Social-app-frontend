import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MainContext } from "../../../context/main.context";
import { 
    Home, 
    Search, 
    MessageSquare, 
    User, 
    Settings, 
    Menu, 
    X, 
    Plus,
    RefreshCw
} from "lucide-react";

function Sidebar() {
    const navigate = useNavigate();
    const { user, initializeApp } = useContext(MainContext);
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            name: "Home",
            path: "/user",
            icon: <Home className="w-4 h-4" />,
        },
        {
            name: "Profile",
            path: `/user/me/${user?._id}`,
            icon: <User className="w-4 h-4" />,
        },
    ];

    const handleRefreshData = async () => {
        // Implement the logic to refresh the user data
        await initializeApp(); // Re-fetch all data from the context

    };

    return (
        <>
            {/* ================= MOBILE HEADER ================= */}
            <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-md px-6 lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black shadow-md">
                        S
                    </div>
                    <span className="text-sm font-extrabold tracking-tight text-white">
                        Socially
                    </span>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-xl p-2 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </header>

            {/* ================= MOBILE OVERLAY ================= */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
                />
            )}

            {/* ================= SIDEBAR ================= */}
            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-[260px]
                    flex-col
                    border-r
                    border-white/10
                    bg-[#0a0a0c]
                    transition-transform
                    duration-300
                    ease-in-out
                    lg:translate-x-0
                    ${
                        isOpen
                            ? "translate-x-0 shadow-2xl shadow-black"
                            : "-translate-x-full"
                    }
                `}
            >
                {/* Logo Area */}
                <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-black shadow-lg shadow-white/5">
                            S
                        </div>
                        <div>
                            <h1 className="text-sm font-extrabold tracking-tight text-white">
                                Socially
                            </h1>
                            <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase">
                                Connect & Share
                            </p>
                        </div>
                    </div>

                    {/* Close Mobile Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 lg:hidden transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-6">
                    <div>
                        <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30">
                            Menu
                        </p>

                        <div className="space-y-1.5">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `
                                        flex
                                        items-center
                                        gap-3.5
                                        rounded-xl
                                        px-3.5
                                        py-3
                                        text-xs
                                        font-bold
                                        transition-all
                                        duration-200
                                        ${
                                            isActive
                                                ? "bg-white text-black shadow-lg shadow-white/10 scale-[1.01]"
                                                : "text-white/50 hover:bg-white/5 hover:text-white"
                                        }
                                        `
                                    }
                                >
                                    <span className="flex items-center justify-center">
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    
                </nav>
                

                {/* Bottom User Profile Summary */}
                <div className="border-t border-white/10 p-4 bg-[#0d0d10]">
                {/* Create Post Button */}
                    <button
                        onClick={() => {
                            navigate("/user/create-post");
                            // setIsOpen(false);
                        }}
                        className="
                            mb-4
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-white/10
                            border border-white/10
                            px-4
                            py-3
                            text-xs
                            font-extrabold
                            text-white
                            transition-all
                            duration-200
                            hover:bg-white
                            hover:text-black
                            active:scale-[0.98]
                            shadow-md
                        "
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Post</span> 
                    </button>
                    <button
                        onClick={() => {
                            handleRefreshData(); // Fetch latest user data
                            // setIsOpen(false);
                        }}
                        className="
                            mb-4
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-white/10
                            border border-white/10
                            px-4
                            py-3
                            text-xs
                            font-extrabold
                            text-white
                            transition-all
                            duration-200
                            hover:bg-white
                            hover:text-black
                            active:scale-[0.98]
                            shadow-md
                        "
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh</span> 
                    </button>
                    <div className="flex items-center gap-3 rounded-2xl p-2 bg-white/5 border border-white/5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-white/20 to-white/5 text-xs font-black text-white border border-white/10 overflow-hidden shadow-inner">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <span>{user?.username?.[0]?.toUpperCase() || "H"}</span>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-black tracking-tight text-white">
                                @{user?.username || "hussain"}
                            </p>
                            <p className="truncate text-[10px] text-white/40 font-medium">
                                {user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </aside>
        </>
    );
}

export default Sidebar;