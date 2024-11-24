const express = require("express")
const router = express.Router()
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const {createBlog, updateBlog, getBlog, getAllblogs, deleteBlog, likeBlog, disliketheBlog, uploadImages} = require('../controllers/blogCtrl')
const { uploadPhoto, blogImgResize} = require("../middlewares/uploadImages");

router.post('/', authMiddleware, isAdmin, createBlog)
router.get('/', getAllblogs)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, disliketheBlog)
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 2), blogImgResize, uploadImages)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
module.exports = router