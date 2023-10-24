const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authorization");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    register,
    login,
  } = require("../controllers/controllers");

  router.get("/", getAllProducts);
  router.post("/create",verifyToken, createProduct);
  router.put("/:id", updateProduct);
  router.delete("/:id", deleteProduct);
  router.post("/register",register)
  router.post("/login",login)


  module.exports = router;