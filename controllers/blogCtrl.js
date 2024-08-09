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
    validateMongoDbId(id)
    try {
        const blogUpdate = await Blog.findByIdAndUpdate(id, {$set:req.body}, {new:true, runValidators: true})
        res.json(blogUpdate)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async (req, res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        await Blog.findByIdAndUpdate(id, {$inc:{numViews:1}}, {new:true})
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllblogs = asyncHandler(async (req, res)=>{
    try {
        const allBlogs = await Blog.find()
        res.json(allBlogs)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async (req, res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async (req, res)=>{
    const {blogId} = req.body

    console.log(blogId);
    validateMongoDbId(blogId)
    try {
        const blog = await Blog.findById(blogId)

        const loginUserId = req?.user?._id

        const isLiked = blog?.isLiked

        const alreadyDisliked = blog?.dislikes?.find(
            (userId => userId?.toString()=== loginUserId?.toString())
        )

        if(alreadyDisliked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{dislikes : loginUserId},
                isDisliked:false
            }, {new:true})
            res.json(blog)
        }

        if(isLiked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{likes : loginUserId},
                isLiked:false
            }, {new:true})
            res.json(blog)
        }
        else{
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push:{likes : loginUserId},
                isLiked:true
            }, {new:true})
            res.json(blog)
        }

    } catch (error) {
        throw new Error(error)
    }
})

const disliketheBlog = asyncHandler(async (req, res)=>{
    const {blogId} = req.body

    console.log(blogId);
    validateMongoDbId(blogId)
    try {
        const blog = await Blog.findById(blogId)

        const loginUserId = req?.user?._id

        const isDisLiked = blog?.isDisliked

        const alreadyLiked = blog?.likes?.find(
            (userId => userId?.toString()=== loginUserId?.toString())
        )

        if(alreadyLiked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{likes : loginUserId},
                isLiked:false
            }, {new:true})
            res.json(blog)
        }

        if(isDisLiked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull:{dislikes : loginUserId},
                isDisliked:false
            }, {new:true})
            res.json(blog)
        }
        else{
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push:{dislikes : loginUserId},
                isDisliked:true
            }, {new:true})
            res.json(blog)
        }

    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createBlog, updateBlog, getBlog, getAllblogs, deleteBlog, likeBlog, disliketheBlog}