const express = require('express')
const {createCoupon, getAllCoupon} = require('../controllers/couponCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCoupon)
router.get('/', authMiddleware, isAdmin, getAllCoupon)


module.exports =router