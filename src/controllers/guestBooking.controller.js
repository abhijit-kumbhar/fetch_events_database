const db = require("../config/db");

exports.getGuestBookings = async (req, res) => {
  try {
    // coming from auth middleware (JWT/JWE decoded)
    const { guest_id } = req.guest;
    const { type = "all" } = req.query;

    let condition = "";

    // TIME BASED
    if (type === "upcoming") {
      // condition = "AND booking_from > NOW()";
      condition = "AND es.event_start_datetime > NOW()";
    }

    if (type === "past") {
      // condition = "AND booking_from < NOW()";
      condition = "AND es.event_end_datetime < NOW()";
    }

    // STATUS BASED (NO status column in table)
    if (type === "active") {
      // condition = "AND paid_booking = 1";
      condition = `
        AND es.event_start_datetime <= NOW()
        AND es.event_end_datetime >= NOW()
      `;
    }

    if (type === "refund" || type === "canceled") {
      condition = "AND paid_booking = 0";
    }

    const [rows] = await db.query(
      `
  SELECT
    b.booking_id,
    b.primary_id,
    b.event_id AS event,
    b.agency_id,
    b.location_id,
    b.book_by,
    b.booking_from,
    b.paid_booking,

    /* CATEGORY */
    b.confirmed_cat1 AS confirmed_cat,
    b.cat_details1 AS category,

    /* PROGRAM */
    b.confirmed_program1 AS confirmed_program,
    b.program_details1 AS programs,

    /* ADDON */
    b.addon_details1 AS addons,

    /* SERVICE */
    b.service_detail1 AS services,

    b.payment_transaction_id,
    b.inserted_on,
    b.pcc_id,

    /* EVENT SETTING */
    es.event_start_datetime,
    es.event_end_datetime,
    es.booking_start_datetime,
    es.booking_end_datetime

  FROM event_guest_booking_detail_all b
  INNER JOIN event_setting_all es
    ON es.event_id = b.event_id

  WHERE b.guest_id = ?
  ${condition}
  `,
      [guest_id]
    );

    return res.status(200).json({
      error_code: 200,
      message: "Bookings fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("BOOKING API ERROR 👉", error);

    return res.status(500).json({
      error_code: 500,
      message: "Internal server error",
    });
  }
};
