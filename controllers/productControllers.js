const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file;

    if (!image) {
      return res.json({ success: false, message: "Please upload an image" });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      image: result.secure_url,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: "Could not add product" });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.query; // FIXED for GET request
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
};
