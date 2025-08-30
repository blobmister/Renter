const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { requireAuth } = require('../middleware/auth.middleware');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

router.use(requireAuth);

router.get(/getAveRevScore/:userId);
router.get(/getReviews/:userId);
router.post(/createReview/:uesrId);
router.delete(/deleteReivew/:id);

module.exports = router;