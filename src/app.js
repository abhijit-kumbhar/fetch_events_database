const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/guest", require("./routes/guest.route"));
app.use("/api/guest", require("./routes/guestBooking.routes"));
app.use("/api/guest", require("./routes/cart.route"));

module.exports = app;
