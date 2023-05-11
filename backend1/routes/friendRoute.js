const router = require('express').Router();
const {addFriend} = require('../controller/friendController');
const { friendMiddleware } = require('../middleware/friendMiddleware');

router.post('/add/',addFriend);

module.exports = router;