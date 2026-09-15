import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../../context/main.context';
import { Eye, EyeOff, ImagePlus } from "lucide-react";

import Modal from '../Modal';
import useAuth from '../../../hooks/useAuth';
import { 
    Edit3, 
    Share2, 
    Phone, 
    Mail, 
    ShieldCheck, 
    Sparkles, 
    Camera, 
    Lock, 
    User, 
    FileText 
} from 'lucide-react';
import toast from 'react-hot-toast';

function Profile() {
    const { id } = useParams();
    const { user } = useContext(MainContext);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const { handleEditProfile } = useAuth();

    // Edit profile modal states pre-filled with existing user data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    // Pre-fill form fields when user data is available
    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setBio(user.bio || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Build FormData for multipart upload
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("phoneNumber", phoneNumber);
        if (password) formData.append("password", password);

        if (profilePicture) formData.append("profilePicture", profilePicture);
        if (bannerImage) formData.append("bannerImage", bannerImage);

        // 2. Dispatch to auth hook
        await handleEditProfile(formData);
        setIsEditProfileModalOpen(false); 
    };

    const handleShareProfile = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Profile link copied to clipboard!");
    };

    return (
        <div className="min-h-screen text-white font-sans py-8 px-4 sm:px-6 selection:bg-white selection:text-black">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* ================= BANNER & PROFILE HEADER ================= */}
                <div className="relative rounded-[32px] border border-white/10 bg-[#101014] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    
                    {/* Banner Image Area */}
                    <div className="h-48 sm:h-72 w-full bg-gradient-to-r from-zinc-900 via-neutral-900 to-black relative overflow-hidden">
                        {user?.bannerImage ? (
                            <img 
                                src={user.bannerImage} 
                                alt="Cover Banner" 
                                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-6 sm:px-10 pb-8 pt-0 relative">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-22 mb-6 gap-4">
                            
                            {/* Profile Picture */}
                            <div className="relative group">
                                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-[30px] bg-[#101014] p-1.5 shadow-2xl border border-white/10">
                                    <div className="h-full w-full rounded-[24px] bg-[#18181c] flex items-center justify-center font-black text-3xl text-white overflow-hidden shadow-inner relative">
                                        {user?.profilePicture ? (
                                            <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <span className="bg-gradient-to-tr from-white to-white/60 bg-clip-text text-transparent">
                                                {user?.username?.[0]?.toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="absolute bottom-3 right-3 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-[#101014] shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button 
                                    onClick={() => setIsEditProfileModalOpen(true)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black text-xs font-black hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/5"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit Profile</span>
                                </button>
                                <button 
                                    onClick={handleShareProfile}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 active:scale-95 transition-all backdrop-blur-md"
                                >
                                    <Share2 className="w-3.5 h-3.5 text-white/70" />
                                    <span className="hidden sm:inline">Share</span>
                                </button>
                            </div>
                        </div>

                        {/* User Details & Bio */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white/90">
                                    {user?.username || "Loading user..."}
                                </h1>
                                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/50 shadow-inner">
                                    ID: {id?.slice(-6) || "mhm-usr"}
                                </span>
                            </div>

                            <p className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-white/30" />
                                {user?.email || "No email provided"}
                            </p>

                            <p className="text-xs text-white/70 leading-relaxed max-w-xl pt-1 font-normal">
                                {user?.bio || "No bio added yet. Tell the community something about yourself and your projects!"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= EXTRA DETAILS GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Contact Info Card */}
                    <div className="rounded-[28px] border border-white/10 bg-[#101014] p-6 space-y-4 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-white/40">
                            <Phone className="w-3.5 h-3.5" />
                            <p className="text-[10px] uppercase font-extrabold tracking-[0.2em]">
                                Contact Details
                            </p>
                        </div>
                        <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between text-xs rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                <span className="text-white/40 font-medium">Phone Number</span>
                                <span className="font-mono text-white/90 font-bold">{user?.phoneNumber || "Not specified"}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                <span className="text-white/40 font-medium">Email Address</span>
                                <span className="font-mono text-white/90 font-bold truncate max-w-[180px]">{user?.email || "Not specified"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Status Card */}
                    <div className="rounded-[28px] border border-white/10 bg-[#101014] p-6 space-y-4 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-white/40">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <p className="text-[10px] uppercase font-extrabold tracking-[0.2em]">
                                Security & Status
                            </p>
                        </div>
                        <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between text-xs rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                <span className="text-white/40 font-medium">Membership</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                                    Active & Verified
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                <span className="text-white/40 font-medium">Account Type</span>
                                <span className="font-mono text-white/80 font-bold">Full-Stack Creator</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* ================= EDIT PROFILE MODAL ================= */}
            <Modal
    isOpen={isEditProfileModalOpen}
    onClose={() => setIsEditProfileModalOpen(false)}
    title="Edit Profile Settings"
>
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">

        {/* Identity Preview */}
        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 to-transparent text-sm font-black text-white/70">
                {profilePicture ? (
                    <img
                        src={URL.createObjectURL(profilePicture)}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    username?.[0]?.toUpperCase() || "U"
                )}
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{username || "Your name"}</p>
                <p className="truncate text-[11px] text-white/35">{email || "your@email.com"}</p>
            </div>
        </div>

        {/* Username Input */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <User className="w-3 h-3" /> Username
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-black/55 transition-all shadow-inner"
            />
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> Email Address
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-black/55 transition-all shadow-inner"
            />
        </div>

        {/* Bio Input */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <FileText className="w-3 h-3" /> Bio / Description
            </label>
            <textarea
                rows="2"
                maxLength={160}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell something about yourself..."
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-black/55 transition-all shadow-inner resize-none"
            />
            <p className="text-right text-[10px] text-white/25">{(bio?.length || 0)}/160</p>
        </div>

        {/* Phone Number Input */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <Phone className="w-3 h-3" /> Phone Number
            </label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-black/55 transition-all shadow-inner"
            />
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Profile Picture File Upload */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <Camera className="w-3 h-3" /> Profile Picture
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2.5 cursor-pointer hover:border-white/25 hover:bg-black/40 transition-all">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                    {profilePicture ? (
                        <img
                            src={URL.createObjectURL(profilePicture)}
                            alt="Profile picture"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImagePlus className="h-5 w-5 text-white/25" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white/80">
                        {profilePicture ? profilePicture.name : "Choose profile picture"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/30">PNG or JPG, up to 5MB</p>
                </div>
                <span className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-[10px] font-bold text-white hover:bg-white/20 transition-colors">
                    Browse
                </span>
                <input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    accept="image/*"
                    className="hidden"
                />
            </label>
        </div>

        {/* Banner Image File Upload */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" /> Cover Banner Image
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2.5 cursor-pointer hover:border-white/25 hover:bg-black/40 transition-all">
                <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                    {bannerImage ? (
                        <img
                            src={URL.createObjectURL(bannerImage)}
                            alt="Banner preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImagePlus className="h-5 w-5 text-white/25" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white/80">
                        {bannerImage ? bannerImage.name : "Choose banner image"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/30">PNG or JPG, up to 5MB</p>
                </div>
                <span className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-[10px] font-bold text-white hover:bg-white/20 transition-colors">
                    Browse
                </span>
                <input
                    type="file"
                    onChange={(e) => setBannerImage(e.target.files[0])}
                    accept="image/*"
                    className="hidden"
                />
            </label>
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Password Input */}
        <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> New Password (Optional)
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-11 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-black/55 transition-all shadow-inner"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-white text-black font-black text-xs rounded-2xl hover:bg-white/90 active:scale-[0.99] transition-all shadow-lg"
        >
            Save All Changes
        </button>
    </form>
</Modal>
        </div>
    );
}

export default Profile;