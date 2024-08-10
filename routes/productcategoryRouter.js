const express = require('express')
const { createCategory, getaCategory,updateCategory, deleteCategory, getallCategory} = require('../controllers/productcategoryCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCategory)
router.get('/:id', getaCategory)
router.get('/', getallCategory)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)
module.exports = router

