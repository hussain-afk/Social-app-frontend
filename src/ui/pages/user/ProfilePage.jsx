import React from 'react';
import Profile from '../../components/user/Profile';
import AllContent from '../../components/user/AllContent';
import { Sparkles } from 'lucide-react';

function ProfilePage() {
    return (
        <main className="relative min-h-screen bg-[#08080a] text-white font-sans selection:bg-white selection:text-black overflow-hidden pb-16">
            
            {/* ================= BACKGROUND AMBIENT GLOWS ================= */}
            <div className="pointer-events-none fixed -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[150px]" />
            <div className="pointer-events-none fixed top-1/3 -right-20 h-[350px] w-[350px] rounded-full bg-white/[0.015] blur-[130px]" />

            {/* ================= PAGE CONTAINER ================= */}
            <div className="relative mx-auto w-full max-w-[850px] px-4 sm:px-6 py-6 sm:py-8 space-y-8">
                
                {/* Profile Header & Bio Info Component */}
                <section className="w-full">
                    <Profile />
                </section>

                {/* Divider Line with Cyber Accent */}
                <div className="relative flex items-center justify-center my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.08]" />
                    </div>
                    <div className="relative flex items-center gap-2 bg-[#08080a] px-4 rounded-full border border-white/[0.08] py-1 text-white/40">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em]">
                            User Gallery
                        </span>
                    </div>
                </div>

                {/* User's Published Posts Grid (`AllContent`) */}
                <section className="w-full">
                    <AllContent />
                </section>

            </div>
        </main>
    );
}

export default ProfilePage;