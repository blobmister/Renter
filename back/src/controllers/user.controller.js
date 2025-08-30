const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const getReviews = async (req, res) => {
    try {
        const userId = req.params.userId;

        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('reviewee_id', userId);

        if (error) {
            return res.status(400).send({error: error.message});
        }

        if (data.length === 0) {
            return res.status(403).send({error: 'No reviews found'});
        }

        return res.status(200).send({data: data});
    } catch (err) {
        return res.status(500).send({error: 'Internal Server Error'});
    }
}

const getAveReview = async (req, res) => {
    try {
        const userId = req.params.userId;

        const { data, error } = await supabase
            .from('reviews')
            .select('stars')
            .eq('reviewee_id', userId);

        if (error) {
            return res.status(400).send({error: error.message});
        }

        const totalStars = data.reduce((sum, review) => sum + Number(review.stars), 0);
        const averageStars = data.length > 0 ? totalStars / data.length : 0;

        return res.status(200).send({data: averageStars});
    } catch (err) {
        return res.status(500).send({error: 'Internal Server Error'});
    }
}

const createReview = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { reviewText, stars } = req.body;

        const { data, error } = await supabase
            .from('reviews')
            .insert([{
                writer_id: req.user.id,
                reviewee_id: userId,
                review_text: reviewText,
                stars: stars,
            }])
        if (error) {
            return res.status(400).send({error: error.message});
        }

        return res.status(200).send({data: data[0]});
    } catch (err) {
        return res.status(500).send({error: 'Internal Server Error'});
    }
}

module.exports = { getReviews, createReview, getAveReview };