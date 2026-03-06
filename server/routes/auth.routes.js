import express from "express"
import {register,login,fetchUsers,deleteUsers,updateUsers} from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/",fetchUsers)
router.delete("/:id",deleteUsers)
router.put("/:id",updateUsers)

export default router