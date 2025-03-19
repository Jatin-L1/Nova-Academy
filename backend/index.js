const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const mentorRoutes = require("./routes/mentorRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes.js");
const authRoutes = require("./routes/authRoutes.js");


require("dotenv").config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(express.json());

connectDB();


app.use("/api/mentor", mentorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);
app.use("/api/auth", authRoutes);


app.listen(3001, () => console.log("Server running on port 3001"));
