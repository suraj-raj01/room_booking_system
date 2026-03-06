import db from "../config/db.js"
import {formatDate} from "../utils/formatDate.js"

import {
    checkRoomAvailability,
    createBooking,
    getUserBookings,
    removeBooking
} from "../models/booking.model.js"

export const bookRoom = async (req, res) => {
    const connection = await db.getConnection()
    try {
        console.log(req.body)
        const { room_id, start_date, end_date } = req.body
        const { id } = req.params
        const user_id = id

        const formattedStartDate = formatDate(start_date)
        const formattedEndDate = formatDate(end_date)

        await connection.beginTransaction()

        const existing = await checkRoomAvailability(
            room_id,
            formattedStartDate,
            formattedEndDate
        )

        if (existing.length) {
            await connection.rollback()
            return res.status(400).json({ message: "Room already booked" })
        }

        await createBooking(
            connection,
            user_id,
            room_id,
            formattedStartDate,
            formattedEndDate
        )

        await connection.commit()

        res.status(200).json({ success: true, message: "Booking successful" })

    } catch (err) {
        await connection.rollback()
        res.status(500).json({ message: err.message })
    } finally {
        connection.release()
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const booking = await removeBooking(req.params.id)
        res.status(200).json({ success: true, data: booking, message: "Booking deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const myBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = id;
        const bookings = await getUserBookings(user_id)
        res.status(200).json({ success: true, data: bookings })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}