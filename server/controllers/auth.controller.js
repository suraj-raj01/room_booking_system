import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import {
    createUser,
    findUserByEmail,
    getAllUser,
    deleteUser,
    updateUser
} from "../models/user.model.js"

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const existing = await findUserByEmail(email)

        if (existing) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashed = await bcrypt.hash(password, 10)

        await createUser(name, email, hashed)

        res.json({ message: "User registered successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const fetchUsers = async (req, res) => {
    try {
        const users = await getAllUser()
        res.status(200).json({ success: true, data: users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id)
        res.status(200).json({ success: true, data: user, message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateUsers = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body)
        res.status(200).json({ success: true, data: user, message: "User updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user.id },
            "secret",
            { expiresIn: "1d" }
        )

        res.json({ success: true, message: "Login successful", user, token })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}