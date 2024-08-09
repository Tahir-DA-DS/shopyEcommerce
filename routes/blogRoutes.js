const express = require("express")
const router = express.Router()
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const {createBlog, updateBlog, getBlog, getAllblogs, deleteBlog, likeBlog, disliketheBlog} = require('../controllers/blogCtrl')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, disliketheBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.get('/', getAllblogs)
module.exports = router