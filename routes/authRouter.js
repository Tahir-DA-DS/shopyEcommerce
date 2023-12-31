const express = require('express')
const router = express.Router()
const {creatUser, loginCtrl} = require('../controllers/userCtrl')


router.post('/register', creatUser)
router.post('/login', loginCtrl)



module.exports = router