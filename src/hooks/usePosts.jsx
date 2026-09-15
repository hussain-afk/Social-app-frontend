import { addCommentOnPost, createPost } from '../api/posts.api.js';
import { useContext } from 'react';
import { MainContext } from '../context/main.context.jsx';
import toast from 'react-hot-toast';

const usePosts = () => {
    const { setLoading, fetchAllPosts, fetchAllUserPosts } = useContext(MainContext);

    const addComment = async (postId, commentText) => {
        try {
            setLoading(true);
            const updatedPost = await addCommentOnPost(postId, commentText);
            
            // Feed aur user posts dono ko fresh data ke liye sync kar dein
            await Promise.all([
                fetchAllPosts(),
                fetchAllUserPosts ? fetchAllUserPosts() : Promise.resolve()
            ]);

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
            await Promise.all([
                fetchAllPosts(),
                fetchAllUserPosts ? fetchAllUserPosts() : Promise.resolve()
            ]);
            return newPost;
        } catch (error) {
            toast.error("Error creating post");
            console.error("Error creating post:", error);
            throw error;
        } finally {
            setLoading(false); // 👈 Finally block akele hi loading band kar dega
        }
    };

    return { addComment, createNewPost };
};

export default usePosts;