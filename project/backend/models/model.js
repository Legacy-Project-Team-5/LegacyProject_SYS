const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    imgUrl: String,
    description: String,
    price: String,
    category: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);



module.exports = Product;
