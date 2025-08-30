const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const {
    createItems,
    getAllItems,
    getUserItems,
    updateItem,
    deleteItem
} = require('../controllers/item.controller');

const { requireAuth } = require('../middleware/auth.middleware');

require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

router.use(requireAuth);

router.get('/getAll', getAllItems);
router.get('/getUserItems/:userId', getUserItems);
router.post('/', createItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
