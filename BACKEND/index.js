import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { dbConnect } from "./util/connectDB.js";
import Router from "./routes/problemRoutes.js";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/problem", Router);

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await dbConnect();

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error.message);
    }
};

startServer();