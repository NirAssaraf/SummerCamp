'use strict';
const Product = require('../models/product');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const createProduct =  (req, res) => {
const data= req.body;
    const product= new Product({
        name:data.name,
        price:data.price,
        status:data.status,
        url:data.url
    })
        product.save().then(newProduct => {
            res.json({ status: 200 });
        }).catch((e) => {
            res.json({ status: 404 });
        });
}

 const getAllProducts= (req,res)=>{
    const prod= Product.find({}).then((prod)=>{
        res.json(prod);
    })
 }


 const deleteProd=  (req,res)=>{
    Product.findById(req.params.id).then((pro)=>{
      pro.remove().then(()=>{
          res.json({status:200})
      })
    })
      .catch((e)=>{
          res.json({status:404})
      })
  }

const updateProduct=  (req,res)=>{
    const data=req.body;
    Product.findByIdAndUpdate(req.params.id,{
        name:data.name,
        price:data.price,
        status:data.status,
        url:data.url
        },{new:true}).then(()=> res.json({status:200}))
    .catch((e)=>{
        res.json({status:404})
    })
}

const addToCart=  (req,res)=>{
    const userId= req.params.uId;
    const proId= req.params.pId;
    Product.findById(proId).then((pro)=>{
        if(pro!=null){
            User.findByIdAndUpdate(userId,{
                $push: {
                    cart: {
                        $each: [pro],
                        $position: 0
                    }
                }
            },{new:true}).then(()=> getUser(req,res))
            .catch((e)=>{
                res.json({status:400})
            })
        }else{
            res.json({status:404})
        }
    })
 
}

const RemoveFromCart=  (req,res)=>{
    const id= req.params.Uid;
    const ProductID=req.params.Pid
  User.findById(id).then((user)=>{

      if(user!=null){
        User.findByIdAndUpdate(id,{
            $pullAll: {
                cart: [ProductID]
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
const total= async (id)=>{
   // const id=req.params.id;
    var total=0;
    var count=Number;
    const user = await User.findById(id).populate('cart').exec((err, docs)=>{
        if(err){
            return null;
        }else{
            for(const pro of docs.cart) {
             count = parseFloat(pro.price);
             total=total+count;
            }    
        }

    })
     return total;
}
const totalPrice=  (req,res)=>{
     const id=req.params.ID;
     var total=0;
     var count=Number;
     const user = User.findById(id).populate('cart').exec((err, docs)=>{
         if(err){
            return res.json({status: 404})
         }else{
             for(const pro of docs.cart) {
              count = parseFloat(pro.price);
              total=total+count;
             }  
             return res.json({status:200, sum:total})  
         }
 
     })
 }



const getUser= (req,res)=>{
    const id= req.params.id;
   const user= User.findById(id).populate('cart').populate('childs').exec((err, docs)=>{
       if(err){
           return res.json({status: 404})
       }else{
          return res.json({status:200, user:docs})
       }
   })
}

const Pay= async(req,res)=>{
    const id= req.params.id;
    var cart=[Object];
    const user= await User.findById(id).populate('cart');  
    const email=user.email;
    cart=user.cart;
    const sum= await total(user.id);

    // var transform = {"tag":"table", "children":[
    //     {"tag":"tbody","children":[
    //         {"tag":"tr","children":[
    //             {"tag":"td","html":"${name}"},
    //             {"tag":"td","html":"${age}"}
    //         ]}
    //     ]}
    // ]};

    // $('#target_div').html(cart.transform(data,transform));



    let emailText= 
		'<h1>שלום,</h1>'+user.name+'<br>'+
        '<h3> סה"כ לתשלום </h3>' +sum
		;
     // console.log(d);
    // let mailTransporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'summercampWeb123@gmail.com',
    //         pass: 'S.123456789'
    //     }
    // });

    // let mailDetails = {
    //     from: 'summercampWeb123@gmail.com',
    //     to: user.mail,
    //     subject: 'קייטנת עושים גלים- קבלה',
    //     html:d
    // };
    // mailTransporter.sendMail(mailDetails, function(err, data) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log('Email sent successfully');
    //     }
    // });
    // const userTemp= User.findByIdAndUpdate(id,{
    //     $unset: {
    //         cart: 1
    //     }
    // },false).then(()=> res.json({status:200}))
    // .catch((e)=>{
    //     res.json({status:400})
    // })
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProd,
    updateProduct,
    addToCart,
    total,
    getUser,
    RemoveFromCart,
    Pay,
    totalPrice
}