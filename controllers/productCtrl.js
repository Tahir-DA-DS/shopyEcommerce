const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params._id;
  console.log(id, "here");
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await Product.findOneAndUpdate({id}, req.body, {
        new: true,
    });
    console.log(productUpdate);
    res.json(productUpdate);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params._id;
    try{
      const deleteproduct = await Product.findOneAndDelete({id})
      res.json(`product with id:${id} deleted`)
    } catch (error) {
      throw new Error(error);
    }
  });

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllproducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json(allProducts);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct, getaProduct, getAllproducts, updateProduct, deleteProduct};
