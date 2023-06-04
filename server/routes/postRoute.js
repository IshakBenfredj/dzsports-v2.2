const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/posts/add/:userId', postController.addPost);
router.delete('/post/delete/:postId', postController.removePost);
router.get('/posts/get', postController.getPosts);
router.get('/post/get/:id', postController.getPostById);
router.get('/getAdminPost', postController.getAdminPost);
router.get('/posts/getById/:id', postController.getPostsById);
router.post('/changephotoprofile/:id', postController.changeProfile);
router.post('/addJam/:postId/:adminId', postController.addJam);
router.post('/incJam/:postId/:adminId', postController.incJam);
router.post('/addComment/:postId', postController.addComment);
router.post('/deleteComment/:postId/:commentId', postController.deleteComment);

module.exports = router;