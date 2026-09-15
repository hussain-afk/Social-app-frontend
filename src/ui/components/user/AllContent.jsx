import React, { useContext } from 'react';
import { MainContext } from '../../../context/main.context';
import usePosts from '../../../hooks/usePosts';
import { Layers, Sparkles, FolderOpen, Grid, Heart, MessageSquare, Play, Trash2 } from 'lucide-react';

function AllContent() {
    const { allUserPosts, loading } = useContext(MainContext);
    const posts = allUserPosts || [];

    const { deleteExistingPost } = usePosts();

    const handleDeleteClick =  async (e, postId) => {
        e.stopPropagation();
        console.log("Delete clicked for post ID:", postId);
        await deleteExistingPost(postId);
        // 👉 Yahan aap apni delete function/logic likhein ge
    };

    return (
        <div className="w-full max-w-[800px] mx-auto py-6 px-4 sm:px-6 font-sans">
            
            {/* ================= HEADER SECTION ================= */}
            <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[#121214] px-6 py-5 shadow-xl mb-6 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-inner">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-sm font-black tracking-tight text-white">
                                My Posts Grid
                            </h2>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <p className="text-[11px] text-white/40 font-medium mt-0.5">
                            Your gallery of shared content
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/80 shadow-sm">
                    <Grid className="w-3.5 h-3.5 text-white/50" />
                    <span>{posts.length} {posts.length === 1 ? 'Item' : 'Items'}</span>
                </div>
            </div>

            {/* ================= GRID CONTENT STREAM ================= */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] rounded-[28px] border border-white/10 bg-[#121214]/50 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
                    <p className="text-xs font-bold text-white/40 tracking-wider uppercase">Loading gallery...</p>
                </div>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {posts.map((post) => (
                        <div 
                            key={post._id} 
                            className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#161619] border border-white/10 cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-black/50"
                        >
                            {/* Media Rendering */}
                            {post.mediaType === "video" ? (
                                <div className="relative w-full h-full">
                                    <video 
                                        src={post.content} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white">
                                        <Play className="w-3.5 h-3.5 fill-white" />
                                    </div>
                                </div>
                            ) : (
                                <img 
                                    src={post.content} 
                                    alt={post.caption || "Post thumbnail"} 
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* 👇 ALWAYS VISIBLE DELETE BUTTON (Top-Left Corner) - Mobile & Desktop Friendly */}
                            <button
                                type="button"
                                onClick={(e) => handleDeleteClick(e, post._id)}
                                title="Delete post"
                                className="absolute top-2.5 left-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-xl bg-black/70 border border-white/15 text-red-400 backdrop-blur-md hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Bottom Gradient Overlay for Likes & Comments (Clean & Always Visible) */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex items-center justify-between text-white text-[11px] font-bold">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                                    <span>{post.likes?.length || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 fill-white text-white" />
                                    <span>{post.comments?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#121214] p-12 text-center shadow-2xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 mb-4 shadow-inner">
                        <FolderOpen className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-black text-white">No Posts in Gallery</h3>
                    <p className="text-xs text-white/40 mt-1 max-w-[280px] leading-relaxed">
                        You haven't shared any content yet. Once you post, they will show up here in a grid.
                    </p>
                </div>
            )}

        </div>
    );
}

export default AllContent;