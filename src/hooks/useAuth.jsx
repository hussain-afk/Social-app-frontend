import { register, login, editProfile } from "../api/auth.api";
import { useContext } from 'react';
import { MainContext } from "../context/main.context";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const useAuth = () => {
    const navigate = useNavigate();
    const { setUser, setLoading } = useContext(MainContext);

    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true);
            const response = await register(username, email, password);
            setUser(response);
            toast.success("Registered Successfully");
            navigate("/user");
        } catch (error) {
            // 🛡️ Safe error message extraction
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false); // 👈 Finally block dono jagah handle kar raha hai
        }
    };

    const handleLogin = async (username, password) => {
        try {
            setLoading(true);
            const response = await login(username, password);
            setUser(response);
            toast.success("Logged in Successfully");
            navigate("/user");
        } catch (error) {
            // 🛡️ Safe error message extraction
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = async (formData) => {
        try {
            setLoading(true);
            const response = await editProfile(formData);
            setUser(response);
            toast.success("Profile updated Successfully");
        } catch (error) {
            // 🛡️ Safe error message extraction
            const errorMessage = error.response?.data?.message || "Profile update failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return { handleRegister, handleLogin, handleEditProfile };
};

export default useAuth;