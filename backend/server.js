const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", require("./routes/authRouter"));

//port
const PORT = process.env.PORT || 8000;

app.use("/api/v1", require("./routes/apiRoutes"));
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEVMODE} on port ${process.env.PORT}`
  );
});
