// const { jwtDecrypt } = require("jose");
const crypto = require("crypto");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.token;

//     if (!token) {
//       return res.status(440).json({
//         error_code: 440,
//         message: "Your session has been expired .Please login again"
//       });
//     }

//     const secret = crypto
//       .createHash("sha256")
//       .update(process.env.JWT_SECRET)
//       .digest();

//     const { payload } = await jwtDecrypt(token, secret);

//     if (!payload.guest_id) {
//       return res.status(412).json({
//         error_code: 412,
//         message:
//           "We were unable to retrieve your user details. Please recheck the information and try again."
//       });
//     }

//     req.guest_id = payload.guest_id;
//     next();
//   } catch (err) {
//     return res.status(440).json({
//       error_code: 440,
//       message: "Your session has been expired .Please login again"
//     });
//   }
// };

// const { jwtDecrypt } = require("jose");
// const crypto = require("crypto");

// const decoder = new TextDecoder();

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["token"];

//     if (!token) {
//       return res.status(440).json({
//         error_code: 440,
//         message: "Your session has been expired. Please login again"
//       });
//     }

//     // 🔐 Convert secret to 32 bytes (SAME AS LOGIN)
//     const secret = crypto
//       .createHash("sha256")
//       .update(process.env.JWT_SECRET)
//       .digest();

//     // 🔓 Decrypt JWE
//     const { plaintext } = await jwtDecrypt(token, secret);

//     const payload = JSON.parse(decoder.decode(plaintext));

//     // ✅ VERY IMPORTANT
//     req.guest = payload;   // 👈 THIS WAS MISSING

//     next();
//   } catch (err) {
//     console.error("AUTH ERROR 👉", err);

//     return res.status(440).json({
//       error_code: 440,
//       message: "Your session has been expired. Please login again"
//     });
//   }
// };


// const { jwtDecrypt } = require("jose");
// const crypto = require("crypto");

// const decoder = new TextDecoder();

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["token"];

//     if (!token || token.trim() === "") {
//       return res.status(440).json({
//         error_code: 440,
//         message: "Your session has been expired. Please login again"
//       });
//     }

//     // 🔐 Same secret as LOGIN
//     const secret = crypto
//       .createHash("sha256")
//       .update(process.env.JWT_SECRET)
//       .digest();

//     // 🔓 Decrypt JWE
//     const decrypted = await jwtDecrypt(token, secret);

//     if (!decrypted || !decrypted.plaintext) {
//       throw new Error("Empty token payload");
//     }

//     const decodedText = decoder.decode(decrypted.plaintext);

//     if (!decodedText || decodedText.trim() === "") {
//       throw new Error("Invalid token data");
//     }

//     let payload;
//     try {
//       payload = JSON.parse(decodedText);
//     } catch (e) {
//       throw new Error("Token JSON parse failed");
//     }

//     if (!payload.guest_id) {
//       return res.status(412).json({
//         error_code: 412,
//         message:
//           "We were unable to retrieve your user details. Please log out and log in again."
//       });
//     }

//     // ✅ ATTACH USER
//     req.guest = payload;

//     next();
//   } catch (err) {
//     console.error("AUTH ERROR 👉", err.message);

//     return res.status(440).json({
//       error_code: 440,
//       message: "Your session has been expired. Please login again"
//     });
//   }
// };


// src/middlewares/auth.middleware.js
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

    // 2️⃣ Decrypt JWE token
    // const secret = new TextEncoder().encode(process.env.JWE_SECRET);
    // const secret = new TextEncoder().encode("plannix_event_booking_secret_32!!");
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

// const crypto = require("crypto");
// const { jwtDecrypt } = require("jose");

// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers.token;

//         if (!token) {
//             return res.status(440).json({
//                 error_code: 440,
//                 message: "Your session has been expired. Please login again"
//             });
//         }

//         const secretString = process.env.JWT_SECRET;
//         const secret = crypto.createHash("sha256").update(secretString).digest();

//         // Decrypt token
//         const { plaintext } = await jwtDecrypt(token, secret);

//         // Parse payload
//         req.guest = JSON.parse(new TextDecoder().decode(plaintext));

//         next();
//     } catch (err) {
//         console.error("AUTH ERROR 👉", err.message);
//         return res.status(440).json({
//             error_code: 440,
//             message: "Your session has been expired. Please login again"
//         });
//     }
// };
