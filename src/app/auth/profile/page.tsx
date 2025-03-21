import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getUserProfile from "@/libraries/userAPI";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    const profile = await getUserProfile(session.user.token);
    console.log(profile);

    return (
        <main className="min-h-screen pt-24 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <p className="mt-1 text-lg text-gray-900">
                            {profile.data.name || 'N/A'}
                        </p>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-lg text-gray-900">
                            {profile.data.email}
                        </p>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="mt-1 text-lg text-gray-900">
                            {profile.data.telephone || 'N/A'}
                        </p>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-500">Role</label>
                        <p className="mt-1 text-lg text-gray-900">
                            {profile.data.role || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* <button
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    className="mt-8 w-full sm:w-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                    Sign Out
                </button> */}
            </div>
        </main>
    )
}