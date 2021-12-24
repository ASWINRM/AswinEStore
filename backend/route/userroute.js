import express from 'express'
const router=express.Router()
import asynchandler from 'express-async-handler'
import User from '../database/model/Userschema.js'
import {authe,admin} from '../middleware/authe.js'
import cors from 'cors'
import sendemail from '../utils/sendemail.js'
import crypto from 'crypto'




router.post('/login',asynchandler(async (req,res)=>{
    const {email,password}=req.body
 if(!email || !password){
          res.status(401).send("provide both email and password")
        }
        console.log("userlogin")
        console.log(email)
        console.log(password)
        const user=await User.findOne({email})
        if(!user){
            res.status(404)
            throw new Error('No user Found with this Email Id please Sign up')
            
        }
         const token= user.generateToken(user._id)
        if(user && await user.matchpassword(password,user.password)){
            
            res.status(200).send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token

            })
        }else{
           res.status(401)
           throw new Error("Invalid username or password ")
        }
    
    
}))

router.get("/profile",authe,asynchandler(async(req,res)=>{
        try{
            console.log("USER DETAIL IN BACKEND")
            if(req.user){
                console.log("USER DETAIL SENT")
                res.status(200).send({
                _id:req.user._id,
                name:req.user.name,
                email:req.user.email,
                isAdmin:req.user.isAdmin,
                token:req.user.token
                })
            }
        }catch(e){
            res.send(e)
        }
}))

router.put("/profile",authe,asynchandler(async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
         console.log("USER UPDATION IN BACKED")
        
        if(req.body.user && user){

            if(user.password.substr(0,8)==="56897321"){
                res.status(401).send("You're signe in with Google Account so you can't update youre profile")
            }else{
                user.name=req.body.user.name||user.name
                user.email=req.body.user.Email||user.email
             
                if(req.body.user.Password){
                    console.log("makepassword")
                 user.password=await user.makepassword(req.body.user.Password)
                }else{
                 user.password=user.password
                }
                
                
                
                const updateduser=await user.save()
     
                if(updateduser){
                 console.log("USER UPDATED IN BACKED")
                 res.status(200).send({
                     _id:updateduser._id,
                     name:updateduser.name,
                     email:updateduser.email,
                     isAdmin:updateduser.isAdmin,
                     token:updateduser.token
                     })
                }
            }
         
        }
       
    }catch(e){
        res.send(e)
    }
}))

router.post('/signup/admin',asynchandler(async(req,res)=>{
    const {name,email,password,tokenId,isAdmin}=req.body

    const user=await  User.create({
        name,
        email,
        password,
        isAdmin
    })
    try{
        const updatedpassword= await User.updateOne({name:name},{ $set :{password:await user.makepassword(password)}} );
        console.log("update")
        res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:user.generateToken(user._id)
          })
    }catch(e){
        console.log(e)
    }
    
}))

router.post('/signup',asynchandler(async(req,res)=>{
    try{
        var {name,email,password,tokenId}=req.body

        
        const exisitinguser=await User.findOne({name})
        if(exisitinguser){
            console.log("exisitinguser")
            res.status(401).send("This User is already found, please login!")
            throw  Error("This User is already found, please login!")
            
            
        }else{
            console.log("signupElse")
            console.log(name +" ,"+email+" ,"+password)
            if(name!==""&&email!=="" &&password!==""){
                const user=await  User.create({
                    name,
                    email,
                    password
                })
                try{
                    const updatedpassword= await User.updateOne({name:name},{ $set :{password:await user.makepassword(password)}} );
                    console.log("update")
                    res.send({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        isAdmin:user.isAdmin,
                        token:user.generateToken(user._id)
                      })
                }catch(e){
                    console.log(e)
                }
                
            }else{
                if(name!="" && email!=""){

                    console.log("GOOGLE SIGN UP")
                    console.log(name +" ,"+email)
                    password="56897321"+tokenId
                    const user=await User.create({
                        name,
                        email,
                        password
                    })
                    if(user){
                        res.send({
                            _id:user._id,
                            name:user.name,
                            email:user.email,
                            isAdmin:user.isAdmin,
                            token:user.generateToken(user._id)
                          })
                    }  
                }    
            }   
        }
    }catch(e){
        console.log(e)
        res.status(401).send(e)
    }
}))

router.post('/forgotpassword',async(req,res)=>{
    const {email}=req.body
    try{
        const user=await User.findOne({email})
    // if(!user){
    //     res.status(404).send("There is no user found with this email Id")
    // }
    if(user ){
        console.log(user.password.substr(0,7))
        if(user.password.substr(0,8)==="56897321"){
            res.status(401).send("You're signed up using your Google Accout so please Logins with your Google Account")
        }else{
            
     const otpcode=Math.floor(1000+Math.random()*9000)
    
    
   
     const message=`<h1>you has been requeseted a reset password</h1>,
                     <p> Copy the below code to verify it's you</p>
                     <h1>${otpcode}</h1>
                     `
     
      
      try{
        sendemail({
            to:email,
            subject:"requested to reset a password",
            message:message
        })
        res.status(200).send({success:"The email has sent successfully",otp:otpcode})
      }catch(e){
         res.status(401).send("email could'nt send")
      }
        }
    }else{
       res.status(401).send("No user found with this Email id") 
    }
    
    }catch(e){
       res.send(e)
    }
   

})



router.post('/verified',async(req,res)=>{

    const {sentOTP,EnteredOTP}=req.body
    console.log(req.body)
         console.log(sentOTP+"   "+EnteredOTP)
    if(sentOTP && EnteredOTP){
        if(sentOTP===EnteredOTP){
            res.status(200).send({success:true})
        }else{
            res.status(401).send("You have entered a wrong OTP")
        }
    }
        
       
    
   
})

router.post('/passwordMatch',async(req,res)=>{

    const email=req.body.email
    const password=req.body.password
if(email && password){
    console.log("In password match EMAIL  FOUND")
}
    console.log(email)
    console.log(password)
    const user=await User.findOne({email:email})
    console.log("Entered password checking in backend")
    if(user){
        console.log("Entered password match in backend")
       const match= user.matchpassword(password,user.password)
       
       match.then((e)=>(e===true)?
       res.status(200).send("true"):
       res.status(401).send("Current password is not correct")
       )
       
       
    }
})

router.post("/googlelogin",async(req,res)=>{
    console.log("GOOGLE LOGIN ENTERED")
    const {tokenId,email,name}=req.body
     const checkpassword="56897321"+tokenId
    //  console.log(checkpassword)
    const user=await User.findOne({email:email})
  if(user){
      console.log(" GOOGLE USER FOUND")
    
        console.log("GOOGLE PASSWORD MATCH")
       res.status(200).send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:user.generateToken(user._id)
       })
    
  }else{
      console.log("GOOGLE PASSWORD MISMATCH")
      res.status(401).send("No user found with this google account")
  }
    

})

export const resetpassword=router.post('/resetpassword',async(req,res)=>{
    const {email,password}=req.body

    try{
        const user =await User.findOne({email:email})

        if(user && password){
            user.password=await user.makepassword(password)
            await user.save()
            if(user.matchpassword(password,user.password)){
                const token=user.generateToken(user._id)
                res.status(200).send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token
                })
            }
        }else{
            res.status(401).send("Password cannot be reseted")
        }
    }catch(e){
        res.status(401).send("Check wheter the Password is about length of 6")
    }
    


})

router.get('/admin/userlist',authe,admin,asynchandler(async(req,res)=>{

    const users=await User.find({})

    if(users){
        res.status(200).send(users)
    }
}))

router.post('/admin/delete',authe,admin,asynchandler(async(req,res)=>{
    
    try{
        const {id}=req.body
        console.log(id)
    const users=await User.deleteOne({_id:id})

    if(users){
        res.status(200).send("deleted")
    }
    }catch(e){
        console.log(e)
    }
    
}))



export default router;