//Node modules
const express=require('express');

//User defined modules
const communitycontroller=require('../controllers/communitycontroller');
const { route } = require('./userroute');

const router=express.Router();

router.route('/')
    .get(communitycontroller.getallcommunity)
    .post(communitycontroller.uploadpic,communitycontroller.resizepic,communitycontroller.createcommunity);

router.route('/:id')
    .get(communitycontroller.getonecommunity);

//Get the posts for a community based on highest upvotes
router.route('/toppost/:id').get(communitycontroller.gettoppostcommunity);

//Get the posts for a community based on latest date
router.route('/newpost/:id').get(communitycontroller.getnewpostcommunity);

module.exports=router;