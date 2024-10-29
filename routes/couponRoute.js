const express = require('express')
const {createCoupon} = require('../controllers/couponCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCoupon)

module.exports =router