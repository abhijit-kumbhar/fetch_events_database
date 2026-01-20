
// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth.middleware");
// const CartController = require("../controllers/cart.controller");

// router.post("/cart", auth, CartController.addToCart);
// router.get("/cart", auth, CartController.getCart);

// module.exports = router;

// const router = require("express").Router();
// const cartController = require("../controllers/cart.controller");
// const auth = require("../middlewares/auth.middleware");

// router.post("/cart", auth, cartController.addCart);
// router.get("/cart", auth, cartController.getCart);
// router.put("/cart/item", auth, cartController.updateCartItem);
// router.delete("/cart/item", auth, cartController.deleteCartItem);

// module.exports = router;

const router = require("express").Router();
const controller = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/cart", auth, controller.addCart);
router.get("/cart", auth, controller.getCart);
router.put("/cart", auth, controller.updateCartItem);
// router.delete("/cart", auth, controller.deleteCartItem);
router.delete("/cart", auth, controller.deleteCart);


// router.delete("/cart/remove_all", auth, controller.deleteCart);


module.exports = router;
