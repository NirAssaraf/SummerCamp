'use strict';
const { populate } = require('../models/user');
const User = require('../models/user');

const createUser =  (req, res) => {
const email= req.body.email;
    User.findOne({email}).then((user)=>{
        if(user != null){
            res.json({status:"the user is allready exist"})
            return
        }else{
    const user = new User({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    });

    user.save().then(newUser => {
        res.json({ status: 'ok', user : newUser });
    }).catch((e) => {
        res.json({ status: 'failed' });
    });
        }
    });
}
const login=async (req, res) => {
    const {email,password}=req.params;
     return await User.findOne({email}).then((user)=>{ 
         if (!user) {
           return  res.json({
             status:404,
             message:'User not found'
 
         });
         }
         if(!user.authenticate(password)){
         return  res.json({
           status:400,
           message:'Email or password dose not match'
       });
     }
       return getUser(req,res);

     });
     
 };

 const getAllUsers= (req,res)=>{
    const users= User.find({}).then((users)=>{
        res.json(users);
    })
 }

 const getUser= (req,res)=>{
     const email= req.params.email
    const user= User.findOne({email}).populate('childs').exec((err, docs)=>{
        if(err){
            console.log("not ok");
            return res.json({status: 404})
        }else{
           return res.json({status:200, user:docs})
        }
    })
 }
 

 const updateUser=  (req,res)=>{
     User.findByIdAndUpdate(req.params.id,{
         type:req.body.type
     },{new:true}).then(()=> res.json({status:"ok"}))
     .catch((e)=>{
         res.json({status:"failed"})
     })
 }

 const deleteUser=  (req,res)=>{
  User.findById(req.params.id).then((user)=>{
    user.remove().then(()=>{
        res.json({status:200})
    })
  })
    .catch((e)=>{
        res.json({status:404})
    })
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    updateUser,
    deleteUser,
}