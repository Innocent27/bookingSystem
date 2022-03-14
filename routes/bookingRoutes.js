require("dotenv").config;

const express = require("express");
const Booking = require("../models/bookings");
const { getBooking } = require("../middleware/get");
const authenticateToken = require("../middleware/auth");

const app = express.Router();

// GET all bookings
app.get("/", authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(201).send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one booking
app.get("/:id", [authenticateToken, getBooking], (req, res, next) => {
  res.send(res.booking);
});

// CREATE a booking
app.post("/", authenticateToken, async (req, res, next) => {
  const { hotel_location, hotel_name, room_type, description, room_img, price } = req.body;

  let booking;

  img
    ? (booking = new Booking({
        hotel_location,
        hotel_name,
        room_type,
        description,
        room_img,
        price,
        created_by: req.user._id,
      }))
    : (booking = new Booking({
      hotel_location,
      hotel_name,
      room_type,
      description,
      room_img,
      price,
      created_by: req.user._id,
      }));

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a booking
app.put("/:id", [authenticateToken, getBooking], async (req, res, next) => {
  if (req.user._id !== res.booking.created_by)
    res.status(400).json({
      message: "You do not have the permission to update this booking",
    });
  const { hotel_location, hotel_name, room_type, description, room_img, price } = req.body;
  if (hotel_location) res.booking.hotel_location = hotel_location;
  if (hotel_name) res.booking.hotel_name = hotel_name;
  if (room_type) res.booking.room_type = room_type;
  if (description) res.booking.description = description;
  if (room_img) res.booking.room_img = room_img;
  if (price) res.booking.price = price;

  try {
    const updatedBooking = await res.booking.save();
    res.status(201).send(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a booking
app.delete("/:id", [authenticateToken, getBooking], async (req, res, next) => {
  if (req.user._id !== res.booking.created_by)
    res.status(400).json({
      message: "You do not have the permission to delete this booking",
    });
  try {
    await res.booking.remove();
    res.json({ message: "Deleted booking" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;