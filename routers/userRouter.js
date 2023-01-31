
const userController = require('../controllers/userControllers');
const  express=require('express')
const  router= express.Router();
const passport= require('passport');
require('../middlewares/passport')(passport);
const passportAuth= passport.authenticate('jwt',{"session":false})


//============================= only for users ================================================>
router.post('/register',userController.signup);
router.post('/login',userController.userLogin);
router.get('/getAllUsers',passportAuth,userController.allUsers);


//================================  convert from  users to  bloggers =============================================>
router.patch('/makeblogger',passportAuth,userController.toMakeBlogger);
router.get('/getpublishblog',passportAuth,userController.publishBlogs);



module.exports=router;