// Import packages
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');

const app = express();

// Establish database connectivity
connectDB();

// Use the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/register', require('./routes/auth/registerRoute'));
app.use('/login', require('./routes/auth/loginRoute'));
app.use('/refresh', require('./routes/auth/refreshTokenRoute'));
app.use('/logout', require('./routes/auth/logoutRoute'));

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
app.use(verifyJWT);
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

// Database Connection & Server Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});