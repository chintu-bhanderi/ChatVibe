const router = require('express').Router();

const {getFriends,messageUploadDB,audioMessageUploadDB,messageGet,ImageMessageSend,messageSeen,delivaredMessage, getMessageSuggestion, postMessageSuggestion} = require('../controller/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/get-friends',authMiddleware,getFriends);  
router.post('/send-message',authMiddleware, messageUploadDB);
router.post('/send-audio-message',authMiddleware, audioMessageUploadDB);
router.get('/get-message/:id',authMiddleware, messageGet);
router.post('/image-message-send',authMiddleware, ImageMessageSend);

router.post('/seen-message',authMiddleware, messageSeen);
router.post('/delivared-message',authMiddleware, delivaredMessage);

router.get('/message-suggestion', getMessageSuggestion);
router.post('/message-suggestion', postMessageSuggestion);

module.exports = router;