const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

/**
 * POST /api/auth/register
 * Body: { email, password }
 */
router.post('/register', async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location)
        return res.status(400).json({ error: 'Email and password required' });

    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                name: name,
                location: location,
            }
        });

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: 'User registered', user: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: 'Email and password required' });

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) return res.status(401).json({ error: error.message });

        // Returns session info including access_token
        res.json({ message: 'Login successful', session: data.session });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
