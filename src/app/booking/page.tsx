"use client";

import { useEffect, useState } from "react";
import getBooking, { deleteBooking } from "@/libraries/bookingAPI";
import getUserProfile from "@/libraries/userAPI";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function MyBookingPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [sessionAvailable, setSessionAvailable] = useState(true); // <== NEW

  useEffect(() => {
    const loadBookings = async () => {
      const session = await getSession();
      if (!session) {
        setSessionAvailable(false); // session doesn't exist
        setLoading(false); // stop loading spinner
        return;
      }

      const token = session.user.token;
      setToken(token);

      try {
        const me = await getUserProfile(token);
        const bookingRes = await getBooking(token, me.id);
        setBookings(bookingRes.data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleDelete = async (reservationId: string) => {
    try {
      await deleteBooking(token, reservationId);
      setBookings((prev) =>
        prev.filter((booking) => booking.reservation_id !== reservationId)
      );
    } catch (error: any) {
      alert(error.message || "Failed to delete booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-24">
        <p className="text-lg text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  if (!sessionAvailable) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-24 text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please log in to view your bookings.
        </h2>
        <Link href="/auth/signin">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow transition">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen mt-24 px-6 py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600">You haven’t made any bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking: any) => (
              <div
                key={booking.reservation_id}
                className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {booking.space.name}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Address:</strong> {booking.space.address}
                  </p>
                  <p className="text-gray-600">
                    <strong>Reservation Date:</strong>{" "}
                    {new Date(booking.reservation_date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(booking.reservation_id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
