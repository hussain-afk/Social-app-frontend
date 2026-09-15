import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// user pages
import RootLayout from '../ui/pages/user/RootLayout';
import Home from '../ui/pages/user/Home';
import UserAuthPage from '../ui/pages/user/UserAuthPage';
import ProfilePage from '../ui/pages/user/ProfilePage';
// context 
import { MainContext } from '../context/main.context';
import CreatePostPage from '../ui/pages/user/CreatePostPage';

function Routing() {
  const { user, loading } = useContext(MainContext); // 👈 loading state bhi nikal li

  const ProtectedRoutes = ({ children }) => {
    // 1. Agar app abhi data fetch kar rahi hai, toh blank ya loading spinner dikhayein
    if (loading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-[#08080a] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Verifying session...</p>
          </div>
        </div>
      );
    }

    // 2. Agar loading khatam ho chuki hai aur user null hai, tab login par bhejain
    if (!user) {
      return <Navigate to="/" replace />;
    }
    if(user){
      return <Navigate to="/user" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<UserAuthPage />} />
      <Route path="/user" element={<RootLayout />}>
        <Route 
          index 
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } 
        />
        <Route path="test" element={<h1>testing</h1>} />
        <Route 
          path="me/:id" 
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="create-post" 
          element={
            <ProtectedRoutes>
              <CreatePostPage />
            </ProtectedRoutes>
          } 
        />
      </Route>
    </Routes>
  );
}

export default Routing;