const express = require('express')
const router = express.Router()
const {creatUser, loginCtrl, getAllusers, getaUser, delaUser, updateaUser, blockUSer, unblockUSer} = require('../controllers/userCtrl')
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')

router.post('/register', creatUser)
router.post('/login', loginCtrl)
router.get('/all-users', getAllusers)
router.get('/:id', authMiddleware, isAdmin, getaUser)
router.delete('/:id', delaUser)
router.put('/edit-user', authMiddleware, updateaUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUSer)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUSer)

module.exports = router