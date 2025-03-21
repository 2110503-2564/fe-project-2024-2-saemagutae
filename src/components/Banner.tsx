'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Banner() {
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    const covers = [
        "/images/cover1.jpg",
        "/images/cover2.jpg",
        "/images/cover3.jpg",
        "/images/cover4.jpg",
    ];

    return (
        <div className="relative w-full h-[50vh] overflow-hidden">
            <Image
                src={covers[index % covers.length]}
                alt="Co-working space"
                fill
                priority
                className="object-cover object-center brightness-75 transition-opacity duration-500"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Find Your Ideal Workspace
                </h1>
                <h3 className="text-base md:text-lg text-gray-200 mt-2">
                    Discover and book the perfect co-working space for your needs, hassle-free.
                </h3>

                <button
                    className="mt-6 bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-cyan-700 transition duration-300"
                    onClick={() => {
                        router.push("/reservation")
                    }}
                >
                    Reserve Now
                </button>
            </div>

            {
                session ? (
                    <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                        Welcome, {session.user?.name}
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
}
