const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const {
    getAveReview,
    getReviews,
    createReview,
    getUserInfo,
    setUserInfo,
} = require('../controllers/user.controller');
require('dotenv').config();

router.use(requireAuth);

router.get('/getAveRevScore/:userId', getAveReview);
router.get('/getReviews/:userId', getReviews);
router.post('/createReview/:userId', createReview);

router.get('/getUserInfo/:userId', getUserInfo);
router.post('/setUserInfo/', setUserInfo);

module.exports = router;