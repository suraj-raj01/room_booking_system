import db from "../config/db.js"

export const createUser = async(name,email,password)=>{

 const query = `
 INSERT INTO users (name,email,password)
 VALUES (?,?,?)
 `
 const [result] = await db.query(query,[name,email,password])

 return result
}

export const getAllUser = async()=>{
 const query = `
 SELECT * FROM users
 `
 const [rows] = await db.query(query)
 return rows
}

export const deleteUser = async(id)=>{
 const query = `
 DELETE FROM users WHERE id = ?
 `
 const [rows] = await db.query(query,[id])
 return rows
}

export const updateUser = async(id,user)=>{
 const query = `
 UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?
 `
 const [rows] = await db.query(query,[user.name,user.email,user.password,id])
 return rows
}

export const findUserByEmail = async(email)=>{

 const query = `
 SELECT * FROM users
 WHERE email = ?
 `

 const [rows] = await db.query(query,[email])

 return rows[0]
}