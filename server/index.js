require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// import the db.js file
const connection = require("./db");
// import user Routes
const userRoutes = require('./routes/users')
// import auth Routes
const authRoutes = require('./routes/auth')

// database connection 
connection();


// middlewares
app.use(express.json())
app.use(cors());


//Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const port = process.env.PORT||8080;
app.listen(port, () => console.log(`Listen on port ${port}...`))