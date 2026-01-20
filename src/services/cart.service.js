
// const CartModel = require("../models/cart.model");

// const addToCart = async (req) => {
//   const { guest_id } = req.guest;
//   const { event_id, booking_data } = req.body;

//   if (!guest_id) throw { status: 412, error_code: 412, message: "Guest not found" };
//   if (!event_id || !booking_data) throw { status: 400, error_code: 400, message: "Invalid request body" };

//   // 1️⃣ Fetch existing cart for the user
//   let existingCart = await CartModel.getCartByGuestId(guest_id);

//   // Prepare new data to merge
//   const newCartData = {};
//   newCartData.agency_id = event_id;

//   // 2️⃣ Merge function with **correct column names**
// //   const mergeItems = (items, maxCount, idPrefix, detailPrefix) => {
// //     let count = 1;

// //     // Count already filled columns
// //     for (let i = 1; i <= maxCount; i++) {
// //       const existingDetail = existingCart ? existingCart[`${detailPrefix}${i}`] : null;
// //       if (existingDetail) count++;
// //     }

// //     items?.forEach((item) => {
// //       if (count > maxCount) return; // prevent overflow
// //       newCartData[`${idPrefix}${count}`] = item[`${idPrefix}_id`] || item.id || 0;
// //       newCartData[`${detailPrefix}${count}`] = JSON.stringify(item);
// //       count++;
// //     });
// //   };

// const mergeItems = (items, maxCount, idPrefix, detailPrefix, jsonIdKey) => {
//   let count = 1;

//   // Count already filled columns
//   for (let i = 1; i <= maxCount; i++) {
//     const existingDetail = existingCart ? existingCart[`${detailPrefix}${i}`] : null;
//     if (existingDetail) count++;
//   }

//   items?.forEach((item) => {
//     if (count > maxCount) return; // prevent overflow
//     // Use correct JSON key
//     newCartData[`${idPrefix}${count}`] = item[jsonIdKey] || 0;
//     newCartData[`${detailPrefix}${count}`] = JSON.stringify(item);
//     count++;
//   });
// };

// //   // Categories (cat1…cat5)
// //   mergeItems(booking_data.categories, 5, "cat", "cat_details");

// //   // Programs (program1…program10)
// //   mergeItems(booking_data.programs, 10, "program", "program_details");

// //   // Addons (addon1…addon20)
// //   mergeItems(booking_data.addons, 20, "addon", "addon_details");

// //   // Services (service1…service10)
// //   mergeItems(booking_data.services, 10, "service", "service_detail");

// // Categories (cat1…cat5)
// mergeItems(booking_data.categories, 5, "cat", "cat_details", "category_id");

// // Programs (program1…program10)
// mergeItems(booking_data.programs, 10, "program", "program_details", "program_id");

// // Addons (addon1…addon20)
// mergeItems(booking_data.addons, 20, "addon", "addon_details", "addon_id");

// // Services (service1…service10)
// mergeItems(booking_data.services, 10, "service", "service_detail", "service_id");


//   // 3️⃣ Insert or update
//   if (existingCart) {
//     await CartModel.updateCart(guest_id, newCartData);
//     return { message: "Cart updated successfully" };
//   } else {
//     newCartData.guest_id = guest_id;
//     const cart_id = await CartModel.insertCart(newCartData);
//     return { message: "Cart created successfully", cart_id };
//   }
// };

// /* GET CART - ONLY FILLED ITEMS */
// const getCart = async (req) => {
//   const { guest_id } = req.guest;

//   if (!guest_id) throw { status: 412, error_code: 412, message: "Guest not found" };

//   const cart = await CartModel.getCartByGuestId(guest_id);
//   if (!cart) return null;

//   const response = {
//     event_id: cart.agency_id,
//     categories: [],
//     programs: [],
//     addons: [],
//     services: [],
//   };

//   for (let i = 1; i <= 5; i++) if (cart[`cat_details${i}`]) response.categories.push(JSON.parse(cart[`cat_details${i}`]));
//   for (let i = 1; i <= 10; i++) if (cart[`program_details${i}`]) response.programs.push(JSON.parse(cart[`program_details${i}`]));
//   for (let i = 1; i <= 20; i++) if (cart[`addon_details${i}`]) response.addons.push(JSON.parse(cart[`addon_details${i}`]));
//   for (let i = 1; i <= 10; i++) if (cart[`service_detail${i}`]) response.services.push(JSON.parse(cart[`service_detail${i}`]));

//   return response;
// };

// module.exports = { addToCart, getCart };



// const CartModel = require("../models/cart.model");

// /* ADD TO CART */
// exports.addToCart = async (req) => {
//   const { guest_id } = req.guest;
//   const { event_id, booking_data } = req.body;

//   if (!guest_id) throw { status: 412, message: "Guest not found" };

//   let cart = await CartModel.getCartByGuestId(guest_id);
//   const data = { agency_id: event_id };

//   const merge = (items, max, idCol, detailCol, idKey) => {
//     let index = 1;
//     if (cart) {
//       for (let i = 1; i <= max; i++) {
//         if (cart[`${detailCol}${i}`]) index++;
//       }
//     }
//     items?.forEach(item => {
//       if (index <= max) {
//         data[`${idCol}${index}`] = item[idKey];
//         data[`${detailCol}${index}`] = JSON.stringify(item);
//         index++;
//       }
//     });
//   };

//   merge(booking_data.categories, 5, "cat", "cat_details", "category_id");
//   merge(booking_data.programs, 10, "program", "program_details", "program_id");
//   merge(booking_data.addons, 20, "addon", "addon_details", "addon_id");
//   merge(booking_data.services, 10, "service", "service_detail", "service_id");

//   if (cart) {
//     await CartModel.updateCart(guest_id, data);
//     return { message: "Cart updated successfully" };
//   }

//   data.guest_id = guest_id;
//   await CartModel.insertCart(data);
//   return { message: "Cart created successfully" };
// };

// /* GET CART */
// exports.getCart = async (req) => {
//   const { guest_id } = req.guest;
//   const cart = await CartModel.getCartByGuestId(guest_id);
//   if (!cart) return null;

//   const res = { event_id: cart.agency_id, categories: [], programs: [], addons: [], services: [] };

//   for (let i = 1; i <= 5; i++) if (cart[`cat_details${i}`]) res.categories.push(JSON.parse(cart[`cat_details${i}`]));
//   for (let i = 1; i <= 10; i++) if (cart[`program_details${i}`]) res.programs.push(JSON.parse(cart[`program_details${i}`]));
//   for (let i = 1; i <= 20; i++) if (cart[`addon_details${i}`]) res.addons.push(JSON.parse(cart[`addon_details${i}`]));
//   for (let i = 1; i <= 10; i++) if (cart[`service_detail${i}`]) res.services.push(JSON.parse(cart[`service_detail${i}`]));

//   return res;
// };

// /* UPDATE CART ITEM */
// exports.updateCartItem = async (req) => {
//   const { guest_id } = req.guest;
//   const { type, id, quantity, amount } = req.body;

//   const cart = await CartModel.getCartByGuestId(guest_id);

//   const map = {
//     category: { max: 5, idCol: "cat", detailCol: "cat_details", key: "category_id" },
//     program: { max: 10, idCol: "program", detailCol: "program_details", key: "program_id" },
//     addon: { max: 20, idCol: "addon", detailCol: "addon_details", key: "addon_id" },
//     service: { max: 10, idCol: "service", detailCol: "service_detail", key: "service_id" }
//   };

//   const cfg = map[type];

//   for (let i = 1; i <= cfg.max; i++) {
//     if (cart[`${cfg.idCol}${i}`] === id) {
//       const updated = { [cfg.key]: id, quantity, amount };
//       await CartModel.updateCartFields(guest_id, {
//         [`${cfg.detailCol}${i}`]: JSON.stringify(updated)
//       });
//       return updated;
//     }
//   }
//   throw { status: 404, message: "Item not found" };
// };

// /* DELETE CART ITEM */
// exports.deleteCartItem = async (req) => {
//   const { guest_id } = req.guest;
//   const { type, id } = req.body;

//   const cart = await CartModel.getCartByGuestId(guest_id);

//   const map = {
//     category: { max: 5, idCol: "cat", detailCol: "cat_details" },
//     program: { max: 10, idCol: "program", detailCol: "program_details" },
//     addon: { max: 20, idCol: "addon", detailCol: "addon_details" },
//     service: { max: 10, idCol: "service", detailCol: "service_detail" }
//   };

//   const cfg = map[type];

//   for (let i = 1; i <= cfg.max; i++) {
//     if (cart[`${cfg.idCol}${i}`] === id) {
//       await CartModel.updateCartFields(guest_id, {
//         [`${cfg.idCol}${i}`]: null,
//         [`${cfg.detailCol}${i}`]: null
//       });
//       return;
//     }
//   }
//   throw { status: 404, message: "Item not found" };
// };

const CartModel = require("../models/cart.model");

/* =========================
   ADD / MERGE CART (POST)
========================= */
// exports.addToCart = async (req) => {
//   const { guest_id } = req.guest;
//   const { event_id, booking_data } = req.body;

//   if (!guest_id) throw { status: 412, message: "Guest not found" };

//   let cart = await CartModel.getCartByGuestId(guest_id);
//   const data = { agency_id: event_id };

//   const merge = (items, max, key, detail) => {
//     let index = 1;
//     if (cart) {
//       for (let i = 1; i <= max; i++) {
//         if (cart[`${detail}${i}`]) index++;
//       }
//     }

//     items?.forEach(item => {
//       if (index > max) return;
//       data[`${key}${index}`] = item[`${key}_id`];
//       data[`${detail}${index}`] = JSON.stringify(item);
//       index++;
//     });
//   };

//   merge(booking_data.categories, 5, "cat", "cat_details");
//   merge(booking_data.programs, 10, "program", "program_details");
//   merge(booking_data.addons, 20, "addon", "addon_details");
//   merge(booking_data.services, 10, "service", "service_detail");

//   if (cart) {
//     await CartModel.updateCart(guest_id, data);
//     return { message: "Cart updated" };
//   }

//   data.guest_id = guest_id;
//   await CartModel.insertCart(data);
//   return { message: "Cart created" };
// };





const addToCart = async (req) => {
  const { guest_id } = req.guest;
  const { event_id, booking_data } = req.body;

  if (!guest_id) throw { status: 412, error_code: 412, message: "Guest not found" };
  if (!event_id || !booking_data) throw { status: 400, error_code: 400, message: "Invalid request body" };

  // 1️⃣ Fetch existing cart for the user
  let existingCart = await CartModel.getCartByGuestId(guest_id);

  // Prepare new data to merge
  const newCartData = {};
  newCartData.agency_id = event_id;

  // 2️⃣ Merge function with **correct column names**
//   const mergeItems = (items, maxCount, idPrefix, detailPrefix) => {
//     let count = 1;

//     // Count already filled columns
//     for (let i = 1; i <= maxCount; i++) {
//       const existingDetail = existingCart ? existingCart[`${detailPrefix}${i}`] : null;
//       if (existingDetail) count++;
//     }

//     items?.forEach((item) => {
//       if (count > maxCount) return; // prevent overflow
//       newCartData[`${idPrefix}${count}`] = item[`${idPrefix}_id`] || item.id || 0;
//       newCartData[`${detailPrefix}${count}`] = JSON.stringify(item);
//       count++;
//     });
//   };

const mergeItems = (items, maxCount, idPrefix, detailPrefix, jsonIdKey) => {
  let count = 1;

  // Count already filled columns
  for (let i = 1; i <= maxCount; i++) {
    const existingDetail = existingCart ? existingCart[`${detailPrefix}${i}`] : null;
    if (existingDetail) count++;
  }

  items?.forEach((item) => {
    if (count > maxCount) return; // prevent overflow
    // Use correct JSON key
    newCartData[`${idPrefix}${count}`] = item[jsonIdKey] || 0;
    newCartData[`${detailPrefix}${count}`] = JSON.stringify(item);
    count++;
  });
};

//   // Categories (cat1…cat5)
//   mergeItems(booking_data.categories, 5, "cat", "cat_details");

//   // Programs (program1…program10)
//   mergeItems(booking_data.programs, 10, "program", "program_details");

//   // Addons (addon1…addon20)
//   mergeItems(booking_data.addons, 20, "addon", "addon_details");

//   // Services (service1…service10)
//   mergeItems(booking_data.services, 10, "service", "service_detail");

// Categories (cat1…cat5)
mergeItems(booking_data.categories, 5, "cat", "cat_details", "category_id");

// Programs (program1…program10)
mergeItems(booking_data.programs, 10, "program", "program_details", "program_id");

// Addons (addon1…addon20)
mergeItems(booking_data.addons, 20, "addon", "addon_details", "addon_id");

// Services (service1…service10)
mergeItems(booking_data.services, 10, "service", "service_detail", "service_id");


  // 3️⃣ Insert or update
  if (existingCart) {
    await CartModel.updateCart(guest_id, newCartData);
    return { message: "Cart updated successfully" };
  } else {
    newCartData.guest_id = guest_id;
    const cart_id = await CartModel.insertCart(newCartData);
    return { message: "Cart created successfully", cart_id };
  }
};





/* =========================
   GET CART
========================= */
const getToCart = async (req) => {
  const { guest_id } = req.guest;
  const cart = await CartModel.getCartByGuestId(guest_id);
  if (!cart) return null;

  const res = { categories: [], programs: [], addons: [], services: [] };

  for (let i = 1; i <= 5; i++)
    if (cart[`cat_details${i}`]) res.categories.push(JSON.parse(cart[`cat_details${i}`]));

  for (let i = 1; i <= 10; i++)
    if (cart[`program_details${i}`]) res.programs.push(JSON.parse(cart[`program_details${i}`]));

  for (let i = 1; i <= 20; i++)
    if (cart[`addon_details${i}`]) res.addons.push(JSON.parse(cart[`addon_details${i}`]));

  for (let i = 1; i <= 10; i++)
    if (cart[`service_detail${i}`]) res.services.push(JSON.parse(cart[`service_detail${i}`]));

  return res;
};

/* =========================
   UPDATE ITEM (PUT)
========================= */
const updateCartItem = async (req) => {
  const { guest_id } = req.guest;
  const { type, id, quantity, amount } = req.body;

  const map = {
    category: { max: 5, key: "cat", detail: "cat_details", idKey: "category_id" },
    program: { max: 10, key: "program", detail: "program_details", idKey: "program_id" },
    addon: { max: 20, key: "addon", detail: "addon_details", idKey: "addon_id" },
    service: { max: 10, key: "service", detail: "service_detail", idKey: "service_id" },
  };

  const cfg = map[type];
  if (!cfg) throw { status: 400, message: "Invalid type" };

  const cart = await CartModel.getCartByGuestId(guest_id);
  if (!cart) throw { status: 404, message: "Cart not found" };

  for (let i = 1; i <= cfg.max; i++) {
    const raw = cart[`${cfg.detail}${i}`];
    if (!raw) continue;

    const parsed = JSON.parse(raw);
    if (parsed[cfg.idKey] === id) {
      parsed.quantity = quantity;
      parsed.amount = amount;

      await CartModel.updateCart(guest_id, {
        [`${cfg.detail}${i}`]: JSON.stringify(parsed),
      });

      return { message: "Item updated" };
    }
  }

  throw { status: 404, message: "Item not found" };
};

const deleteCart = async (req) => {
  const { guest_id } = req.guest;
  const { type, category_id, program_id, addon_id, service_id } = req.body;

  if (!guest_id) {
    throw { status: 412, error_code: 412, message: "Guest not found" };
  }

  const cart = await CartModel.getCartByGuestId(guest_id);
  if (!cart) {
    throw { status: 404, error_code: 404, message: "Cart not found" };
  }

  let updateData = {};
  let removed = false;

  /* ================= DELETE ALL ================= */
  if (type === "all") {
    for (let i = 1; i <= 5; i++) {
      updateData[`cat${i}`] = null;
      updateData[`cat_details${i}`] = null;
    }

    for (let i = 1; i <= 10; i++) {
      updateData[`program${i}`] = null;
      updateData[`program_details${i}`] = null;
      updateData[`service${i}`] = null;
      updateData[`service_detail${i}`] = null;
    }

    for (let i = 1; i <= 20; i++) {
      updateData[`addon${i}`] = null;
      updateData[`addon_details${i}`] = null;
    }

    await CartModel.updateCart(guest_id, updateData);
    return { message: "All cart items cleared successfully" };
  }

  /* ================= DELETE SINGLE ITEM ================= */
  const removeById = (max, idPrefix, detailPrefix, targetId) => {
    for (let i = 1; i <= max; i++) {
      const colId = cart[`${idPrefix}${i}`];
      const detail = cart[`${detailPrefix}${i}`];

      // ✅ FIX: compare as string OR from JSON
      if (
        colId && String(colId) === String(targetId)
      ) {
        updateData[`${idPrefix}${i}`] = null;
        updateData[`${detailPrefix}${i}`] = null;
        return true;
      }

      // ✅ Extra safety: match from JSON detail
      if (detail) {
        const parsed = JSON.parse(detail);
        if (String(parsed[`${idPrefix}_id`]) === String(targetId)) {
          updateData[`${idPrefix}${i}`] = null;
          updateData[`${detailPrefix}${i}`] = null;
          return true;
        }
      }
    }
    return false;
  };

  if (type === "category") {
    removed = removeById(5, "cat", "cat_details", category_id);
  }

  if (type === "program") {
    removed = removeById(10, "program", "program_details", program_id);
  }

  if (type === "addon") {
    removed = removeById(20, "addon", "addon_details", addon_id);
  }

  if (type === "service") {
    removed = removeById(10, "service", "service_detail", service_id);
  }

  if (!removed) {
    throw { status: 404, error_code: 404, message: "Item not found in cart" };
  }

  await CartModel.updateCart(guest_id, updateData);
  return { message: "Cart item removed successfully" };
};

module.exports = { addToCart, getToCart, updateCartItem, deleteCart};