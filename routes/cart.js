const router= require("express").Router();
const Cart = require('../model/cart');
const User = require('../model/user');
const Product = require('../model/product');
const cart = require("../model/cart");



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
  var productId = req.body.id.split(" ").join("");
 
  // console.log("<<<>>>",productId);
  var qty= req.body.qty;
 try{
    var cartuser = await Cart.findOne({ userId: user });
// console.log(cartuser);
 if (cartuser == null) {
     const vv = await Cart.create({
        userId:req.session.user,
    items : [{
      productId: req.body.id.split(" ").join(""),
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
    //  console.log("gggggg>>>>",itemIndex);
   if (itemIndex > -1) {
    cartuser.items[itemIndex].qty++;
    cartuser.items[itemIndex].price ; 
    cartuser.items[itemIndex].total = cartuser.items[itemIndex].qty * prices ; 
    cartuser.totalQty++;
    cartuser.totalCost = cartuser.items.map(item => item.total).reduce((acc, next) => acc + next);
   
  } else {
    cartuser.items.push({
          productId:req.body.id.split(" ").join(""),
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
  
router.post('/qty',async(req,res,err)=>{
  if(err)
console.log("err",err)
  var qty = req.body.quantity_new;
  var productId =req.body.productId;
  var price = req.body.idd;
  
  var user=req.session.user;
  var total = req.body.totalPrice;
  console.log("productId",productId);
  console.log("price",price);
  console.log("qty",qty);
  console.log("total",total);
// const perChunk = 1   
// const inputArray =productId
// const result = inputArray.reduce((resultArray, item, index) => { 
//   const chunkIndex = Math.floor(index/perChunk)
//   if(!resultArray[chunkIndex]) {
//     resultArray[chunkIndex] = [] 
//   }
//   resultArray[chunkIndex].push(item)
//   return resultArray
// }, [])
// console.log("result",result);
var result1 = productId.toString();
  console.log('result1',result1);
  console.log("result1length",result1.length)
  
   var cartuser = await Cart.findOne({ userId: user })
for(var i=0;i<result1.length;i++){

     var pid = result1[i]
     console.log("pid",pid)
    }  
      var cartuser = await Cart.findOne({ userId: user })
        console.log('title',cartuser.items);
    
     var itemIndex = cartuser.items.find(p=>p.productId === pid);
     console.log("gggggg",itemIndex);
      cartuser.items.productId = pid,
// const productId=req.params.id;
// console.log("productId",productId)
// var user=req.session.user;
// var cartuser = await Cart.findOne({ userId: user })
//         console.log('title',cartuser.items);
    
//      var itemIndex = cartuser.items.findIndex(p=>p.productId ===productId);
//      console.log("gggggg",itemIndex);



res.redirect('/cart');
 });
//  router.post("/removeitems/:id", async (req,res)=>{
//   var user=req.session.user;
//   var productId = req.params.id;
//  // console.log(productId);
//   const cartuser = await Cart.findOne({  userId: user});
//  var itemIndex = cartuser.items.find(({productId})=>productId === productId);
//   console.log("yyyyyyyyyyy",itemIndex);
//   await Cart.deleteOne(itemIndex);
//   res.redirect('/cart');
//  })
module.exports = router;
