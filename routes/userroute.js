//Node modules
const express=require('express');

const router=express.Router();

//User defined controllers
const authcontroller=require('../controllers/authcontroller');
const usercontroller=require('../controllers/usercontroller');

router.route('/signup').post(usercontroller.uploadpic,usercontroller.resizepic,authcontroller.signup);
router.route('/login').post(authcontroller.login);
router.route('/forgotpassword').post(authcontroller.forgotpassword);
router.route('/resetpassword/:token').post(authcontroller.resetpassword);
router.route('/changeprofilepic').post(authcontroller.protected,usercontroller.uploadpic,usercontroller.resizepic,usercontroller.changeprofilepic);
router.route('/followcommunity/:communityid').patch(authcontroller.protected,usercontroller.followcommunity);
router.route('/unfollowcommunity/:communityid').patch(authcontroller.protected,usercontroller.unfollowcommunity);
router.route('/:id').get(authcontroller.protected,usercontroller.getoneuser);

module.exports=router
