import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const Userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:true,
        minlength:6
    },
    resetpasswordtoken:String,
   
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

Userschema.methods.matchpassword= async (enteredpassword,userpassword)=>{
 try{
    
  const passwordmatch=await bcrypt.compare(enteredpassword,userpassword)
  console.log(passwordmatch)
  if(passwordmatch&&passwordmatch===true){
      return true;
  }else{
      return false
  }
 }catch(e){
     console.log(e)
 }
    
}

Userschema.methods.generateToken=(id)=>{
    try{
        console.log("token")
        const token=  jwt.sign({id},"userpasangala")
        return token
    }catch(e){
        console.log(e)
    }
   
}
Userschema.methods.makepassword=async (enteredpassword)=>{
    
    const salt=await bcrypt.genSalt(10)
    return await bcrypt.hashSync(enteredpassword,salt)
   
}

Userschema.methods.getresetpasswordtoken=async(user)=>{
    try{
        const resettoken=crypto.randomBytes(20).toString("hex")

        user.resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex")
        console.log("token :"+resettoken)
        return String(resettoken);
    }catch(e){
        console.log(e)
       
    }
    
}
const User=mongoose.model('User',Userschema)

export default User