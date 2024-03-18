const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/thought', thoughtRoutes);
router.use('/api/user', userRoutes);

module.exports = router;
