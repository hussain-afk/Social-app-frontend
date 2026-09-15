import axios from "axios";

const api = axios.create({
    baseURL: "https://social-app-backend-inky.vercel.app/api/posts",
    headers: {
        "Content-Type": "application/json",
        // withCredentials: true,
    },
    withCredentials: true,
});

export const getAllPosts = async () => {
    try {
        const response = await api.get("/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw error;
    }
}

export const addCommentOnPost = async (postId, commentText) => {
    try {
        const response = await api.patch(`/comment/${postId}`, { content: commentText });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}

export const getAllUserPosts = async () => {
    try {
        const response = await api.get(`/user`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw error;
    }
}

export const createPost = async (formData) => {
    try {
        const response = await api.post("/create", formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}