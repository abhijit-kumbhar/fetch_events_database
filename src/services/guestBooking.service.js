// // // const db = require("../config/db");

// // // const getBookingsByType = async (guest_id, type) => {
// // //   let sql = `
// // //     SELECT
// // //       b.booking_id,
// // //       b.primary_id,
// // //       b.event_id,
// // //       b.agency_id,
// // //       b.location_id,
// // //       b.book_by,
// // //       b.booking_from,
// // //       b.paid_booking,
// // //       b.payment_transaction_id,
// // //       b.pcc_id,
// // //       b.inserted_on,

// // //       b.cat_details1 AS category,
// // //       b.program_details1 AS programs,
// // //       b.addon_details1 AS addons,
// // //       b.service_detail1 AS services,

// // //       e.event_name,
// // //       e.status
// // //     FROM event_guest_booking_detail_all b
// // //     JOIN event_header_all e ON e.event_id = b.event_id
// // //     WHERE b.guest_id = ?
// // //   `;

// // //   if (type === "refund" || type === "canceled") {
// // //     sql += " AND b.paid_booking = 0";
// // //   } else if (type === "active") {
// // //     sql += " AND e.status = 1";
// // //   } else if (type === "past") {
// // //     sql += " AND e.inactive_on IS NOT NULL";
// // //   } else if (type === "upcoming") {
// // //     sql += " AND e.status IN (1,2)";
// // //   }

// // //   sql += " ORDER BY b.inserted_on DESC";

// // //   const [rows] = await db.query(sql, [guest_id]);
// // //   return rows;
// // // };

// // // module.exports = { getBookingsByType };

// // const db = require("../config/db");

// // exports.getBookingsByType = async (guest_id, type) => {
// //   let condition = "";

// //   switch (type) {
// //     case "upcoming":
// //       condition = "AND e.event_start_datetime > NOW()";
// //       break;

// //     case "past":
// //       condition = "AND e.event_end_datetime < NOW()";
// //       break;

// //     case "active":
// //       condition = `
// //         AND e.event_start_datetime <= NOW()
// //         AND e.event_end_datetime >= NOW()
// //       `;
// //       break;

// //     case "refund":
// //       condition = `
// //         AND (
// //           b.paid_booking = 0
// //           OR e.refund_canceled_by_guest > 0
// //           OR e.refund_canceled_by_host > 0
// //         )
// //       `;
// //       break;

// //     default:
// //       condition = "";
// //   }

// //   const [rows] = await db.execute(
// //     `
// //     SELECT
// //       b.booking_id,
// //       b.primary_id,
// //       b.agency_id,
// //       b.location_id,
// //       b.event_id,
// //       b.book_by,
// //       b.booking_from,
// //       b.paid_booking,
// //       b.payment_transaction_id,
// //       b.inserted_on,
// //       b.pcc_id,

// //       e.event_type,
// //       e.event_start_datetime,
// //       e.event_end_datetime,
// //       e.booking_start_datetime,
// //       e.booking_end_datetime

// //     FROM event_guest_booking_detail_all b
// //     JOIN event_setting_all e ON e.event_id = b.event_id
// //     WHERE b.guest_id = ?
// //     ${condition}
// //     ORDER BY b.inserted_on DESC
// //     `,
// //     [guest_id]
// //   );

// //   return rows;
// // };


// const db = require("../config/db");

// exports.getBookingsByType = async (guest_id, type) => {
//   let condition = "";

//   switch (type) {
//     case "upcoming":
//       condition = "AND e.event_start_datetime > NOW()";
//       break;

//     case "past":
//       condition = "AND e.event_end_datetime < NOW()";
//       break;

//     case "active":
//       condition = `
//         AND e.event_start_datetime <= NOW()
//         AND e.event_end_datetime >= NOW()
//       `;
//       break;

//     case "refund":
//       condition = `
//         AND b.paid_booking = 0
//       `;
//       break;

//     default:
//       condition = "";
//   }

//   const [rows] = await db.execute(
//     `
//     SELECT
//       b.booking_id,
//       b.event_id,
//       b.guest_id,
//       b.agency_id,
//       b.location_id,
//       b.book_by,
//       b.booking_from,
//       b.paid_booking,
//       b.inserted_on,

//       -- Event timings (CORRECT TABLE)
//       e.event_start_datetime,
//       e.event_end_datetime,
//       e.booking_start_datetime,
//       e.booking_end_datetime

//     FROM event_guest_booking_detail_all b
//     JOIN event_setting_all e 
//       ON e.event_id = b.event_id

//     WHERE b.guest_id = ?
//     ${condition}

//     ORDER BY b.inserted_on DESC
//     `,
//     [guest_id]
//   );

//   return rows;
// };
