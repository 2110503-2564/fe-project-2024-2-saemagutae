"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Are you sure you want to sign out?</h2>
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Yes, Sign Out
            </button>
        </div>
    );
}
