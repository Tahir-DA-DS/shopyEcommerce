const Product = require('../models/productModel')
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")

const createProduct = asyncHandler(async(req, res)=>{
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const getaProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params
    try {
        const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
} )

const getAllproducts = asyncHandler(async (req, res)=>{
    try {
        const allProducts = await Product.find({})
        res.json(allProducts)
    } catch (error) {
        throw new Error(error)
        
    }
})

module.exports = {createProduct, getaProduct, getAllproducts}