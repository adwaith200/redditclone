//Node modules
const express=require('express');

//User defined modules
const commentcontroller=require('../controllers/commentcontroller');
const authcontroller=require('../controllers/authcontroller');

const router=express.Router();

router.route('/').get(commentcontroller.getallcomments).post(authcontroller.protected,commentcontroller.createcomment);

router.route('/postcomment/:id').get(commentcontroller.getpostcomments);

module.exports=router;