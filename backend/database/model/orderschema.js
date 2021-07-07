import mongoose from 'mongoose'

const Orderschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            Quantity:{
                type:Number,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            return:{
                type:Boolean,
                default:false
            }
        }
    ],

    Shippingaddres:{
        address:{
         type:String,
         required:true
        },
        city:{
            type:String,
            required:true
        },
        postalcode:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    paymentmethod:{
        type:String,
        required:true
    },
    paymentresult:{
        id:{
            type:String,
            
        },
        price:{
            type:String,
            
        },
        updated_time:{
            type:String,
           
        },
        Email_address:{
            type:String
        }
        
    },
    taxprice:{
        type:String,
        required:true
    },
    
    shippingprice:{
        type:String,
        required:true
    },
    Totalprice:{
        type:String,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAT:{
        type:Date,
        
    },
    isdeliverd:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAT:{
        type:Date,
        
    },


},{
    timestamps:true
})

const Order=mongoose.model('Order',Orderschema)

export default Order;