import clientPromise from "../../../DB/connectDB"
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
    const { method, query: { id } } = req
    const client = await clientPromise;
    const db = client.db("Student-and-Mentor");

    if (method === 'DELETE') {
        try {
            const mentor = await db.collection("mentors").deleteOne({ _id: ObjectId(id) });
            res.send(mentor)
        } catch (error) {
            console.log(error);
        }
    }

}