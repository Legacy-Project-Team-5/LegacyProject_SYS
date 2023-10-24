const Product = require("../models/model");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authorization");
require("dotenv").config();

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find().populate("creator", "email");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error from getAll controllers" });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log(req.user)
    let creator = req.user.id;
    let { title, imgUrl, description, price } = req.body;
    let newProduct = {
      title,
      imgUrl,
      description,
      price,
      creator,
    };
    let product = await Product.create(newProduct);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error from create controllers" });
  }
};

const updateProduct = async (req, res) => {
  try {
    let clientValue = req.body;
    await Product.updateOne({ _id: req.params.id }, clientValue);
    res.status(200).send({ msg: "update is work" });
  } catch {
    console.log(error);
    res.status(500).send({ msg: "server error from update controllers" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "delete is work" });
  } catch {
    console.log(error);
    res.status(500).send({ msg: "server error from delete controllers" });
  }
};

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.send({ msg: "Both email and password are required" });
    }
    let found = await User.findOne({ email });
    if (found) {
      return res.send({ msg: "Email already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword });
    return res.send({ msg: "Registered successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(402)
        .send({ msg: "Both email and password are required" });
    }
    let oldUser = await User.findOne({ email });
    if (oldUser) {
      let validPassword = await bcrypt.compare(password, oldUser.password);
      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password" });
      } else {
        // return res.send({msg:"login successful"})
        let token = jwt.sign(
          {
            email: oldUser.email,
            id: oldUser._id,
          },
          process.env.TOKEN_KEY,
          // { expiresIn: "2h" }
        );
        res.status(200).send({ msg: "Login successful", token });
      }
    } else {
      return res
        .status(404)
        .send({ msg: "Invalid email, please register first" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  register,
  login,
};
