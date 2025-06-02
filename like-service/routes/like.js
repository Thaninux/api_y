const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/like', likeController.likePost);
router.post('/unlike', likeController.unlikePost);
router.get('/post/:postId', likeController.getLikesByPost);

module.exports = router;
