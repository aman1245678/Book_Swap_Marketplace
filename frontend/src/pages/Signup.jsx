import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";


export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await api.post("/auth/register", form);
        login(data);
        navigate("/");
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Signup</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    className="signup-input"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="signup-input"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="signup-input"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="signup-btn">Register</button>
            </form>
        </div>
    );
}
