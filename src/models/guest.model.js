const db = require("../config/db");

const findGuestByMobile = async (mobile) => {
  const [rows] = await db.query(
    `SELECT guest_id, guest_name, guest_mobile, guest_email, password
     FROM guest_header_all
     WHERE guest_mobile = ?`,
    [mobile]
  );
  return rows[0];
};

const findGuestByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT guest_id FROM guest_header_all WHERE guest_email = ?",
    [email]
  );
  return rows[0];
};

const createGuest = async (data) => {
  const {
    guest_name,
    guest_dob,
    guest_gender,
    guest_mobile,
    guest_email,
    password
  } = data;

  const [result] = await db.query(
    `INSERT INTO guest_header_all
     (
       agency_id,
       event_id,
       agent_id,
       exhibitor_id,
       category_id,
       guest_name,
       guest_dob,
       guest_gender,
       guest_mobile,
       guest_email,
       password,
       inserted_on
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      1, // agency_id
      1, // event_id
      1, // agent_id
      1, // exhibitor_id
      1, // category_id
      guest_name,
      guest_dob,
      guest_gender,
      guest_mobile,
      guest_email,
      password
    ]
  );

  return result.insertId;
};

module.exports = {
  findGuestByMobile,
  findGuestByEmail,
  createGuest
};
