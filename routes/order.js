const express = require("express");
const router= require("express").Router();
var Order = require('../model/order');

// router.get('/',async function(req,res){
//   var Order = req.session.cart;
//   var total = req.session.total;
//     res.render('order',{Order,total});
    
//       var use = req.session.cart;
//     const orderdb = await order.create({
//      title :use[0].title,
//      price : use[0].price,
//      user : use[0].user._id,
// });
//     console.log(orderdb);
//  });
router. post('/',async (req,res)=>{
  var user =req.session.user;
  const orderuser = await Order .findOne({userid:user});
  if (orderuser == null){
    const orderdata= await Order.create({
      items : [{
      title:req.body.title,
      total:req.body.total
    }] ,
      totalCost:req.body.totalCost,
      cartId:req.body.id,
      userId:req.body.userId
    });
    res.send('okkkk')
    console.log(orderdata);
  }

});
  module.exports = router;  