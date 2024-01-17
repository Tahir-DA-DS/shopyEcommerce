const express = require("express")
const router = express.Router()
const {createProduct, getaProduct, getAllproducts} = require('../controllers/productCtrl')

router.post('/', createProduct)
router.get('/:id', getaProduct)
router.get('/', getAllproducts)



module.exports = router