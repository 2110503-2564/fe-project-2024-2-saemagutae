const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://coworking-reservation-backend.vercel.app/api/v1";

export async function registerUser(name: string, email: string, password: string, telephone: string, role: string) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            telephone,
            role
        })
    });

    const responseBody = await response.json();
    console.log(responseBody);

    if (!response.ok) {
        throw new Error(responseBody.message || "Failed to register user");
    }

    return responseBody;
}

export async function loginUser(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (!response.ok) {
        throw new Error("Failed to get user profile");
    }

    // console.log(response.json());
    return await response.json();
}

export async function logoutUser() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Failed to get user profile");
    }

    return await response.json();
}

export default async function getUserProfile(token: string) {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        throw new Error("Failed to get user profile");
    }

    return await response.json();
}