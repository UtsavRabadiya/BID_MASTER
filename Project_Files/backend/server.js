//CODE FOR SERVER CONNECTION
require("dotenv").config();
const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const mongoose = require("mongoose")
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const productRoute = require("./router/productRouter");
const categoryRouter = require("./router/categoryRouter");
const userRouter = require("./router/userRouter");
const mailRouter = require("./router/mailRouter");

const corsOptions = {
    origin: 'https://bid-master-front.vercel.app', // Specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use("/", router);
app.use("/api/form", productRoute);
app.use("/api/filter", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/mail", mailRouter);

app.use(fileUpload());
app.get("/", (req, res) => {
    res.send("Welcome to Bid Master API");
});
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected successfully to DB");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});