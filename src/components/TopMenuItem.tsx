'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    const currentPath = usePathname();

    return (
        <Link
            href={pageRef}
            className={
                `text-sm font-medium px-3 py-1 transition-all duration-300 border-b-2 transform
                ${currentPath === pageRef
                    ? "text-black font-bold border-cyan-600"
                    : `
                        text-gray-500 
                        border-transparent 
                        hover:text-cyan-700 
                        hover:border-cyan-400 
                        hover:-translate-y-[2px]
                        active:translate-y-0
                    `
                }`
            }
        >
            {title}
        </Link>
    );
}