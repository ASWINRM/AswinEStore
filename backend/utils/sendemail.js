import nodemailer from 'nodemailer'

 const sendemail=async (options)=>{
    console.log("sendemail"+"  "+options.to)
    
    const transporter=nodemailer.createTransport({
         host:"smtp.gmail.com",
        // port:"2525",
        // host: "https://simpleshopping-cart.netlify.app/",
       
        // secure: false,
         service:"gmail",
         port: 587,
        auth:{
            user:"aswinestore@gmail.com",
            pass:"umjx kbwz kzsn oldj"
        },
        
       
    })
    try{
        await transporter.sendMail({
            from:"aswinestore@gmail.com",
            to:options.to,
            subject:options.subject,
            html:options.message
        },function(error,res){
         if(error){
             console.log(error)
         }
        })

        
    }catch(e){
       console.log(e)
    }
   
}
export default sendemail