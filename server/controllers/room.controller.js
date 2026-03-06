import { getAllRooms, createRoomModel, getRoomById, getAvailableRooms, updateRoomModel } from "../models/room.model.js"

export const fetchRooms = async (req, res) => {
    try {
        const rooms = await getAllRooms()
        res.status(200).json({ success: true, data: rooms })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const availableRooms = async (req, res) => {
    try {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];

        const rooms = await getAvailableRooms(formattedDate);

        res.status(200).json({
            success: true,
            date_checked: formattedDate,
            data: rooms,
            message: "Available rooms fetched successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const createRoom = async (req, res) => {
    try {
        const room = await createRoomModel(req.body)
        res.status(201).json({ success: true, data: room, message: "Room created successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateRoom = async (req, res) => {
    try {
        const room = await updateRoomModel(req.params.id, req.body)
        res.status(200).json({ success: true, data: room, message: "Room updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const fetchRoomById = async (req, res) => {
    try {
        const room = await getRoomById(req.params.id)
        res.status(200).json({ success: true, data: room, message: "Room fetched successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


