import db from "../config/db.js"

export const checkRoomAvailability = async(room_id,start_date,end_date)=>{
 const query = `SELECT * FROM bookings WHERE room_id = ? AND start_date <= ? AND end_date >= ?`
 const [rows] = await db.query(query,[room_id,end_date,start_date])
 return rows
}

export const createBooking = async(connection,user_id,room_id,start_date,end_date)=>{
 const query = `INSERT INTO bookings (user_id,room_id,start_date,end_date) VALUES (?,?,?,?)`
 const [result] = await connection.query(query,[user_id,room_id,start_date,end_date])
 return result
}

export const removeBooking = async(id)=>{
 const query = `DELETE FROM bookings WHERE id = ?`
 const [result] = await db.query(query,[id])
 return result
}

export const getUserBookings = async(user_id)=>{
 const query = `SELECT bookings.id,rooms.name,bookings.start_date,bookings.end_date FROM bookings JOIN rooms ON rooms.id = bookings.room_id WHERE bookings.user_id = ?`
 const [rows] = await db.query(query,[user_id])
 return rows
}