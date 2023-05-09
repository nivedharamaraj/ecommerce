const router= require("express").Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');
var User = require("../model/user");
const cartschema = require('../model/cart')


router.get("/",(req,res)=>{
    res.render("login",{message:req.flash('message')});
});

router.post('/register', async function(req,res){
    
  var email=req.body.email;
  var password=req.body.password;
  let user = await User.findOne({ email:email });
  if (user) {
    req.flash('message','That user already exisits!');
      
  } else{
  const newUser = new User({
      
      email: req.body.email,
      password: bcrypt.hashSync(password, 10)
  });
  await newUser.save();
  }
  res.redirect('/')
});

  router.get('/signin', async function(req,res){
          res.render("login",{message:req.flash('message')});
});
router.post("/signin", async function(req, res){
  var email=req.body.email;
  var password=req.body.password;

      const user = await User.findOne({ email: email });
      console.log("user",user)
        if (user ){
          req.session.user = user.id;
          console.log(req.session.user);
          req.session.isLoggedIn = true;
          res.redirect("/home");
        }
        // else if(err){
        //   console.log(err)
        // }
         else {
          req.flash('message',"password doesn't match or User doesn't exist");
          
           res.redirect("/");
        }
        //  res.redirect("/");
       
});


module.exports = router;
