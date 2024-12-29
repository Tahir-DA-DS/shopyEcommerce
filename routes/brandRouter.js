const express = require('express')
const { createBrand, getaBrand,updateBrand, deleteBrand, getallBrand} = require('../controllers/brandCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createBrand)
router.get('/', getallBrand)
router.get('/:id', getaBrand)
router.put('/:id', authMiddleware, isAdmin, updateBrand)
router.delete('/:id', authMiddleware, isAdmin, deleteBrand)
module.exports = router

