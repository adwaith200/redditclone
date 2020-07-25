//Node modules
const express=require('express');

//User defined modules
const postcontroller=require('../controllers/postcontroller');
const authcontroller=require('../controllers/authcontroller');

const router=express.Router();

router.route('/').get(postcontroller.getallposts).post(authcontroller.protected,postcontroller.createpost);

router.route('/topposts').get(postcontroller.gettopposts);

router.route('/:id').get(postcontroller.getoneposts);

module.exports=router;