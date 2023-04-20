const express = require("express");
const router= require("express").Router();
var Checkout = require('../model/checkout');
const Cart = require('../model/cart');


router.get('/',async(req,res)=>{
  var user=req.session.user;
  const carts = await Cart.findOne({userId:user});
  //console.log("sgrg",carts);
    res.render('checkout',{cart:carts});
  });
  
  router.post("/",async (req, res) => {
    var user=req.session.user;
    const cart = await Cart.findOne({userId:user});
     const obj = cart.items;
    const checkout =  await Checkout.create({
    items : obj,
     totalCost:cart.totalCost,
     userId:cart.userId,
     firstName: req.body.firstName,
     LastName: req.body.LastName,   
     CompanyName:req.body.CompanyName,
     Country: req.body.Country,
     Streetaddress: req.body.Streetaddress,
     TownOrCity: req.body.TownOrCity,  
     StateOrCountry: req.body.StateOrCountry,  
     PostcodeOrZip: req.body.PostcodeOrZip,
     Phone: req.body.Phone,
     Emailaddress:req.body.Emailaddress,
     Ordernotes:req.body.Ordernotes

  });
      
 // console.log(checkout);
res.redirect('/checkout');


});
  module.exports = router;

