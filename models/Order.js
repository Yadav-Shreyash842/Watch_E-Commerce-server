const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: Number,
  
  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  status: {
    type: String,
    default: "Pending"
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
