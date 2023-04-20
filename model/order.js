const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
{ 
  items: [{
  title:{
     type:String,
    
        },
  
    total:{
        type: Number,  
    },
  },
],
    totalCost: {
            type: Number,
          
          },
     cartId: {
          type: String,
          ref: "Cart",
          required: false,
        },
     userId:{
      type:String,
     }
 },

);

module.exports = mongoose.model("order",orderSchema);