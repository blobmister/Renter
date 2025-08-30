const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const createItems = async (req, res) => {
    const { title, description } = req.body;
    try {
        const { data, error } = await supabase.from('items').insert([
            { user_id: req.user.id, title, description },
        ])
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json({ item: data[0] })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' });
    }
}

const getAllItems = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*')

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({ items: data });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' });
    }
}

const getUserItems = async (req, res) => {
    try {
        let userId = req.user.id;

        if (req.params.userId) {
            userId = req.params.userId;
        }

        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ items: data });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' });
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const { data, error } = await supabase
            .from('items')
            .update({ title, description })
            .eq('id', id)
            .eq('user_id', req.user.id)

        if (error) {
            return res.status(400).json({error: error.message});
        }

        if (data.length === 0) {
            res.status(500).json({ error: 'Item doesn\'t exist' });
        }

        res.status(200).json({ item: data });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' });
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user.id)

        if (error) {
            return res.status(400).json({error: error.message});
        }

        if (data.length === 0) {
            res.status(500).json({ error: 'Item doesn\'t exist' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' });
    }
}

module.exports = {createItems, getAllItems, getUserItems, updateItem, deleteItem};