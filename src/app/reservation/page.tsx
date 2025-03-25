"use client";

import { useState, useEffect } from "react";
import { createBooking } from "@/libraries/bookingAPI";
import getSpaces from "@/libraries/spacesAPI";
import { useSession } from "next-auth/react";
import getBooking from "@/libraries/bookingAPI";
import { deleteBooking } from "@/libraries/bookingAPI";
import getUserProfile from "@/libraries/userAPI";

export default function BookingForm() {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxDateObj = new Date();
  maxDateObj.setMonth(today.getMonth() + 1); // Add 1 month
  const maxDate = maxDateObj.toISOString().split("T")[0];
  const { data: session } = useSession();

  const [spaces, setSpaces] = useState<any[]>([]);
  const [spaceId, setSpaceId] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const getImageForSpace = (space: any) => {
    switch (space.space_id) {
      case 1:
        return "/images/pyramid.jpg";
      case 2:
        return "/images/cat-cafe.png";
      case 3:
        return "/images/moon-lounge.jpg";
      default:
        return "/images/default.jpg";
    }
  };

  const selectedSpace = spaces.find((space) => space.space_id === spaceId);

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const res = await getSpaces();
        setSpaces(res.data); // assuming the response shape is { data: [...] }
      } catch (err) {
        console.error(err);
        setError("Could not load spaces.");
      }
    };
    loadSpaces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setIsSubmitting(true); // ⏳ Start loading

    if (!session) {
      setError("You must be logged in.");
      setIsSubmitting(false);
      return;
    }

    if (!spaceId || !date) {
      setError("Please select both space and date.");
      setIsSubmitting(false);
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to book this space on ${date}?`
    );
    if (!confirm) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = session.user.token;

      const me = await getUserProfile(token);
      const existing = await getBooking(token, me.id);
      const sameDayBooking = existing.data.find(
        (b: any) => b.reservation_date.split("T")[0] === date
      );

      if (sameDayBooking) {
        await deleteBooking(token, sameDayBooking.reservation_id);
      }

      await createBooking(token, {
        space_id: spaceId,
        reservation_date: date,
      });

      setSuccess("Booking created successfully!");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false); // ✅ Done
    }
  };

  return (
    <main className="min-h-screen pt-40 px-4 bg-gray-50 flex flex-col items-center">
      {/* Left image */}
      <div className="flex justify-center items-start gap-6">
        <img
          src="/images/left-banner.jpg" // change this to your own image path
          alt="Left Banner"
          className="hidden md:block w-32 h-[500px] object-cover rounded-xl border-4 border-transparent animate-borderGlow"
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md bg-white shadow-lg rounded-xl p-6"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center animate-rainbow drop-shadow">
            Book a Space
          </h2>
          <img
            src={
              selectedSpace
                ? getImageForSpace(selectedSpace)
                : "/images/default.png"
            }
            alt="Space"
            className="w-full h-48 object-cover rounded-lg mb-4 shadow transition duration-300 ease-in-out hover:scale-105"
          />

          {/* Space dropdown */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Select Space
            </label>
            <select
              value={spaceId ?? ""}
              onChange={(e) => setSpaceId(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="" disabled>
                -- Choose a space --
              </option>
              {spaces.map((space) => (
                <option key={space.space_id} value={space.space_id}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date picker */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              min={minDate}
              max={maxDate}
            />
          </div>

          <button
            type="submit"
            className={`flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition duration-200 ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting ? "Booking..." : "Book Now"}
          </button>

          {success && <p className="text-green-500 text-sm">{success}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {/* Right image */}
        <img
          src="/images/right-banner.jpg" // change this too
          alt="Right Banner"
          className="hidden md:block w-32 h-[500px] object-cover rounded-xl border-4 border-transparent animate-borderGlow"
        />
      </div>
      {!session && (
        <div className="flex justify-center items-center gap-3 pt-2 border-t mt-4">
          <p className="text-gray-600 text-sm">Not logged in?</p>
          <a
            href="/auth/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm transition"
          >
            Sign In
          </a>
        </div>
      )}
    </main>
  );
}
