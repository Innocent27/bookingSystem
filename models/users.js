const mongoose = require("mongoose");

// setting up the database fields
const userSchema = new mongoose.Schema({
  
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    join_date: {
      type: Date,
      required: false,
      default: Date.now,
    }
  });

  module.exports = mongoose.model("User", userSchema);