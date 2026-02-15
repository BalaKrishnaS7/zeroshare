const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Zer0Share API Running...");
});

const PORT = 5000;
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
