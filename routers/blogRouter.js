const blogController= require('../controllers/blogControllers');
const express= require('express');
const router= express.Router();
const passport= require('passport');
require('../middlewares/passport')(passport);
const passportAuth= passport.authenticate('jwt',{"session":false})


//=================================== To blog ===========================================================>>>>>
router.post('/createblog',passportAuth,blogController.addBlog);
router.post('/addcomment',passportAuth,blogController.postComment);
router.patch('/editblog/:id',passportAuth,blogController.editPost);
router.patch('/publishblog/:id',passportAuth,blogController.publishPost);
router.patch('/unpublishblog/:id',passportAuth,blogController.unPublishPost);
router.delete('/deleteblog/:id',passportAuth,blogController.deletePost);
router.get('/readblogs',passportAuth,blogController.getAllPosts);


module.exports=router;