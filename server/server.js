const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//================================
//       Models
//================================

const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');


//================================
//       Middlewares
//================================


const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');



//================================
//       PRODUCTS
//================================


//================================
//       Insert article
//================================
app.post('/api/product/article',auth,admin,(req,res)=>{

   const  product = new Product(req.body);

   product.save((err,doc)=>{
     if(err) return res.json({success:false,err});
     res.status(200).json({
       success: true,
       article: doc
     })
   })
})

//================================
//       Get articles by ID
//================================

app.get('/api/product/articles_by_id',(req,res)=>{

  let type = req.query.type;
  let items = req.query.id;

  if(type === "array"){
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map((item)=>{
      return mongoose.Types.ObjectId(item)
    })
  }

  Product.find({'_id':{$in:items}})
         .populate('brand')
         .populate('wood')
         .exec((err,docs)=>{
           return res.status(200).send(docs)
         })
});




//================================
//       WOODS
//================================


//================================
//      Insert wood
//================================
app.post('/api/product/wood',auth,admin,(req,res)=>{

      const wood = new Wood(req.body);

      wood.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({
          success:true,
          wood: doc
        })
      })
});

//================================
//      Get woods
//================================
app.get('/api/product/woods', (req,res)=>{
  Wood.find({},(err,woods)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(woods)
  })
})



//================================
//       BRAND
//================================

//================================
//      Insert brand
//================================

app.post('/api/product/brand',auth,admin,(req,res)=>{
      const brand = new Brand(req.body);

      brand.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
          success:true,
          brand: doc
        })
      })
})


//================================
//      Get brands
//================================
app.get('/api/product/brands',(req,res)=>{
  Brand.find({},(err,brands)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(brands)
  })
})


//================================
//       USERS
//================================


//================================
//       Get users auth
//================================
app.get('/api/users/auth', auth,(req,res)=>{
    res.status(200).json({
      isAdmin:req.user.role === 0? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history,
    })
})

//================================
//       user register
//================================

app.post('/api/users/register',(req,res)=>{
       //res.status(200);
        const user = new User(req.body);

       user.save((err,doc)=>{

         if(err) return res.json({
           success:false,
           err
         });
         res.status(200).json({
           success: true,
         })
       })
});

//================================
//       user login
//================================

app.post('/api/users/login',(req,res)=>{
  //find the email
  User.findOne({'email':req.body.email},(err,user)=>{
     if(!user) return res.json({loginSuccess:false, message: 'Auth failed, email not found'});
     //check the password
     user.comparePassword(req.body.password,(err,isMatch)=>{
        if(!isMatch) return res.json({loginSuccess:false, message:'Wrong password'});
        // if email/password correct => generate token
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            res.cookie('w_auth',user.token).status(200).json({
              loginSuccess:true
            });
        })
     })
  })
})

//================================
//       user logout
//================================

app.get('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate(
    {_id:req.user._id},
    {token: ''},
    (err,doc)=>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success: true
      })
    }
  )
})



//================================
//       server connection
//================================

const port = process.env.PORT || 3002;

app.listen(port,() =>{
  console.log(`Server running at ${port}`);
})
