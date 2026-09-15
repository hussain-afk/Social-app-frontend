import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// user pages
import RootLayout from '../ui/pages/user/RootLayout';
import Home from '../ui/pages/user/Home';
import UserAuthPage from '../ui/pages/user/UserAuthPage';
import ProfilePage from '../ui/pages/user/ProfilePage';
import CreatePostPage from '../ui/pages/user/CreatePostPage';
// context 
import { MainContext } from '../context/main.context';

function Routing() {
  const { user, loading } = useContext(MainContext);

  // 1. Protected Routes (Agar user nahi hai toh login par bhejo)
  const ProtectedRoutes = ({ children }) => {
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

    if (!user) {
      return <Navigate to="/" replace />;
    }

    // ❌ Purana `if(user) return <Navigate to="/user"/>` yahan se hata diya hai taake loop na bane

    return children;
  };

  // 2. Public / Auth Route (Agar user PEHLE SE logged-in hai, toh auth page na dikhao, seedha /user par bhejo)
  const PublicRoute = ({ children }) => {
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

    if (user) {
      return <Navigate to="/user" replace />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Root path par PublicRoute laga di */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <UserAuthPage />
          </PublicRoute>
        } 
      />

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