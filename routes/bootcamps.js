const express = require('express')
const { protect } = require('../middleware/auth')
const { getBootcamp, 
        getBootcamps, 
        createBootcamp, 
        updateBootcamp, 
        deleteBootcamp,
        getBootcampsInRadius, 
        bootcampPhotoUpload
    } = require('../controllers/bootcamps')

const advancedResults = require('../middleware/advancedResults')
const Bootcamp = require('../models/Bootcamps')


//Include other resource routers
const courseRouter = require('./courses')




const router = express.Router()

//Re-route to other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').put(protect,bootcampPhotoUpload)

router.route('/')
    .get((advancedResults(Bootcamp, 'courses')), getBootcamps)
    .post(protect,createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect,updateBootcamp)
    .delete(protect,deleteBootcamp)



module.exports = router