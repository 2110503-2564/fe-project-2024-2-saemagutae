import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TopMenu() {

    const session = await getServerSession(authOptions);
    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/spaces' },
        { name: 'Reservation', path: '/reservation' },
        { name: 'About', path: '/about' }
    ];

    const accountMenu = [];
    if (session) {
        accountMenu.push({ name: 'Profile', path: '/auth/profile' });
        accountMenu.push({ name: 'Sign Out', path: '/auth/signout' });
    } else {
        accountMenu.push({ name: 'Register', path: '/auth/register' });
        accountMenu.push({ name: 'Sign In', path: '/auth/signin' });
    }


    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-xl rounded-xl m-3 flex items-center px-6 h-16 z-50">
            <div className="flex items-center space-x-6">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    priority
                    className="w-auto h-auto"
                />

                <nav className="flex space-x-6">
                    {menuItems.map((item) => (
                        <TopMenuItem
                            key={item.name}
                            title={item.name}
                            pageRef={item.path}
                        />
                    ))}
                </nav>
            </div>

            <div className="ml-auto flex space-x-6">
                <nav className="flex space-x-6">
                    {accountMenu.map((item) => (
                        <TopMenuItem
                            key={item.name}
                            title={item.name}
                            pageRef={item.path}
                        />
                    ))}
                </nav>
            </div>
        </header>
    );
}
