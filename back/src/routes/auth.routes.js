const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const {
    registerUser,
    loginUser
} = require('../controllers/auth.controller');
require('dotenv').config();


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
