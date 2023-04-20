const router= require("express").Router();
const Product = require("../model/product");
const Category = require("../model/category");

 router.get("/",async(req,res)=>{
   const product = await Product.find();
    res.render("products",{product:product});
 });

 router.get("/:id",async (req,res)=>{
  const category = req.params.id;
  const product = await Product.find({category:category});
  res.render("category",{product:product});
 });
//  router.get('/:category',async function(req,res){

//     var categorySlug= req.params.category;
//     console.log(categorySlug)
// await   Category.findOne({slug :categorySlug},function(err,c){
// Product.find({category:categorySlug},function(err,products){
//     if(err){
//         console.log("error in router.get('/:category) in products.js "+err);
//     }
//         res.render('cat',{
//             title:c.title,
//             product:products
//         });
    
//     });
// });
// })
//    await Product.find(({category:category})),function(err,data){
//     if (!err){
//         console.log(cat);
//         res.render("cat", {
//                            categories: data
//                       });
                    
//                   } else {
//                       console.log('Failed to retrieve the Course List: ' + err);
//                   }
    
//    }
//  });   
// });
module.exports = router;
