const express = require('express')
const router = express.Router({ mergeParams: true })
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

const { isLoggedIn, validateReview,isReviewOwner } = require('../middleware')

const Campground = require('../models/campground')
const Review = require('../models/review')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn,isReviewOwner, catchAsync(reviews.deleteReview))

module.exports = router