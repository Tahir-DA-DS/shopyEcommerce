const express = require('express')
const { createCategory, getaCategory,updateCategory, deleteCategory, getallCategory} = require('../controllers/blogCatCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCategory)
router.get('/', getallCategory)
router.get('/:id', getaCategory)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)
module.exports = router

