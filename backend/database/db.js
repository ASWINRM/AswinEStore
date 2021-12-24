import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const connectDB= async()=>{

    try{
      const connect= await  mongoose.connect(process.env.url,{
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