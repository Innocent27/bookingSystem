require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");

// connecting to the database
mongoose.connect(process.env.DATABASE_URL, { 
    // userNewUrlParser: true,
    // useUnifiedTopology:true,
    // useCreateIndex: true
})
.then(console.log('connected to the database'))
.catch(err => console.log(`error: ${err}`))

// root route
app.get("/", (req, res) =>{
    res.send({ msg: "Welcome booking system"});
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});