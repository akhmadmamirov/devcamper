const express = require('express')
const User = require('../models/User') 
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users') 

const router = express.Router({mergeParams: true})

//Middleware
const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')
const { create } = require('../models/User')
const { get } = require('./users')

router.use(protect);
router.use(authorize('admin'))
 
router
.route('/')
    .get(advancedResults(User),getUsers)
    .post(createUser)


router
.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;