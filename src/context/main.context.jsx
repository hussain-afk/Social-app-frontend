import { createContext, useEffect, useState, useCallback } from 'react';
import { getAllPosts, getAllUserPosts } from '../api/posts.api.js';
import { getCurrentUser } from '../api/auth.api.js';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);
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
            setUserState(currentUser || null);
        } catch (error) {
            console.error("Error fetching current user:", error);
            setUserState(null);
        }
    };

    // 3. Fetch Logged-in User's Personal Posts
    const fetchAllUserPosts = async () => {
        try {
            const userPosts = await getAllUserPosts();
            setAllUserPosts(userPosts || []);
        } catch (error) {
            console.error("Error fetching user posts:", error);
            setAllUserPosts([]);
        }
    };

    // Initial Data Initialization on Mount
    const initializeApp = async () => {
        setLoading(true);
        try {
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

    // 👇 CUSTOM setUser: Jab bhi user login/signup ya update ho, yeh automatically user ki posts bhi fetch kar lega
    const setUser = useCallback(async (newUser) => {
        setUserState(newUser);
        if (newUser) {
            // Agar user login ho gaya hai, toh uski personal posts foran fetch karo
            await fetchAllUserPosts();
        } else {
            // Agar logout ho gaya hai, toh posts clear kar do
            setAllUserPosts([]);
        }
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