//Node modules
const express=require('express');

//User defined modules
const postcontroller=require('../controllers/postcontroller');
const authcontroller=require('../controllers/authcontroller');

const router=express.Router();

router.route('/').get(postcontroller.getallposts).post(authcontroller.protected,postcontroller.uploadpic,postcontroller.resizepic,postcontroller.createpost);

router.route('/topposts').get(postcontroller.gettopposts);

router.route('/topuserpost').get(authcontroller.protected,postcontroller.getusertoppost);

router.route('/newuserpost').get(authcontroller.protected,postcontroller.getusernewposts);

router.route('/upvote/:id').get(authcontroller.protected,postcontroller.upvotepost);

router.route('/downvote/:id').get(authcontroller.protected,postcontroller.downvotepost);

router.route('/:id').get(postcontroller.getoneposts);


module.exports=router;