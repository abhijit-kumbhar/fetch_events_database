const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const bookingController = require("../controllers/guestBooking.controller");

router.get("/bookings", authMiddleware, bookingController.getGuestBookings);

module.exports = router;
