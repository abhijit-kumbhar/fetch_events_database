

// const db = require("../config/db");

// exports.getCartByGuestId = async (guest_id) => {
//   const [rows] = await db.query(
//     "SELECT * FROM event_guest_booking_cart_detail_all WHERE guest_id = ? LIMIT 1",
//     [guest_id]
//   );
//   return rows[0] || null;
// };

// exports.updateCart = async (guest_id, data) => {
//   const [result] = await db.query(
//     "UPDATE event_guest_booking_cart_detail_all SET ? WHERE guest_id = ?",
//     [data, guest_id]
//   );
//   return result.affectedRows;
// };

// exports.insertCart = async (data) => {
//   const [result] = await db.query("INSERT INTO event_guest_booking_cart_detail_all SET ?", data);
//   return result.insertId;
// };

// const db = require("../config/db");

// exports.getCartByGuestId = async (guest_id) => {
//   const [rows] = await db.query(
//     "SELECT * FROM event_guest_booking_cart_detail_all WHERE guest_id = ?",
//     [guest_id]
//   );
//   return rows[0];
// };

// exports.insertCart = async (data) => {
//   const keys = Object.keys(data).join(",");
//   const values = Object.values(data);
//   const placeholders = values.map(() => "?").join(",");

//   await db.query(
//     `INSERT INTO event_guest_booking_cart_detail_all (${keys}) VALUES (${placeholders})`,
//     values
//   );
// };

// exports.updateCart = async (guest_id, data) => {
//   const fields = Object.keys(data).map(k => `${k} = ?`).join(",");
//   await db.query(
//     `UPDATE event_guest_booking_cart_detail_all SET ${fields} WHERE guest_id = ?`,
//     [...Object.values(data), guest_id]
//   );
// };

// exports.updateCartFields = async (guest_id, fields) => {
//   const sql = Object.keys(fields).map(k => `${k} = ?`).join(",");
//   await db.query(
//     `UPDATE event_guest_booking_cart_detail_all SET ${sql} WHERE guest_id = ?`,
//     [...Object.values(fields), guest_id]
//   );
// };

const db = require("../config/db");

exports.getCartByGuestId = async (guest_id) => {
  const [rows] = await db.query(
    "SELECT * FROM event_guest_booking_cart_detail_all WHERE guest_id = ?",
    [guest_id]
  );
  return rows[0];
};

exports.insertCart = async (data) => {
  const [res] = await db.query(
    "INSERT INTO event_guest_booking_cart_detail_all SET ?",
    [data]
  );
  return res.insertId;
};

exports.updateCart = async (guest_id, data) => {
  await db.query(
    "UPDATE event_guest_booking_cart_detail_all SET ? WHERE guest_id = ?",
    [data, guest_id]
  );
};

// exports.deleteCartById = async (cart_id, guest_id) => {
//   await db.query(
//     `DELETE FROM event_guest_booking_cart_detail_all 
//      WHERE id = ? AND guest_id = ?`,
//     [cart_id, guest_id]
//   );
// };

// exports.deleteCartByGuestId = async (guest_id) => {
//   await db.query(
//     `DELETE FROM event_guest_booking_cart_detail_all WHERE guest_id = ?`,
//     [guest_id]
//   );
// };


exports.getCartByGuestId = async (guest_id) => {
  const [rows] = await db.query(
    "SELECT * FROM event_guest_booking_cart_detail_all WHERE guest_id = ?",
    [guest_id]
  );
  return rows[0];
};

exports.updateCart = async (guest_id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const setClause = keys.map(k => `${k} = ?`).join(", ");

  await db.query(
    `UPDATE event_guest_booking_cart_detail_all SET ${setClause} WHERE guest_id = ?`,
    [...values, guest_id]
  );
};
