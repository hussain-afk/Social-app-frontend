import React, { useContext } from "react";
import { MainContext } from "../../../context/main.context";
import PostCard from "../../components/user/PostCard";
import { Home as HomeIcon, Radio, Sparkles, Inbox } from "lucide-react";

function Home() {
    const { allPosts } = useContext(MainContext);
    const posts = allPosts || [];

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#08080a] text-white font-sans selection:bg-white selection:text-black">
            
            {/* ================= BACKGROUND GLOWS ================= */}
            <div className="pointer-events-none fixed -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
            <div className="pointer-events-none fixed bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-white/[0.015] blur-[120px]" />

            {/* ================= PAGE CONTAINER ================= */}
            <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                
                {/* ================= TOP HEADER ================= */}
                <header className="mx-auto mb-7 w-full max-w-[580px]">
                    <div className="flex items-center justify-between rounded-[24px] border border-white/[0.07] bg-white/[0.025] px-5 py-4 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                        
                        {/* Left Title */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black shadow-lg shadow-white/10">
                                <HomeIcon className="h-4 w-4 stroke-[2.2]" />
                            </div>
                            <div>
                                <h1 className="text-sm font-black tracking-tight text-white/90">
                                    Home Feed
                                </h1>
                                <p className="text-[10px] font-medium text-white/40">
                                    Your personal timeline
                                </p>
                            </div>
                        </div>

                        {/* Right Live Status Badge */}
                        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 shadow-inner">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"></span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                                Live
                            </span>
                        </div>

                    </div>
                </header>

                {/* ================= WELCOME / FEED INTRO BANNER ================= */}
                <section className="mx-auto mb-8 w-full max-w-[580px]">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md">
                        
                        {/* Decorative background rings */}
                        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/[0.05]" />
                        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/[0.05]" />

                        <div className="relative flex items-center gap-2 text-white/40">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                                Community Stream
                            </p>
                        </div>

                        <h2 className="relative mt-2 text-xl font-black tracking-tight sm:text-2xl text-white/90">
                            Discover what people are sharing.
                        </h2>

                        <p className="relative mt-2 max-w-[430px] text-xs leading-relaxed text-white/50">
                            Explore live posts, share your thoughts, and connect with other developers and creators in the network.
                        </p>

                        {/* Feed Stats pills */}
                        <div className="relative mt-6 flex items-center gap-3">
                            <div className="rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2 shadow-sm">
                                <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">
                                    Total Posts
                                </p>
                                <p className="mt-0.5 text-sm font-black text-white">
                                    {posts.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2 shadow-sm">
                                <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">
                                    Status
                                </p>
                                <p className="mt-0.5 text-sm font-black text-emerald-400 flex items-center gap-1.5">
                                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                                    Active Feed
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ================= FEED HEADER ================= */}
                <div className="mx-auto mb-4 flex w-full max-w-[580px] items-center justify-between px-2">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                            Timeline
                        </p>
                        <h2 className="mt-0.5 text-sm font-bold text-white/90">
                            Recent Updates
                        </h2>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                        <span className="text-[10px] font-bold text-white/50">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'} available
                        </span>
                    </div>
                </div>

                {/* ================= POSTS SECTION ================= */}
                <section className="w-full">
                    {posts.length > 0 ? (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                />
                            ))}
                        </div>
                    ) : (
                        /* ================= EMPTY STATE ================= */
                        <div className="mx-auto flex min-h-[420px] w-full max-w-[580px] flex-col items-center justify-center rounded-[32px] border border-white/[0.08] bg-white/[0.02] px-6 text-center shadow-xl backdrop-blur-md">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/[0.08] bg-white/[0.04] shadow-2xl text-white/40">
                                <Inbox className="h-7 w-7" />
                            </div>

                            <h3 className="mt-5 text-base font-black text-white/90">
                                Your feed is empty
                            </h3>

                            <p className="mt-2 max-w-[340px] text-xs leading-relaxed text-white/40">
                                There are no posts available right now. Once members start sharing updates, they will appear here.
                            </p>
                        </div>
                    )}
                </section>

                {/* ================= BOTTOM FEED END ================= */}
                {posts.length > 0 && (
                    <div className="mx-auto flex max-w-[580px] items-center justify-center gap-4 py-12">
                        <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                            You're all caught up
                        </span>
                        <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                )}

            </div>
        </main>
    );
}

export default Home;