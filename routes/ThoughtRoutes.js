const router = require('express').Router();

const { getThoughts, getThoughtsById, createThoughts, updateThoughts, deleteThoughts, createReaction, removeReaction } = require('../controllers/ThoughtController');

router.route('/').get(getThoughts).post(createThoughts);
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtsId/reactions').post(createReaction);
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;