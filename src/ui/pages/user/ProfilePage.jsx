import React, { useState, useContext } from 'react';
import Profile from '../../components/user/Profile';
import AllContent from '../../components/user/AllContent';
import { Sparkles, Grid, Bookmark, Heart } from 'lucide-react';
import { MainContext } from '../../../context/main.context';

function ProfilePage() {
    const { allUserPosts } = useContext(MainContext);
    const [activeTab, setActiveTab] = useState('posts'); // Future tabs ke liye state

    return (
        <main className="relative min-h-screen bg-[#08080a] text-white font-sans selection:bg-white selection:text-black overflow-hidden pb-20">
            
            {/* ================= BACKGROUND AMBIENT GLOWS ================= */}
            <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent blur-[160px]" />
            <div className="pointer-events-none fixed top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.02] blur-[140px]" />
            <div className="pointer-events-none fixed bottom-10 -left-20 h-[300px] w-[300px] rounded-full bg-purple-500/[0.02] blur-[120px]" />

            {/* ================= PAGE CONTAINER ================= */}
            <div className="relative mx-auto w-full max-w-[850px] px-4 sm:px-6 py-6 sm:py-10 space-y-8">
                
                {/* Profile Header & Bio Info Component */}
                <section className="w-full animate-fadeIn">
                    <Profile />
                </section>

                {/* ================= INTERACTIVE CONTENT TABS ================= */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-white/[0.08] pb-4">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            activeTab === 'posts'
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
                        }`}
                    >
                        <Grid className="w-3.5 h-3.5" />
                        <span>Posts</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'posts' ? 'bg-black/10 text-black' : 'bg-white/10 text-white/80'}`}>
                            {allUserPosts?.length || 0}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            activeTab === 'saved'
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
                        }`}
                    >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Saved</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('liked')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            activeTab === 'liked'
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
                        }`}
                    >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Liked</span>
                    </button>
                </div>

                {/* ================= USER'S PUBLISHED POSTS GRID (`AllContent`) ================= */}
                <section className="w-full">
                    {activeTab === 'posts' && <AllContent />}
                    {activeTab === 'saved' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px] border border-white/10 bg-[#121214] p-8">
                            <Bookmark className="w-8 h-8 text-white/20 mb-3" />
                            <h4 className="text-sm font-bold text-white">No Saved Posts</h4>
                            <p className="text-xs text-white/40 mt-1">Posts you bookmark will appear here.</p>
                        </div>
                    )}
                    {activeTab === 'liked' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px] border border-white/10 bg-[#121214] p-8">
                            <Heart className="w-8 h-8 text-white/20 mb-3" />
                            <h4 className="text-sm font-bold text-white">No Liked Posts</h4>
                            <p className="text-xs text-white/40 mt-1">Posts you like will appear here.</p>
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

export default ProfilePage;