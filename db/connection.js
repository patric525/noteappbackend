const mongoose = require('mongoose')

const connect  = async()=>{
     try {
        const connection = await mongoose.connect('mongodb+srv://anuj729094:mongopro@cluster0.fepevnn.mongodb.net/noteapp?retryWrites=true&w=majority')
        if(connection){
         console.log('connected');
        }
     } catch (error) {
      console.log(error);
     }
}

connect()