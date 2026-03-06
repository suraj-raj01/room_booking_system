import { useEffect, useState } from "react";
import API from "../services/api";
import RoomCard from "../components/RoomCard";

interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  price_per_night: number;
}

const AvailableRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch rooms once
  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  const fetchAvailableRooms = async () => {
    try {
      const res = await API.get("/rooms/availablerooms");
      setRooms(res.data.data || []);
      console.log(res.data.data)
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (roomId: number) => {
    setSelectedRoom(roomId);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setStartDate("");
    setEndDate("");
    setError("");
    setSuccess("");
  };

  const bookRoom = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!startDate || !endDate) {
        setError("Please select both start and end dates.");
        return;
      }

      if (new Date(startDate) > new Date(endDate)) {
        setError("End date must be after start date.");
        return;
      }

      await API.post(`/bookings/${user.id}`, {
        room_id: selectedRoom,
        start_date: startDate,
        end_date: endDate,
      });

      setSuccess("Room booked successfully!");

      fetchAvailableRooms(); // refresh available rooms

      setTimeout(() => {
        closeModal();
      }, 1500);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Available Rooms
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onBook={openModal} />
          ))}
        </div>

      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">

          <div className="bg-white rounded-xs p-6 w-full max-w-md shadow-xl">

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Book Room
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded-xs mb-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-600 p-2 rounded-xs mb-3 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Start Date
                </label>
                <input
                  type="date"
                  min={today}
                  className="border w-full p-2.5 rounded-xs mt-1"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  End Date
                </label>
                <input
                  type="date"
                  min={startDate || today}
                  className="border w-full p-2.5 rounded-xs mt-1"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">

                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-xs hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={bookRoom}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xs hover:bg-blue-600"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default AvailableRooms;