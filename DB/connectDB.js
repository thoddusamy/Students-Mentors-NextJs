import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
    console.log('MongoDB not connected')
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
    console.log("MongoDB Connected!")
}

export default clientPromise
