'use strict';
const Child = require('../models/child');
const User = require('../models/user');

const createChild =  (req, res) => {
const childID= req.body.childID;
const id= req.params.id
    Child.findOne({childID}).then((child)=>{
        if(child != null){
            res.json({status:404})
            return
        }else{
    const child = new Child({
        name:req.body.name,
        childID:req.body.childID,
        garde:req.body.garde,
        school:req.body.school,
        Pphone:req.body.Pphone,
        Pemail:req.body.Pemail,
        Pname:req.body.Pname,
        SD:req.body.SD,
        wayHome:req.body.wayHome,
        photoUrl:req.body.photoUrl

    });
    child.save().then(newChild => {
            User.findByIdAndUpdate(id,{
                $push: {
                    childs: {
                        $each: [newChild],
                        $position: 0
                    }
                }
            },{new:true}).then(()=> getUser(req,res))
            .catch((e)=>{
                res.json({status:400})
            })
        }).catch((e) => {
        console.log(e);
        res.json({ status: 400 });
    });



        }
    }).catch((e) => {
        console.log(e);
        res.json({ status: 400 });
    })

}

 const getAllChilds= (req,res)=>{
    const children= Child.find({}).then((childrens)=>{
        res.json(childrens);
    })
 }


 const deleteChild=  (req,res)=>{
    const user= req.params.Uid;
    const child=req.params.Cid
  User.findById(user).then((user)=>{

      if(user!=null){
        User.findByIdAndUpdate(user,{
            $pullAll: {
                childs: [child]
            }
        },{new:true}).then(()=> res.json({status:200}))
        .catch((e)=>{
            res.json({status:400})
        })
      }
  }).catch((e)=>{
        res.json({status:404})
    })
}

const updateChild=  (req,res)=>{
    Child.findByIdAndUpdate(req.params.idChild,{
        name:req.body.name,
        childID:req.body.childID,
        garde:req.body.garde,
        school:req.body.school,
        Pphone:req.body.Pphone,
        Pemail:req.body.Pemail,
        Pname:req.body.Pname,
        SD:req.body.SD,
        wayHome:req.body.wayHome,
        photoUrl:req.body.photoUrl
        },{new:true}).then(()=> res.json({status:200}))
    .catch((e)=>{
        res.json({status:400})
    })
}
const getUser= (req,res)=>{
    const id= req.params.id
   const user= User.findById(id).populate('childs').exec((err, docs)=>{
       if(err){
           console.log("not ok");
           return res.json({status: 404})
       }else{
          return res.json({status:200, user:docs})
       }
   })
}
module.exports = {
    createChild,
    getAllChilds,
    deleteChild,
    updateChild
}