const express = require('express')
const router = express.Router()
const {creatUser, loginCtrl, getAllusers, getaUser, delaUser, updateaUser} = require('../controllers/userCtrl')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/register', creatUser)
router.post('/login', loginCtrl)
router.get('/all-users', getAllusers)
router.get('/:id', authMiddleware, getaUser)
router.delete('/:id', delaUser)
router.put('/:id', updateaUser)

module.exports = router