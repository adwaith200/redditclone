//Node modules
const express=require('express');

//User defined modules
const commentcontroller=require('../controllers/commentcontroller');

const router=express.Router();

router.route('/').get(commentcontroller.getallcomments).post(commentcontroller.createcomment);

router.route('/postcomment/:id').get(commentcontroller.getpostcomments);

module.exports=router;