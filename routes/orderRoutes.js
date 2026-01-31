const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderControllers");

router.post("/", createOrder);
router.get("/", getOrders);

module.exports = router;
