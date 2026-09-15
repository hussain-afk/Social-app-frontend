import React, { useState } from "react";
import usePosts from "../../../hooks/usePosts";

// Base URL of the API/uploads server, e.g. "https://api.example.com".
// Set VITE_API_URL (Vite) in your .env file. Falls back to same-origin
// if it isn't set, so this never throws even without the env var.
const API_BASE_URL =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "";

/**
 * Turns whatever the backend stored in `profilePicture` into a URL the
 * browser can actually load:
 *  - empty / null / undefined            -> null (Avatar shows initial)
 *  - already a full URL (http/https)     -> used as-is
 *  - a data: URI (base64)                -> used as-is
 *  - a bare filename or relative path    -> prefixed with API_BASE_URL
 */
function resolveImageUrl(raw) {
    if (!raw) return null;

    const value = String(raw).trim();
    if (!value) return null;

    if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) {
        return value;
    }

    const base = API_BASE_URL.replace(/\/+$/, "");
    const path = value.replace(/^\/+/, "");

    return base ? `${base}/${path}` : `/${path}`;
}

/**
 * Avatar
 * Shows the user's profile picture when one exists.
 * Falls back to the first letter of their username when it doesn't.
 * Used everywhere a username appears (header, comment composer, comment list)
 * so the rule is applied consistently across the card.
 */
function Avatar({ username, profilePicture, size = "md" }) {
    const [imgFailed, setImgFailed] = useState(false);

    const initial = username?.[0]?.toUpperCase() || "U";
    const resolvedSrc = resolveImageUrl(profilePicture);

    // Show the real photo only if one was provided AND it actually loads.
    // Any missing/bad/relative/expired URL silently falls back to the
    // initial, instead of a browser broken-image icon.
    const showImage = Boolean(resolvedSrc) && !imgFailed;

    const sizes = {
        sm: "h-8 w-8 rounded-xl text-[10px]",
        md: "h-12 w-12 rounded-[17px] text-xs",
    };

    return (
        <div
            className={`
                flex
                shrink-0
                items-center
                justify-center
                overflow-hidden
                border
                border-white/[0.08]
                bg-gradient-to-br
                from-[#1c1c22]
                to-[#131316]
                font-black
                text-white/80
                ${sizes[size]}
            `}
        >
            {showImage ? (
                <img
                    src={resolvedSrc}
                    alt={username || "User"}
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{initial}</span>
            )}
        </div>
    );
}

function PostCard({ post, currentUser }) {
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const { addComment } = usePosts();

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        try {
            setIsPosting(true);

            await addComment(post._id, commentText.trim());

            setCommentText("");
        } catch (error) {
            console.error("Comment error:", error);
        } finally {
            setIsPosting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const options = {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };

        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const username = post.userId?.username || "user_unknown";
    const profilePicture = post.userId?.profilePicture || null;

    const likesCount = (post.likes?.length || 0) + (isLiked ? 1 : 0);
    const commentsCount = post.comments?.length || 0;

    return (
        <article
            className="
                group
                relative
                mx-auto
                my-7
                w-full
                max-w-[580px]
                overflow-hidden
                rounded-[26px]
                border border-white/[0.08]
                bg-[#0d0d10]
                text-white
                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                transition-all
                duration-500
                hover:border-white/[0.16]
                hover:shadow-[0_28px_90px_rgba(0,0,0,0.65)]
            "
        >
            {/* Ambient Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    -top-28
                    h-56
                    w-56
                    rounded-full
                    bg-white/[0.03]
                    blur-3xl
                "
            />

            {/* =========================================
                HEADER
            ========================================== */}
            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-white/[0.06]
                    bg-white/[0.02]
                    px-5
                    py-4
                    sm:px-6
                "
            >
                <div className="flex min-w-0 items-center gap-3.5">
                    {/* Avatar */}
                    <div className="relative">
                        <div
                            className="
                                rounded-[17px]
                                bg-gradient-to-br
                                from-white/25
                                via-white/10
                                to-transparent
                                p-[1.5px]
                                shadow-[0_6px_20px_rgba(0,0,0,0.4)]
                            "
                        >
                            <Avatar
                                username={username}
                                profilePicture={profilePicture}
                                size="md"
                            />
                        </div>

                        {/* Online Indicator */}
                        <span
                            className="
                                absolute
                                -bottom-0.5
                                -right-0.5
                                h-3.5
                                w-3.5
                                rounded-full
                                border-[3px]
                                border-[#0d0d10]
                                bg-emerald-500
                                shadow-[0_0_10px_rgba(16,185,129,0.7)]
                            "
                        />
                    </div>

                    {/* User Info */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h3 className="truncate text-sm font-bold tracking-tight text-white">
                                @{username}
                            </h3>

                            <span
                                className="
                                    flex
                                    h-4
                                    w-4
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white
                                    text-black
                                "
                                title="Verified"
                            >
                                <svg className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/35">
                            <span className="font-medium">{formatDate(post.createdAt)}</span>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="text-white/30">Public</span>
                        </div>
                    </div>
                </div>

                {/* More Button */}
                <button
                    type="button"
                    aria-label="Post options"
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.03]
                        text-white/40
                        transition-all
                        duration-300
                        hover:border-white/10
                        hover:bg-white/[0.08]
                        hover:text-white
                        active:scale-90
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-white/40
                    "
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01"
                        />
                    </svg>
                </button>
            </div>

            {/* =========================================
                CAPTION
            ========================================== */}
            {post.caption && (
                <div className="px-5 pb-4 pt-5 sm:px-6">
                    <p className="text-[13px] font-medium leading-6 tracking-[0.01em] text-white/75">
                        {post.caption}
                    </p>
                </div>
            )}

            {/* =========================================
                MEDIA
            ========================================== */}
            {post.content && (
                <div
                    className="
                        relative
                        mx-2
                        overflow-hidden
                        rounded-[20px]
                        border
                        border-white/[0.07]
                        bg-black
                        shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            top-0
                            z-10
                            h-24
                            bg-gradient-to-b
                            from-black/30
                            to-transparent
                        "
                    />

                    {post.mediaType === "video" ? (
                        <video
                            src={post.content}
                            controls
                            className="block max-h-[560px] w-full bg-black object-contain"
                        />
                    ) : (
                        <img
                            src={post.content}
                            alt="Post content"
                            loading="lazy"
                            className="
                                block
                                max-h-[560px]
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                ease-out
                                group-hover:scale-[1.01]
                            "
                        />
                    )}

                    {post.mediaType === "video" && (
                        <div
                            className="
                                absolute
                                right-4
                                top-4
                                z-20
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/10
                                bg-black/60
                                px-3
                                py-1.5
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-widest
                                text-white/80
                                backdrop-blur-md
                            "
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Video
                        </div>
                    )}
                </div>
            )}

            {/* =========================================
                ENGAGEMENT SUMMARY
            ========================================== */}
            <div className="flex items-center justify-between px-6 pb-2 pt-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                        <span
                            className="
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                border-[#0d0d10]
                                bg-red-500
                            "
                        >
                            <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 24 24">
                                <path d="M12 21s-7-4.35-9.33-8.28C.74 9.46 2.5 5 6.5 5c2.04 0 3.38 1.18 4.5 2.33C12.12 6.18 13.46 5 15.5 5c4 0 5.76 4.46 3.83 7.72C19 16.65 12 21 12 21z" />
                            </svg>
                        </span>

                        <span
                            className="
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                border-[#0d0d10]
                                bg-white
                                text-black
                            "
                        >
                            <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 9V5a3 3 0 00-3-3l-4 9v11h9.28a2 2 0 001.94-1.515l1.38-6A2 2 0 0017.66 12H14z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
                                />
                            </svg>
                        </span>
                    </div>

                    <span className="text-[10px] font-semibold text-white/40">
                        {likesCount} {likesCount === 1 ? "like" : "likes"}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setShowComments(true)}
                    className="text-[10px] font-semibold text-white/35 transition-colors hover:text-white/70"
                >
                    {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
                </button>
            </div>

            {/* =========================================
                ACTION BAR
            ========================================== */}
            <div
                className="
                    mx-5
                    flex
                    items-center
                    justify-between
                    border-y
                    border-white/[0.06]
                    py-2
                    sm:mx-6
                "
            >
                {/* Like */}
                <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    aria-pressed={isLiked}
                    className="
                        group/action
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        py-2.5
                        transition-all
                        duration-300
                        hover:bg-white/[0.04]
                        active:scale-95
                    "
                >
                    <div
                        className={`
                            flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300
                            ${
                                isLiked
                                    ? "bg-red-500/10 text-red-500"
                                    : "text-white/45 group-hover/action:bg-white/5 group-hover/action:text-white"
                            }
                        `}
                    >
                        <svg
                            className={`h-[17px] w-[17px] transition-transform duration-300 ${
                                isLiked ? "scale-110 fill-red-500" : "fill-none"
                            }`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>

                    <span
                        className={`text-[10px] font-bold ${
                            isLiked ? "text-red-400" : "text-white/45 group-hover/action:text-white"
                        }`}
                    >
                        Like
                    </span>
                </button>

                {/* Comment */}
                <button
                    type="button"
                    onClick={() => setShowComments(!showComments)}
                    className="
                        group/action
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        py-2.5
                        text-white/45
                        transition-all
                        duration-300
                        hover:bg-white/[0.04]
                        hover:text-white
                        active:scale-95
                    "
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl transition-all group-hover/action:bg-white/5">
                        <svg className="h-[17px] w-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>

                    <span className="text-[10px] font-bold">Comment</span>
                </button>

                {/* Share */}
                <button
                    type="button"
                    className="
                        group/action
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        py-2.5
                        text-white/45
                        transition-all
                        duration-300
                        hover:bg-white/[0.04]
                        hover:text-white
                        active:scale-95
                    "
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl transition-all group-hover/action:bg-white/5">
                        <svg className="h-[17px] w-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14"
                            />
                        </svg>
                    </div>

                    <span className="text-[10px] font-bold">Share</span>
                </button>

                {/* Save */}
                <button
                    type="button"
                    onClick={() => setIsSaved(!isSaved)}
                    aria-label="Save post"
                    aria-pressed={isSaved}
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        text-white/45
                        transition-all
                        hover:bg-white/[0.04]
                        hover:text-white
                        active:scale-90
                    "
                >
                    <svg
                        className={`h-[17px] w-[17px] transition-all ${
                            isSaved ? "fill-white text-white" : "fill-none"
                        }`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                </button>
            </div>

            {/* =========================================
                COMMENTS
            ========================================== */}
            {showComments && (
                <div className="bg-[#111114] px-5 py-5 sm:px-6">
                    {/* Comments Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                                Conversation
                            </p>
                            <p className="mt-1 text-xs font-semibold text-white/70">
                                {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowComments(false)}
                            aria-label="Close comments"
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                text-white/30
                                transition
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            ×
                        </button>
                    </div>

                    {/* Comment Form */}
                    <form
                        onSubmit={handleCommentSubmit}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-1.5
                            transition-all
                            focus-within:border-white/15
                        "
                    >
                        <div className="ml-1">
                            <Avatar
                                username={currentUser?.username}
                                profilePicture={currentUser?.profilePicture}
                                size="sm"
                            />
                        </div>

                        <input
                            type="text"
                            name="content"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write something..."
                            className="
                                min-w-0
                                flex-1
                                bg-transparent
                                px-2
                                text-xs
                                text-white
                                outline-none
                                placeholder:text-white/25
                            "
                        />

                        <button
                            type="submit"
                            disabled={!commentText.trim() || isPosting}
                            className="
                                h-9
                                shrink-0
                                rounded-xl
                                bg-white
                                px-4
                                text-[10px]
                                font-black
                                text-black
                                transition-all
                                hover:bg-white/90
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            {isPosting ? "..." : "Post"}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div
                        className="
                            mt-5
                            max-h-[300px]
                            space-y-3
                            overflow-y-auto
                            pr-1
                            [scrollbar-color:rgba(255,255,255,0.15)_transparent]
                            [scrollbar-width:thin]
                        "
                    >
                        {!post.comments || post.comments.length === 0 ? (
                            <div className="py-8 text-center">
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.025]
                                    "
                                >
                                    <svg className="h-5 w-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>

                                <p className="mt-3 text-xs font-semibold text-white/35">No comments yet</p>
                                <p className="mt-1 text-[10px] text-white/20">
                                    Be the first to start the conversation.
                                </p>
                            </div>
                        ) : (
                            post.comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-white/[0.025]"
                                >
                                    <Avatar
                                        username={comment.userId?.username}
                                        profilePicture={comment.userId?.profilePicture}
                                        size="sm"
                                    />

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                            rounded-2xl
                                            rounded-tl-md
                                            border
                                            border-white/[0.06]
                                            bg-white/[0.025]
                                            px-3.5
                                            py-3
                                        "
                                    >
                                        <div className="mb-1.5 flex items-center justify-between gap-3">
                                            <span className="truncate text-[10px] font-black text-white/85">
                                                @{comment.userId?.username || "user"}
                                            </span>

                                            <span className="shrink-0 text-[8px] font-medium text-white/20">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>

                                        <p className="break-words text-[11px] leading-5 text-white/60">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </article>
    );
}

export default PostCard;