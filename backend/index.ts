import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./database/connect.database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: process.env.CLIENT_URL,
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

// Routes



// Routes

app.get("/test1234", (req, res) => {
  res.send("Backend is running!");
});


app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server running on port ${PORT}`);
});
