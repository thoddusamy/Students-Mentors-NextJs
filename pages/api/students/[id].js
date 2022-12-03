import clientPromise from "../../../DB/connectDB"
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {

    const { method, query: { id } } = req
    const client = await clientPromise;
    const db = client.db("Student-and-Mentor");

    if (method === "PUT") {
        try {
            const updateData = req.body
            const student = await db.collection("students").updateOne({ _id: ObjectId(id) }, { $set: updateData });
            res.send(student)
        } catch (error) {
            console.log(error);
        }
    }

    if (method === 'DELETE') {
        try {
            const student = await db.collection("students").deleteOne({ _id: ObjectId(id) });
            res.send(student)
        } catch (error) {
            console.log(error);
        }
    }

}