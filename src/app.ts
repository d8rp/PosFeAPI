import "dotenv/config"
import "express-async-errors"

import express from "express"
import orderRoutes from "./routes/Orders";
import ConnectToDB from "./db/Connect";

(async () => {
    if (!process.env.MONGO_URI){
        console.error("MONGO_URI environment variable not set!")
        process.exit(1)
    }

    console.log("Connecting to MongoDB...")
    await ConnectToDB(process.env.MONGO_URI)

    const app = express()
    const port = 3000

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(orderRoutes)

    app.listen(port, () => console.log(`Server started on port ${port}`))
})()