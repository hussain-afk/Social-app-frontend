import { createContext, useEffect, useState } from 'react';
import { getAllPosts, getAllUserPosts } from '../api/posts.api.js';
import { getCurrentUser } from '../api/auth.api.js';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initial load ke liye true rakhna behtar hai
    const [allPosts, setAllPosts] = useState([]);
    const [allUserPosts, setAllUserPosts] = useState([]);

    // 1. Fetch All Community Posts
    const fetchAllPosts = async () => {
        try {
            const posts = await getAllPosts();
            setAllPosts(posts || []);
        } catch (error) {
            console.error("Error fetching all posts:", error);
        }
    };

    // 2. Fetch Logged-in User Details
    const fetchCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser || null);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    // 3. Fetch Logged-in User's Personal Posts
    const fetchAllUserPosts = async () => {
        try {
            const userPosts = await getAllUserPosts();
            setAllUserPosts(userPosts || []);
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };

    // Initial Data Initialization on Mount
    const initializeApp = async () => {
        setLoading(true);
        try {
            // Teeno requests ko parallel ya sequential execute karein
            await Promise.all([
                fetchAllPosts(),
                fetchCurrentUser(),
                fetchAllUserPosts()
            ]);
        } catch (error) {
            console.error("Error initializing app context:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        initializeApp();
    }, []);

    return (
        <MainContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                allPosts,
                setAllPosts,
                allUserPosts,
                setAllUserPosts,
                fetchAllPosts,
                fetchAllUserPosts,
                fetchCurrentUser,
                initializeApp
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;