const router= require("express").Router();
const cart = require("../model/cart");
const Cart = require('../model/cart');
const User = require('../model/user');
const Product = require('../model/product');

router.get("/", async(req,res)=>{
     try {
    let cartuser;
    if (req.session.user) {
      cartuser = await Cart.findOne({  userId: req.session.user});
    }
    if (req.session.user && cartuser) {
      req.session.cart = cartuser;
      return res.render("cart", {cart: cartuser});
    }
  
    if (!req.session.cart) {
      return res.render("cart", {cart: null});
    }
    
    return res.render("cart", {cart: req.session.cart});
  } catch (err) {
    console.log(err.message);
    res.redirect("/cart");
  }
});

router.post('/add_to_cart',async function(req,res){
  var user=req.session.user;
  //console.log("gdfhu",user);
  var productId = req.body.id;
  console.log("<<<>>>",productId);
  var qty= req.body.qty;
 try{
    var cartuser = await Cart.findOne({ userId: user });
// console.log(cartuser);
 if (cartuser == null) {
     const vv = await Cart.create({
        userId:req.session.user,
    items : [{
      productId:req.body.id,
      title:req.body.title,
      qty:req.body.qty,
      price:req.body.price,
      total:req.body.price*qty,
      image:req.body.image,
      
     }] ,
     totalQty:1,
     totalCost : req.body.price*qty,   
});
  res.redirect('/cart');
  } else{
  
  var prices= req.body.price;
//  const products = await Cart.findOne({  userId: req.session.user});
  let itemIndex = cartuser.items.findIndex(p => p.productId == productId);
  //  console.log("gggggg",itemIndex);
   if (itemIndex > -1) {
    cartuser.items[itemIndex].qty++;
    cartuser.items[itemIndex].price ; 
    cartuser.items[itemIndex].total = cartuser.items[itemIndex].qty * prices ; 
    cartuser.totalQty++;
    cartuser.totalCost = cartuser.items.map(item => item.total).reduce((acc, next) => acc + next);
   
  } else {
    cartuser.items.push({
          productId:req.body.id,
          title:req.body.title,
          qty:req.body.qty ,
          price:req.body.price,
          total:req.body.price*qty,
          image:req.body.image,
      });
      cartuser.totalQty++,
      cartuser.totalCost = cartuser.items.map(item => item.total).reduce((acc, next) => acc + next);
    
       } 
  
  const cart = await cartuser.save();

        res.redirect('/cart');
      } 
    }  catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
});
  
 router.post("/itemqty",async (req,res)=>{
  var user=req.session.user;
  var productId = req.body.id;
  var min = req.body.min;
  var qty = req.body.quantity;
  console.log("remove",min);
  try{
 
  var cartuser = await Cart.findOne({ userId: user });
   var obj = cartuser.items;
   if (min){
   for(let i=0;i<obj.length;i++){
    if(obj[i].productId==productId){
      
        var ss = obj[i].price*qty;
      
    }
   }
  }
   console.log("<<<<<<<<<<<<<<>",qty); 
  } catch (err) {
    console.log(err.message);
    res.redirect("/cart");
  }
 });
 router.post("/removeitems", async (req,res)=>{
  var user=req.session.user;
  var productId = req.body.id;
  console.log(productId);
  const cart = await Cart.findOne({  userId: user});
 var cartitem = cart.items;
  let itemIndex = cartitem[i].findOne(p => p.id == productId);
  console.log("yyyyyyyyyyy",itemIndex);
  await Cart.findOneAndDelete(itemIndex);
 })
module.exports = router;
