// const { jwtDecrypt } = require("jose");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.token;

//     // ❌ Token missing
//     if (!token) {
//       return res.status(440).json({
//         error_code: 440,
//         message: "Your session has been expired .Please login again"
//       });
//     }

//     // 🔐 Decrypt token
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtDecrypt(token, secret);

//     // ❌ guest_id missing in token
//     if (!payload.guest_id) {
//       return res.status(412).json({
//         error_code: 412,
//         message:
//           "We were unable to retrieve your user details. Please recheck the information and try again. If the issue persists, kindly log out and log in again."
//       });
//     }

//     // ✅ Attach guest_id from token
//     req.guest_id = payload.guest_id;

//     next();
//   } catch (err) {
//     return res.status(440).json({
//       error_code: 440,
//       message: "Your session has been expired .Please login again"
//     });
//   }
// };
