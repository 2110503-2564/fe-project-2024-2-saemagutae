export default async function getBooking(token: string, userId: string) {
  const response = await fetch(
    `https://coworking-reservation-backend.vercel.app/api/v1/reservations`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }

  const data = await response.json();

  const userBookings = data.data.filter(
    (booking: any) => booking.user.id === userId
  );

  return data;
}

export async function deleteBooking(token: string, reservationId: string) {
  const response = await fetch(
    `https://coworking-reservation-backend.vercel.app/api/v1/reservations/${reservationId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message || "Failed to delete reservation");
  }

  return await response.json();
}
