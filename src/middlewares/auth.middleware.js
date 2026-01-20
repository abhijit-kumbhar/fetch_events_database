const crypto = require("crypto");
const { jwtDecrypt } = require("jose");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.token;

    // 1️⃣ Token missing
    if (!token) {
      return res.status(440).json({
        error_code: 440,
        message: "Your session has been expired. Please login again11",
      });
    }

     const secret = crypto
      .createHash("sha256")
      .update(process.env.JWT_SECRET)
      .digest();

    const { payload } = await jwtDecrypt(token, secret);

    // 3️⃣ Payload empty check
    if (!payload || !payload.guest_id) {
      return res.status(440).json({
        error_code: 440,
        message: "Your session has been expired. Please login again2323",
      });
    }

    // 4️⃣ Attach guest to request
    req.guest = {
      guest_id: payload.guest_id,
      email: payload.email,
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR 👉", error.message);

    return res.status(440).json({
      error_code: 440,
      message: "Your session has been expired. Please login again333",
    });
  }
};
