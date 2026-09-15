import { addCommentOnPost, createPost, deletePost } from '../api/posts.api.js';
import { useContext } from 'react';
import { MainContext } from '../context/main.context.jsx';
import toast from 'react-hot-toast';

const usePosts = () => {
    const { setLoading, initializeApp } = useContext(MainContext);

    const addComment = async (postId, commentText) => {
        try {
            setLoading(true);
            const updatedPost = await addCommentOnPost(postId, commentText);
            
            // Feed aur user posts dono ko fresh data ke liye sync kar dein
            await initializeApp(); // Ye function context mein define hai jo dono fetchAllPosts aur fetchAllUserPosts ko call karega
            toast.success("Comment added successfully!");

            return updatedPost;
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Error adding comment");
            throw error;
        } finally {
            setLoading(false); // 👈 Finally block akele hi loading band kar dega
        }
    };

    const createNewPost = async (formData) => {
        try {
            setLoading(true);
            const newPost = await createPost(formData);
            toast.success("Post created successfully!");
            // Feed aur user posts dono ko fresh data ke liye sync kar dein
            await initializeApp(); // Ye function context mein define hai jo dono fetchAllPosts aur fetchAllUserPosts ko call karega
            return newPost;
        } catch (error) {
            toast.error("Error creating post");
            console.error("Error creating post:", error);
            throw error;
        } finally {
            setLoading(false); // 👈 Finally block akele hi loading band kar dega
        }
    };
    const deleteExistingPost = async (postId) => {
        try {
            setLoading(true);
            const deletedPost = await deletePost(postId);
            toast.success("Post deleted successfully!");
            // Feed aur user posts dono ko fresh data ke liye sync kar dein
            await initializeApp(); // Ye function context mein define hai jo dono fetchAllPosts aur fetchAllUserPosts ko call karega
            return deletedPost;
        } catch (error) {
            toast.error("Error deleting post");
            console.error("Error deleting post:", error);
            throw error;
        } finally {
            setLoading(false); // 👈 Finally block akele hi loading band kar dega
        }
    };

    return { addComment, createNewPost, deleteExistingPost };
};

export default usePosts;