
const express=require('express');
const bodyParser = require('body-parser');
const uuid =require('uuid');

const router=express.Router();

var jsonParser=bodyParser.json();
//creating an API in express
const members=require('../../Members'); //extracting data from Members.js

//this wll get JSON API members
router.get('/', (req,res) => {
    res.json(members);

});


//get single member of the API
router.get('/:id', (req,res) => {
    
    console.log(req.params.id);
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});


//create a member
router.post('/',jsonParser,(req,res)=>{
    console.log("In Post function");
    const newMember = {
        id: req.body.id,
        name: req.body.name,
        status:'active'
    };
    console.log(newMember);
    //return because Else not required
    if(!newMember.name)
    {
        return res.status(400).json({msg:'Please include a name '});
    }
    
    members.push(newMember);
    res.json(members);
    
});

//update member
router.put('/:id',jsonParser,(req,res) => {
    const found=members.some(member => member.id === parseInt(req.params.id));

    if(found)
    {
        const updMemeber=req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id))
            {
                member.name = updMemeber.name?updMemeber.name : member.name;
                res.json({msg:'Member updated',member});
            }
        });
    }
    else
    {
        res.status(400).json({msg:`No member with the id of ${req.params.id} exists`});
    }
});

//delete member 
router.delete('/:id',jsonParser,(req,res) => {
    const found=members.some(member => member.id === parseInt(req.params.id));

    if(found)
    {
        res.json({
            msg:"Member deleted",
            members:members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else
    {
        res.status(400).json({msg:`No member with the id of ${req.params.id} exists`});
    }
});


module.exports=router;