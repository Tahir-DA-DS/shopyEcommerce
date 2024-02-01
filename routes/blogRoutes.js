const express = require("express")
const router = express.Router()
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const {createBlog} = require('../controllers/blogCtrl')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/:id', authMiddleware, isAdmin, createBlog)

module.exports = router