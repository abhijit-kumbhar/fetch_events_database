
// const CartService = require("../services/cart.service");

// exports.addToCart = async (req, res) => {
//   try {
//     const result = await CartService.addToCart(req);
//     return res.status(200).json({ error_code: 200, message: result.message, data: result.cart_id || null });
//   } catch (error) {
//     console.error("ADD CART ERROR 👉", error);
//     return res.status(error.status || 500).json({ error_code: error.error_code || 500, message: error.message || "Internal server error" });
//   }
// };

// exports.getCart = async (req, res) => {
//   try {
//     const cart = await CartService.getCart(req);
//     return res.status(200).json({ error_code: 200, message: "Cart fetched successfully", data: cart });
//   } catch (error) {
//     console.error("GET CART ERROR 👉", error);
//     return res.status(error.status || 500).json({ error_code: error.error_code || 500, message: error.message || "Internal server error" });
//   }
// };

const CartService = require("../services/cart.service");

/* ADD CART */
exports.addCart = async (req, res, next) => {
  try {
    const data = await CartService.addToCart(req);
    res.status(200).json({ error_code: 200, message: data.message });
  } catch (err) {
    next(err);
  }
};

/* GET CART */
exports.getCart = async (req, res, next) => {
  try {
    const data = await CartService.getToCart(req);
    res.status(200).json({ error_code: 200, message: "Cart fetched", data });
  } catch (err) {
    next(err);
  }
};

/* UPDATE CART ITEM */
exports.updateCartItem = async (req, res, next) => {
  try {
    const data = await CartService.updateCartItem(req);
    res.status(200).json({ error_code: 200, message: "Cart updated", data });
  } catch (err) {
    next(err);
  }
};

// /* DELETE CART ITEM */
// exports.deleteCartItem = async (req, res, next) => {
//   try {
//     await CartService.deleteCartItem(req);
//     res.status(200).json({ error_code: 200, message: "Cart item removed" });
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete all items from cart
// exports.deleteCart = async (req, res) => {
//   try {
//     const result = await CartService.deleteCart(req);

//     return res.status(200).json({
//       error_code: 200,
//       message: result.message
//     });
//   } catch (err) {
//     return res.status(err.status || 500).json({
//       error_code: err.error_code || 500,
//       message: err.message
//     });
//   }
// };


exports.deleteCart = async (req, res) => {
  try {
    const result = await CartService.deleteCart(req);
    res.status(200).json({
      error_code: 200,
      message: result.message
    });
  } catch (err) {
    res.status(err.status || 500).json({
      error_code: err.error_code || 500,
      message: err.message || "Something went wrong"
    });
  }
};
