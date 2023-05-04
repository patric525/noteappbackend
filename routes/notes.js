const express = require('express')
const router = express.Router()
const note = require('../models/noteschema')
const user = require('../models/userschema')

//create note
router.post('/createnote' , async(req,res)=>{
    try {
        console.log(req.body);
        const{email,title,description,color,back}=req.body
        const newnote = new note({email:email,title:title,description:description,color:color,back:back})
        const savenote = await newnote.save()
        if(savenote){
            return res.json({message:'Note created successfully'})
        }
    } catch (error) {
        console.log(error);
    }
})
//fetch notes
router.post('/fetchnotes' , async(req,res)=>{
    try {
        const{email}=req.body
        const fetchnote = await note.find({email:email})
        return res.json(fetchnote)
    } catch (error) {
        console.log(error);
    }
})
//updatenote
router.patch('/updatenote/:id' , async(req,res)=>{
    try {
       const id =req.params.id
        const updatenote = await note.findByIdAndUpdate({_id:id} , req.body)
        if(updatenote){
            return res.json({message:"Note updated successfully"})
        }
    } catch (error) {
        console.log(error);
    }
})
//deletenote
router.delete('/deletenote/:id' , async(req,res)=>{
    try {
        const id = req.params.id
        const deletenote = await note.findByIdAndDelete({_id:id})
        if(deletenote){
            return res.json({message:'Note deleted successfully'})
        }
    } catch (error) {
        console.log(error);
    }
})
//deletenotesbyemail

module.exports=router