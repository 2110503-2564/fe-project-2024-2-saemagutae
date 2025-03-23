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
      <div className="min-h-screen flex flex-col items-center justify-center mt-24 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  if (!sessionAvailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-24 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center">
          <img
            src="/images/loginfirst.png"
            alt="Booking illustration"
            className="w-[256px] h-[256px] mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Please log in to view your bookings.
          </h2>
          <Link href="/auth/signin">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-12 mt-24">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <img
              src="/images/nobooking.png"
              alt="Booking illustration"
              className="w-[256px] h-[256px] mb-4"
            />
            <p className="text-gray-600 text-lg mb-4">
              You haven’t made any bookings yet.
            </p>
            <Link href="/reservations">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
                Make a Reservation
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            {/* Booking list */}
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

            {/* Booking count */}
            <div className="mt-8 flex flex-col items-center">
              <p className="text-gray-700 font-medium mb-3">
                You have {bookings.length}/3 bookings
              </p>

              {bookings.length < 3 && (
                <Link href="/reservations">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
                    Make Another Reservation
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
