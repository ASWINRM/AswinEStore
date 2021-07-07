import bcrypt from 'bcryptjs'

const user=[
    {
        name:"Admin_user",
        email:"aswinmac.09@gmail.com",
        password:bcrypt.hashSync('123456',8),
        isAdmin:true
    },
    {
        name:"Aswin",
        email:"aswinmac.09@gmail.com",
        password:bcrypt.hashSync('123456',8),
        isAdmin:true
    },
    {
        name:"Rahul",
        email:"rahulboss.09@gmail.com",
        password:bcrypt.hashSync('123456',8),
        isAdmin:true
    },
]

export default user;