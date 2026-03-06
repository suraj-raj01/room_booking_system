import express from "express"

import {
 bookRoom,
 myBookings,
 deleteBooking
} from "../controllers/booking.controller.js"

import {verifyToken} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/:id",verifyToken,bookRoom)
router.delete("/:id",verifyToken,deleteBooking)
router.get("/my/:id",verifyToken,myBookings)

export default router