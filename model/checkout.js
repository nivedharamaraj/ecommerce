const mongoose = require('mongoose');
const CheckoutSchema = new mongoose.Schema(
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
         userId: {
              type: String,
            
            },
    firstName:{
     type:String,
    
        },
LastName:{
     type:String,
    
       },
 CompanyName:{
        type:String,
      },
Country:{
    type:String,
    
},
Streetaddress:{
    type:String,
    
},
TownOrCity:{
    type:String,
   
},
StateOrCounty:{
    type:String,
   
},
PostcodeOrZip:{
    type:String,
   
},
Phone:{
    type:String,
   
},
Emailaddress:{
        type: String,
        
    },
Ordernotes:{
        type: String, 
    }   
   
 },

);

module.exports = mongoose.model("checkout",CheckoutSchema);