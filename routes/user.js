const router= require("express").Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');
var User = require("../model/user");
const cartschema = require('../model/cart')


router.get("/",(req,res)=>{
    res.render("login");
});

router.post('/register', async function(req,res){
    
  var email=req.body.email;
  var password=req.body.password;
  let user = await User.findOne({ email:email });
  if (user) {
      return res.status(400).send('That user already exisits!');
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
        if(res.locals.user)
          {res.redirect('/home')};
    
    res.render('login')
});
router.post("/signin", async function(req, res){
  var email=req.body.email;
  var password=req.body.password;
  try {
      const user = await User.findOne({ email: email });
        if (user || bcrypt.compareSync(password, user.password)){
          req.session.user = user.id;
         // console.log(req.session.user);
          req.session.isLoggedIn = true;
          res.redirect("/home");
        } else {
          res.status(400).json({ error: "password doesn't match or User doesn't exist" });
        }
        
    } catch (error) {
      res.status(400).json({ error });
    }
    
});


module.exports = router;
