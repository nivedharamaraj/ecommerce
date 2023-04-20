const router= require("express").Router();
const cartschema = require('../model/cart');
const User = require('../model/user');
const Product = require('../model/product');


// router.get("/", async(req,res)=>{
//     res.render('cart');
    
// });
function isProductInCart(cart,id){
    for(let i=0;i<cart.length;i++){
      if(cart[i].id == id){
        return true;
      }
    }
    return false;
  };
  
  function calculateTotal(cart,req){
    total =0;
    for(let i=0; i<cart.length; i++){
      if(cart[i].price){
        total = total + (cart[i].price*cart[i].qty)
      }
    }
    req.session.total = total;
    return total;
  }
  
  router.post('/add_to_cart',async function(req,res){
    
    var id =req.body.id;
    var title=req.body.title;
    var qty=req.body.qty;
    var price=req.body.price;
    var image= req.body.image;
    var user = req.session.user;
    var product ={id:id,title:title,image:image,qty:qty,price:price,user:user};
     console.log('dfghg',product);
     req.session.cart=product;
    //  console.log('session',req.session.cart)
     var cart =req.session.cart;
    //  const newCart = new Array();
    
    //  newCart.push(product)
    //  console.log('new',newCart)
    // console.log("cccccc",cart);
  const vv = await cartschema.create({
       productId:req.body.id,
      title:req.body.title,
      qty:req.body.qty,
      price:req.body.price,
      image:req.body.image,
      userId:req.session.user, 
  });
 console.log("database:-",vv);

  if(isProductInCart(cart,id)){
    cart.push(product);
    console.log(product);
  }else{
  req.session.cart= [product];
  var cart = req.session.cart;
}

calculateTotal(cart,req);

res.redirect('/cart');
});
  
  router.get('/',function(req,res){
   var cart = req.session.cart;
   var total = req.session.total;
   res.render('cart',{cart:cart,total:total});  
   //console.log('ctctctfft',req.session.total);
 });
 
    

  router.post('/remove_product',function(req,res){
  
    var id = req.body.id;
    var cart= req.body.cart;
  
    for(let i=0; i<cart.length; i++){
      if(cart[i].id == id){
        cart.splice(cart.indexOf(i),1);
      }
    }
  
    calculateTotal(cart,req);
    res.redirect('/cart')
  });
  router.post('/cart-product-qty',function(req,res){
  
    var id= req.body.id;
    var qty = req.body.qty;
    var max= req.body.max;
    var min= req.body.min;
  
    var cart = req.session.cart;
  
    if(max){
      for(let i=0; i<cart.lenght;i++){
        if(cart[i].id == id){
          if(card[i].qty > 0){
            cart[i].qty = parseInt(cart[i].qty)+1;
          }
        }
      }
    };
    if(min){
      for(let i=0; i<cart.lenght;i++){
        if(cart[i].id == id){
          if(card[i].qty > 1){
            cart[i].qty = parseInt(cart[i].qty)-1;
          }
        }
      }
    };
  
    calculateTotal(cart,req);
    res.redirect('/cart') 
  });
// router.post("/add_to_cart",async (req,res)=>{

//   var use = req.session.user;
//  const details =await cartschema.create({
     
//       title:req.body.title,
//       qty:req.body.qty,
//       price:req.body.price,
//       image:req.body.image,
//       user:use
//  });
//  console.log(details);
//   res.redirect('/cart');
// });


  


module.exports =router;