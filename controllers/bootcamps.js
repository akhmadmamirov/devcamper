const path = require('path')
const Bootcamp = require('../models/Bootcamps')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
const asyncHandler = require('../middleware/async')
const { parse } = require('dotenv')


// @desc    Get all bootcamps
// @route   GET api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    
    res.status(200).json(res.advancedResults)
})

// @desc    Create a bootcamp
// @route   POST api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
     //Add user to req.body
     req.body.user = req.user.id;
    
     //Check for published bootcamp
     const publishedBootcamp = await Bootcamp.findOne({user: req.user.id})
 
     //if the user is not admin, they can only add one bootcamp
     if (publishedBootcamp && req.user.role !== 'admin'){
         return next(new ErrorResponse(`The user with id ${req.user.id} has already published a bootcamp`, 400))
     }
 
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({success: true, data: bootcamp})
    }
)
// @desc    Get a bootcamp
// @route   GET api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, message: bootcamp})
})
    
    


// @desc    Update a bootcamp
// @route   PUT api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, message: bootcamp})
})

// @desc    delete a  bootcamp
// @route   DELETE api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    bootcamp.deleteOne(); 

    res.status(201).json({success: true, message: `Deleted bootcamp ${req.params.id}`})
})

// @desc    get bootcamps with radius
// @route   GET api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params

    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    //Cals radius using radians
    //Divide distance by radius of earth
    //Earth radius = 3.963 miles / 6.378 kms
    const radius = distance / 3963
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]
            }
        }
    })
    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
})

// @desc    upload a photo for bootcamp
// @route   PUT api/v1/bootcamps/:id/photo
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    
    if(!req.files){
        return next(new ErrorResponse(`Please upload a file ${req.params.id}`, 400));
    }

    const file = req.files.file

    //Make sure that image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file ${req.params.id}`, 400));
    }

    //Check File Size
    if (file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    //Create custon name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err){
            console.error(err)
            return next(new ErrorResponse(
                `Proble with file upload`
                , 500));
        }
        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name})
        
        res.status(200).json({success: true, data: file.name })
    })
})




