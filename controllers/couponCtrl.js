const Coupon = require('../models/couponModel')
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require("../utils/validateMongodbid")

const createCoupon = asyncHandler(async(req, res)=>{

    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new(Error)
    }

})


module.exports = {createCoupon}