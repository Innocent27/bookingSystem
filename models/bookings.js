const mongoose = require("mongoose");

// setting up the database for booking details
const bookingSchema = new mongoose.Schema({
   
    hotel_location: {
      type: String,
      required: true,
    },
    hotel_name: {
        type: String,
        required: true,
      },
    room_type: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    room_img: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    created_by: {
      type: String,
    },
  });
  
  module.exports = mongoose.model("Booking", bookingSchema);