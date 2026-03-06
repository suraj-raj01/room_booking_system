interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  price_per_night: number;
}

interface RoomCardProps {
  room: Room;
  onBook: (id: number) => void;
}

const RoomCard = ({ room, onBook }: RoomCardProps) => {
  return (
    <div className="border bg-gray-800 text-white rounded-xs p-4 shadow-md">
      <h2 className="text-xl font-bold mt-2">{room.name}</h2>
      <p>{room.type}</p>
      {/* <p>Capacity: {room.capacity}</p> */}
      <p className="text-green-600 font-bold">₹{room.price_per_night}</p>

      <button
        onClick={() => onBook(room.id)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-xs"
      >
        Book Room
      </button>
    </div>
  );
};

export default RoomCard;