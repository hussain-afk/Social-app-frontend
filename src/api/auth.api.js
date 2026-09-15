import axios from "axios";

const api = axios.create({
    // http://localhost:4000
    // https://social-app-backend-inky.vercel.app
    baseURL: "https://social-app-backend-inky.vercel.app/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const register = async (username, email, password) => {
    try {
        const response = await api.post("/register", { username, email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (username, password) => {
    try {
        const response = await api.post("/login", { username, password });
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/me");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editProfile = async (formData) => {
    try {
        // 👈 Ab hum direct formData bhej rahe hain jo component se aayega
        const response = await api.patch("/updateProfile", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Multer ke liye zaroori hai
            }
        });
        return response.data;
    } catch (error) {
        throw error; // Error ko throw karna zaroori hai taake catch block mein toast show ho sake
    }
};