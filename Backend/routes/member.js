const express=require('express');
const router=express.Router();
const Member=require('../models/members');
router.get('/' , async (req,res)=>{

    try{

        const users = await Member.find();

        res.send(users);

    }catch(err){

        res.status(500).send(err);

    }

})
router.get('/search',async(req,res)=>{
    try{

        const users = await Member.find({'name':{$regex:req.query.term,$options:'i'}})

        res.send(users);

    }catch(err){

        res.status(500).send(err);

    }
})

router.get('/:id' , async (req,res)=>{

    try{

        const user = await Member.findOne({member_id:req.params.id});

        if(!user){

            return res.status(404).send('User not found');

        }

        res.send(user);

    }catch(err){

        res.status(500).send(err);

    }

})
router.post('/' , async (req,res)=>{
   console.log(req.body);
    try{
        const maxMemberId = await Member.findOne({}, {}, { sort: { 'member_id': -1 } });
        const newMemberId = maxMemberId ? maxMemberId.member_id + 1 : 1;
        req.body.member_id=newMemberId;
        const user = new Member(req.body);
        console.log(req.body);
        console.log(user);
        await user.save();

        res.send(user);

    }catch(err){

        res.status(500).send(err);

    }

})

 

router.put('/:id' , async (req,res)=>{

    try{

        const user = await Member.findOneAndUpdate({member_id:req.params.id} , req.body, {new:true});

        if(!user){

            return res.status(404).send('User not found');

        }

        res.send(user);

    }catch(err){

        res.status(500).send(err);

    }

})

 

router.delete('/:id' , async (req,res)=>{

    try{

        const user = await Member.findOneAndDelete({member_id:req.params.id});

        if(!user){

            return res.status(404).send('User not found');

        }

        res.send(user);

    }catch(err){

        res.status(500).send(err);

    }

})
module.exports=router