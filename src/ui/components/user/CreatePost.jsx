import React, { useEffect, useRef, useState } from "react";
import usePosts from "../../../hooks/usePosts";
import { ImagePlus, Video, X, Loader2, Upload, AlertCircle } from "lucide-react";

const CAPTION_LIMIT = 280;

function CreatePost() {
    const { createNewPost } = usePosts();

    const [caption, setCaption] = useState("");
    const [content, setContent] = useState(null);
    const [mediaType, setMediaType] = useState("image");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef(null);
    const previewUrl = useRef(null);
    const [preview, setPreview] = useState(null);

    // Build / clean up the object URL whenever the selected file changes.
    useEffect(() => {
        if (previewUrl.current) {
            URL.revokeObjectURL(previewUrl.current);
            previewUrl.current = null;
        }

        if (content) {
            const url = URL.createObjectURL(content);
            previewUrl.current = url;
            setPreview(url);
        } else {
            setPreview(null);
        }

        return () => {
            if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
        };
    }, [content]);

    const pickFile = (file) => {
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
            setError("Please choose an image or video file.");
            return;
        }

        setError("");
        setMediaType(isVideo ? "video" : "image");
        setContent(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        pickFile(e.dataTransfer.files?.[0]);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!caption.trim() && !content) {
            setError("Write a caption or add media before posting.");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("content", content);
        formData.append("mediaType", mediaType);

        try {
            setError("");
            setIsSubmitting(true);

            const newPost = await createNewPost(formData);
            console.log("New post created:", newPost);

            setCaption("");
            setContent(null);
            setMediaType("image");
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Something went wrong while posting. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const captionLength = caption.length;
    const isOverLimit = captionLength > CAPTION_LIMIT;
    const canSubmit = (caption.trim() || content) && !isOverLimit && !isSubmitting;

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0c] px-4 py-10">
        <div
            className="
                relative
                mx-auto
                w-full
                max-w-[580px]
                overflow-hidden
                rounded-[26px]
                border border-white/[0.08]
                bg-[#0d0d10]
                text-white
                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
        >
            {/* Ambient Glow */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-56 w-56 rounded-full bg-white/[0.03] blur-3xl" />

            {/* Header */}
            <div className="relative border-b border-white/[0.06] bg-white/[0.02] px-6 py-5">
                <h2 className="text-sm font-bold tracking-tight text-white">Create post</h2>
                <p className="mt-1 text-[11px] text-white/35">Share a photo, a video, or just your thoughts.</p>
            </div>

            <form onSubmit={handleCreatePost} className="relative flex flex-col gap-4 px-6 py-5">
                {/* Caption */}
                <div className="space-y-1.5">
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        name="caption"
                        rows={3}
                        placeholder="What's on your mind?"
                        className="
                            w-full
                            resize-none
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/40
                            px-4
                            py-3
                            text-xs
                            text-white
                            placeholder-white/20
                            shadow-inner
                            outline-none
                            transition-all
                            focus:border-white/30
                            focus:bg-black/55
                        "
                    />
                    <p
                        className={`text-right text-[10px] ${
                            isOverLimit ? "font-semibold text-red-400" : "text-white/25"
                        }`}
                    >
                        {captionLength}/{CAPTION_LIMIT}
                    </p>
                </div>

                {/* Media dropzone */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-dashed
                        transition-all
                        ${
                            isDragging
                                ? "border-white/40 bg-white/[0.05]"
                                : "border-white/10 bg-black/30 hover:border-white/20"
                        }
                    `}
                >
                    {preview ? (
                        <div className="relative">
                            {mediaType === "video" ? (
                                <video src={preview} controls className="block max-h-[320px] w-full bg-black object-contain" />
                            ) : (
                                <img src={preview} alt="Selected media" className="block max-h-[320px] w-full object-cover" />
                            )}

                            <button
                                type="button"
                                onClick={() => setContent(null)}
                                aria-label="Remove media"
                                className="
                                    absolute
                                    right-3
                                    top-3
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-black/60
                                    text-white/80
                                    backdrop-blur-md
                                    transition-all
                                    hover:bg-black/80
                                    hover:text-white
                                    active:scale-90
                                "
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                                <Upload className="h-4.5 w-4.5 text-white/40" />
                            </div>
                            <p className="text-xs font-semibold text-white/70">
                                Drag and drop, or <span className="text-white">browse</span>
                            </p>
                            <p className="text-[10px] text-white/25">Image or video, up to 50MB</p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="content"
                                accept="image/*,video/*"
                                onChange={(e) => pickFile(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Media type segmented control */}
                <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5">
                    <button
                        type="button"
                        onClick={() => setMediaType("image")}
                        className={`
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-1.5
                            rounded-xl
                            py-2
                            text-[11px]
                            font-bold
                            transition-all
                            ${
                                mediaType === "image"
                                    ? "bg-white text-black"
                                    : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                            }
                        `}
                    >
                        <ImagePlus className="h-3.5 w-3.5" /> Image
                    </button>

                    <button
                        type="button"
                        onClick={() => setMediaType("video")}
                        className={`
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-1.5
                            rounded-xl
                            py-2
                            text-[11px]
                            font-bold
                            transition-all
                            ${
                                mediaType === "video"
                                    ? "bg-white text-black"
                                    : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                            }
                        `}
                    >
                        <Video className="h-3.5 w-3.5" /> Video
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2.5 text-[11px] font-medium text-red-300">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="
                        mt-1
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-white
                        py-3.5
                        text-xs
                        font-black
                        text-black
                        shadow-lg
                        transition-all
                        hover:bg-white/90
                        active:scale-[0.99]
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                        disabled:active:scale-100
                    "
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Posting...
                        </>
                    ) : (
                        "Share post"
                    )}
                </button>
            </form>
        </div>
        </div>
    );
}

export default CreatePost;