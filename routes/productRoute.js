const express = require("express");
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/productControllers");
const upload = require("../middleware/multer");
const adminAuth = require("../middleware/adminAuth");

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), adminAuth, addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/single", singleProduct); 

module.exports = productRouter;
