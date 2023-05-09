require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs   = require("ejs");
var flash=require('connect-flash');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var session =require('express-session');
var MongoStore = require("connect-mongo");
var passport=require('passport');
const paypal = require('paypal-rest-sdk');

const connectDB = require("./config/db");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARnYlL91ZKPxxOiAYDtVi6n-IY2_RtEVPrW4dip1UoDdPYtLx5YRuX7IHinvzd-nk9-S6Uz5rc5MU8Gi',
  'client_secret': 'EEKXYSdQk5doTS9t6V3jNR8Tc2RNF768aY2KlpQWFTiifDDVch0JVphpKp2sRt-T1wZ_RJ9zrvm0EYH8'
});

const app  = express();

app.use(express.static(path.join(__dirname, 'views')));
app.set("views", path.join(__dirname, "views"));
app.set ("view engine","ejs")

app.use(express.static(path.join(__dirname, 'public')));
app.set("public", path.join(__dirname, "public"));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store:MongoStore.create({ mongoUrl:'mongodb://127.0.0.1:27017/New-Ecommerce'}),
      //session expires after 3 hours
      cookie: { maxAge: 60 * 1000 * 60 * 3 },
    })
  );
 
  //express messages 
  app.use(flash());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

//passport config
require('./config/passport')(passport);
// passport 
app.use(passport.initialize());
app.use(passport.session());


app.get('*',async function(req,res,next){
    res.locals.cart=req.session.cart;
    res.locals.user=req.session.user||null;
    res.locals.total=req.session.total;
     //console.log(res.locals.total);
    next();
})


//routes config
const indexRouter = require("./routes/user");
const homeRouter = require("./routes/pages/home");
const aboutRouter = require("./routes/pages/about");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const checkRouter = require("./routes/checkout");
const exampleRouter = require("./routes/pay");
app.use('/pay',exampleRouter);
//  app.use('/cancel',exampleRouter);
//  app.use('/success',exampleRouter);
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/about", aboutRouter);
app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/checkout", checkRouter);



app.listen(4000);
console.log("Running at Port 4000");