import express from "express"
import {fetchRooms, createRoom, fetchRoomById, availableRooms, updateRoom} from "../controllers/room.controller.js"

const router = express.Router()

router.get("/",fetchRooms)
router.get("/availablerooms",availableRooms)
router.post("/",createRoom)
router.get("/:id",fetchRoomById)
router.put("/:id",updateRoom)
export default router