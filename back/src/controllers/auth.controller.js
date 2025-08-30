const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const registerUser = async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
        return res.status(400).json({ error: 'Name, email, password and location are required' });
    }

    try {
        // Create user in Supabase auth
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const user = data.user;

        // Insert extra profile info in userInfo
        const { error: insertError } = await supabase
            .from('userInfo')
            .insert({
                id: user.id, // link to auth.users
                name,
                location
            });

        if (insertError) {
            return res.status(400).json({ error: insertError.message });
        }

        res.status(201).json({ message: 'User registered', user: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const loginUser = async (req, res) => {
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
};

module.exports = { registerUser, loginUser };