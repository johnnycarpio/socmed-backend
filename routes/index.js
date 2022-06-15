const router        = require('express').Router();
const userRoutes    = require('./UserRoutes');
const thoughtRoutes = require('./ThoughtRoutes');

router.use('/api/users',userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;