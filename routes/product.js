const router= require("express").Router();
const Product = require("../model/product");
const Category = require("../model/category");

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const product = await Product.find({id:id});
          res.render("product",{product:product});
  });
  
module.exports = router;