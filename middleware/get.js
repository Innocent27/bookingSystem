const User = require("../models/users");
const Booking = require("../models/bookings");

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);

		if (user == null) {
			return res.status(404).json({ message: "Cannot find the user" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.user = user;
	next();
}

async function getBooking(req, res, next) {
	let booking;
	try {
		booking = await Booking.findById(req.params.id);

		if (booking == null) {
			return res.status(404).json({ message: "Cannot find bookings" });
	}	
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.booking = booking;
	next();
}


module.exports = { getUser, getBooking };
