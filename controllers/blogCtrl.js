const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require("../utils/validateMongodbid")

const createBlog = asyncHandler(async (req, res)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res)=>{
    const {id} = req.params
    try {
        const blogUpdate = await Blog.findByIdAndUpdate(id, {$set:req.body}, {new:true, runValidators: true})
        res.json(blogUpdate)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createBlog, updateBlog }