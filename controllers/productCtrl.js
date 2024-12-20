const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const slugify = require("slugify");
const cloudinaryUpload = require("../utils/cloudinary")
const fs = require("fs")

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
    const productUpdate = await Product.findOneAndUpdate({ id }, req.body, {
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
  try {
    const deleteproduct = await Product.findOneAndDelete({ id });
    res.json(`product with id:${id} deleted`);
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
    //filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exist");
      }
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(`${_id} printed`);
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: prodId } },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: prodId } },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment} = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
        ratings:{$elemMatch:alreadyRated}
      
      },
      {
        $set:{"ratings.$.star":star, "ratings.$.comment":comment}
      },
      {
        new:true
      }
    );

    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment:comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
     
    }
    const getallratings = await Product.findById(prodId)
    let totalRating = getallratings.ratings.length
    let ratingsum = getallratings.ratings.map((item)=>item.star) .reduce((prev, curr)=>prev + curr, 0)
    let actualRatngs = Math.round(ratingsum/totalRating)
    let finalProduct = await Product.findByIdAndUpdate(prodId, {
      totalrating:actualRatngs
    }, {
      new:true
    })
    res.json(finalProduct)
  } catch (error) {
    throw new error();
  }
});

const uploadImages = asyncHandler(async(req, res)=>{
    const {id} = req.params
    validateMongoDbId(id);
    try{
        const uploader = (path)=>cloudinaryUpload(path, 'images')
        const urls = []
        const files = req.files
        for(const file of files){
          const {path} = file
          const newPath = await uploader(path)
          urls.push(newPath)
          fs.unlinkSync(path)
        }

        const findProduct = await Product.findByIdAndUpdate(id, {
          images:urls.map((file)=>{
            return file
          })
        }, {
          new:true
        })
        res.json(findProduct)
    } catch(error){
      throw new Error(error);
    }
})

module.exports = {
  createProduct,
  getaProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages
};
