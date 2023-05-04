const express = require('express')
const router = express.Router()
const user = require('../models/userschema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const dotenv = require('dotenv')


dotenv.config({path:'./config.env'})

//createuser
router.post('/createuser', async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log(username , email, password);
        if (!username || !email || !password) {
            return res.json({ message: 'plz fill the fields properly' })
        }
        else {
            const finduser = await user.findOne({ email: email })
            if (finduser) {
                return res.json({ message: 'user already exits' })
            }
            else {
                const hashpassword = await bcrypt.hash(password, 10)
                const newuser = new user({ username: username, email: email, password: hashpassword })
                const saveuser = await newuser.save()
                if (saveuser) {
                    return res.json({ message: 'user saved' })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email,password);
        if (!email || !password) {
            return res.json({ message: 'plz fill the fields properly' })
        }
        else {
            const finduser = await user.findOne({ email: email })
            console.log(finduser);
            if (finduser) {
                const checkpassword = await bcrypt.compare(password, finduser.password)
                console.log(checkpassword);
                if (checkpassword) {
                     const token = jwt.sign({_id:finduser._id} , process.env.SECRET)
                     return res.json({message:"logged in successful" , token:token})
                }
                else {
                    return res.json({ message: 'invalid credentials' })
                }
            }
            else {
                return res.json({ message: 'invalid credentials' })
            }
        }
    } catch (error) {
        console.log(error);
    }
})
//get user
router.get('/getuser' , fetchuser, async(req,res)=>{
    try {
        return res.json(userdetail)
    } catch (error) {
        console.log(error);
    }
})
//updateemail
router.patch('/updatepassword/:id' , async(req,res)=>{
   try {
     const id = req.params.id
     console.log(id , req.body);
     const{oldpassword,newpassword}=req.body
     const updateuser = await user.findById({_id:id})
     if(updateuser){
        console.log(updateuser);
        const checkpass = await bcrypt.compare(oldpassword , updateuser.password)
        console.log(checkpass);
        if(checkpass){
           const hash = await bcrypt.hash(newpassword , 10)
           const password = hash
           const updatepassword = await user.findByIdAndUpdate({_id:id} , {
            password:password
           })
           console.log(updatepassword);
           if(updatepassword){
            return res.json({message:"Password updated successfully"})
           }
        }
        else{
            return res.json({message:'Old password does not match'})
        }
     }
   } catch (error) {
     console.log(error);
   }
})
router.patch('/updatepassword/:id' , async(req,res)=>{
    try {
      const id = req.params.id
      const hashpassword = await bcrypt.hash(req.body.password , 10)
      const updateuser = await user.findByIdAndUpdate({_id:id} , {
        password:hashpassword
      })
      return res.json(updateuser)
    } catch (error) {
      console.log(error);
    }
 })

//delete account

module.exports=router