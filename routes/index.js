const router = require('express').Router();
const apiRoutes = require('./api'); //Will import all the API routes

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(400).send('404 ERROR!');
});

module.exports = router;