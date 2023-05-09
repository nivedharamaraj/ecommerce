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
  
 router.post("/itemqty/:id",async (req,res)=>{
  var qty = req.body.quantity_new;
   console.log('qty',qty);
  const id=req.params.id;
   console.log('id',id);
  //  var prices= req.body.price;
  //  console.log('prices',prices);
  var user=req.session.user;
  var cartuser = await Cart.findOne({ userId: user });
  //  console.log('cartuser',cartuser);
  const item = cartuser.items.findIndex(p => p.productId == id);
  console.log('item',item);
  if (item > -1) {
    cartuser.items[item].qty=qty;
    cartuser.items[item].price ; 
    cartuser.items[item].total = cartuser.items[item].qty * cartuser.items[item].price  ; 
    console.log('id1', cartuser.items[item].total);
    cartuser.totalQty++;
    cartuser.totalCost = cartuser.items.map(item => item.total).reduce((acc, next) => acc + next);
  }
  const carts = await cartuser.save();
  res.redirect('/cart');
 });
 router.post("/remove/:id",async (req,res)=>{
  const id=req.params.id;
  console.log('idremove',id);
  var user=req.session.user;
  var cartdetaile = await Cart.findOne({ userId: user });
  const cartindex = cartdetaile.items.findIndex(p => p.productId == id);
  console.log('cartindex',cartindex); 
if (cartdetaile.items[cartindex]>-1) {
   var cartt=await  cartdetaile.items.findByIdAndDelete((productId==id));
}
console.log('cartt',cartt);
const carts = await cartdetaile.save();
  res.redirect('/cart');   
});
// router.get('/remove/:id',async(req,res)=>{
//   const id=req.params.id;
//     console.log('idremove',id);
//     var user=req.session.user;
//     var cartdetaile = await Cart.findOne({ userId: user });
//     // const cartindex = cartdetaile.items.findIndex(p => p.productId == id);
//     // console.log('cartindex',cartindex);
   
//       const cartx = cartdetaile.items.findOneAndDelete(({productId:id}));
//       console.log('cartx ',cartx);
//         res.render("cart", {cart: cartdetaile});
// });
module.exports = router;
