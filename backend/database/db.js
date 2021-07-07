import mongoose from 'mongoose'

const connectDB= async()=>{

    try{
      const connect= await  mongoose.connect("mongodb://localhost:27017/Ecommerce-api",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });

        console.log(`mongo db connected to the host ${connect.connection.host}`)

    }catch(e){
        console.log("error occured")
    }
}

export default connectDB;