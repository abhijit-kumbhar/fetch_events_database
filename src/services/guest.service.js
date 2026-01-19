
const db = require("../config/db");
const guestModel = require("../models/guest.model");

const registerGuest = async (data) => {
  const [mobile] = await db.query(
    "SELECT guest_id FROM guest_header_all WHERE guest_mobile = ?",
    [data.guest_mobile]
  );
  if (mobile.length) return { success: false, reason: "MOBILE_EXISTS" };

  const [email] = await db.query(
    "SELECT guest_id FROM guest_header_all WHERE guest_email = ?",
    [data.guest_email]
  );
  if (email.length) return { success: false, reason: "EMAIL_EXISTS" };

  const [result] = await db.query(
    `INSERT INTO guest_header_all
     (agency_id,event_id,agent_id,exhibitor_id,category_id,
      guest_name,guest_dob,guest_gender,guest_mobile,guest_email,
      password,inserted_on,status)
     VALUES (1,1,1,1,1,?,?,?,?,?,?,NOW(),1)`,
    [
      data.guest_name,
      data.guest_dob,
      data.guest_gender,
      data.guest_mobile,
      data.guest_email,
      data.password
    ]
  );

  return { success: true, guest_id: result.insertId };
};

const loginGuest = async (mobile) => {
  return await guestModel.findGuestByMobile(mobile);
};

module.exports = { registerGuest, loginGuest };
