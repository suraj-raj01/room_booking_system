import db from "../config/db.js"

// get all rooms
export const getAllRooms = async () => {
    const query = `SELECT * FROM rooms`
    const [rows] = await db.query(query)
    return rows
}

// create room
export const createRoomModel = async (room) => {
    const query = `INSERT INTO rooms (name,price_per_night) VALUES (?,?)`
    const [rows] = await db.query(query, [room.name, room.price_per_night])
    return rows
}

// update room
export const updateRoomModel = async (id, room) => {
    const query = `UPDATE rooms SET name = ?, price_per_night = ? WHERE id = ?`
    const [rows] = await db.query(query, [room.name, room.price_per_night, id])
    return rows
}

// delete room
export const deleteRoomModel = async (id) => {
    const query = `DELETE FROM rooms WHERE id = ?`
    const [rows] = await db.query(query, [id])
    return rows
}

// get room by id
export const getRoomById = async (id) => {
    const query = `SELECT * FROM rooms WHERE id = ?`
    const [rows] = await db.query(query, [id])
    return rows[0]
}

// get available rooms
export const getAvailableRooms = async (today) => {
    const query = `
        SELECT * FROM rooms
        WHERE id NOT IN (
            SELECT room_id
            FROM bookings
            WHERE start_date <= ? AND end_date >= ?
        )
    `;

    const [rows] = await db.query(query, [today, today]);
    return rows;
};
