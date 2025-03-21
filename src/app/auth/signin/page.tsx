"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
            setError("Invalid credentials!");
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-2"
                />
                <button type="submit" className="w-full bg-cyan-600 text-white p-2 rounded">
                    Sign In
                </button>
            </form>
        </div>
    );
}
