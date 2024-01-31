import express from "express"
import database from './config/db.js';
import authRoute from "./routes/authRoute.js"
import taskRoute from "./routes/taskRoute.js"
import {errorHandler} from "./middleware/error.js"
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())

app.use("/api/user",authRoute);
app.use("/api/task",taskRoute)

app.use(errorHandler);

app.get('/', (req,res) =>{
    res.send("Home");
})

app.listen(3000, () => {
    console.log("Port started");
})