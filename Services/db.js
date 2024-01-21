// Node + mongoDB connection
//1. import mongoose
const mongoose = require('mongoose')

// Connection string
mongoose.connect('mongodb://localhost:27017/Contact_App')

//create a model
const contact = mongoose.model('contacts',{
    id: Number,
    name: {
        firstname: String,
        lastname: String
      },
        email: String,
        phone: String,
    address: {
     
        city: String,
        street: String,
       
      },
      
      
     
   
      
})

module.exports={       // this is to export the collection so we can use the collection everywhere
    contact
}