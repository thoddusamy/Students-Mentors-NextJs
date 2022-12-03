import clientPromise from "../../../DB/connectDB"
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
    const { method } = req
    const client = await clientPromise;
    const db = client.db("Student-and-Mentor");

    if (method === "GET") {
        try {
            const data = await db.collection("students").find().toArray()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    if (method === "POST") {
        try {
            const data = req.body
            const result = await db.collection("students").insertMany(data);
            res.send(result)
        } catch (error) {
            console.log(error);
        }
    }

}