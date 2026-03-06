import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/FormatDate";

interface Booking {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/bookings/my/${user.id}`);

      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          My Bookings
        </h2>

        {loading && (
          <div className="text-center text-gray-500">Loading bookings...</div>
        )}

        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No bookings found.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-gray-800 text-white rounded-xs shadow-md p-5 hover:shadow-xl transition border"
            >

              <h3 className="text-lg font-semibold text-white mb-3">
                {b.name}
              </h3>

              <div className="text-sm text-white space-y-1">
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  {formatDate(b.start_date)}
                </p>

                <p>
                  <span className="font-medium">End:</span>{" "}
                  {formatDate(b.end_date)}
                </p>
              </div>

              <div className="mt-4 text-xs text-white">
                Booking ID: {b.id}
              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default MyBookings;