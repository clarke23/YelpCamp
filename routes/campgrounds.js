const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, isOwner, validateCampground } = require('../middleware')
const Campground = require('../models/campground')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })
// MVC-Model-View-Controller É UM PATTERN NUM software design commonly used to implement user interfaces, data, and controlling logic.

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground))
    
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isOwner,upload.array('image'), catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isOwner, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.renderEditPage))

module.exports = router