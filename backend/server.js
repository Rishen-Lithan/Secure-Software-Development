// Import packages
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

// Use the middlewares to get the data to backend
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Import the routes
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const empRoutes = require('./routes/employeeRoutes');
const customPackRoutes = require('./routes/customPackRoutes');
const financeRoutes = require('./routes/financeRoutes');
const supMsgRoutes = require('./routes/supMsgRoutes');
const inveMsgRoutes = require('./routes/inveMsgRoutes');
const attendenceRoutes = require('./routes/attendenceRoutes');
const sheduleRoutes = require('./routes/sheduleRoutes');
const salRoutes = require('./routes/salaryRoutes');


// Routes
app.use("/api/users", userRoutes);
app.use("/api/Post", packageRoutes);
app.use("/api/Serv", serviceRoutes);
app.use("/api/Sup", supplierRoutes);
app.use("/api/Ord", orderRoutes)
app.use("/api/Book", appointmentRoutes);
app.use("/api/Ord", orderRoutes);
app.use("/api/Msg", supMsgRoutes);
app.use("/api/IMsg", inveMsgRoutes);
app.use("/api/Product", inventoryRoutes);
app.use("/api/emp", empRoutes);
app.use("/api/CustPost", customPackRoutes);
app.use("/api/Fin", financeRoutes);
app.use("/api/sch", attendenceRoutes);
app.use("/api/shedu", sheduleRoutes);
app.use("/api/sal", salRoutes);

// Error Handling for MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error: ", err));

// Check the Server
app.listen(3001, function () {
    console.log("Server is running");
});