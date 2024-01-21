 //1. Import express
 const express = require('express')

 //2. Import cors
 const cors = require('cors')

 //3. import logics
const logic = require('./Services/logics')

 //3. Create an application using express
 const contactServer = express() //it creates an express application

 //4. Using cors to connect frontend port 
 contactServer.use(cors({
    origin:'http://localhost:3000'  //remove the slash( / ) at the end
 }))

 //5. Create a middleware for parsing json data
 contactServer.use(express.json())  //to convert json to js

 //6. Define a port number
 contactServer.listen(8000,()=>{
    console.log("contactserver listening on the port 8000");
 })

 //API call for get all employee details localhost://8000/get-all-employees
 contactServer.get('/get-all-contacts',(req,res)=>{
         //logic function getAllEmployee()
         logic.getAllContacts().then((response)=>{
            res.status(response.statusCode).json(response)
         })
 })

 //API call for get add employee details  localhost://8000/add-employees
 contactServer.post('/add-contact',(req,res)=>{
   logic.addContact( 
      req.body.id,
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.body.phone,
      req.body.city,
      req.body.street).then((response)=>{
      res.status(response.statusCode).json(response)
   })
 })

 //API call for Delete an employee localhost://8000/delete-employee
 contactServer.delete('/delete-contact/:id',(req,res)=>{
   logic.deleteContact(req.params.id).then((response)=>{
      res.status(response.statusCode).json(response)
   })
 })

 //API call for view an employee localhost://8000/view-employee
 contactServer.get('/view-contact/:id',(req,res)=>{
   logic.viewContact(req.params.id).then((response)=>{
      res.status(response.statusCode).json(response)
   })
 })
 
  //API call for  Edit employee details  localhost://8000/update-employee
  contactServer.post('/update-contact/:id',(req,res)=>{
   const {id}=req.params
   logic.updateContact( 
      id,
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.body.phone,
      req.body.city,
      req.body.street).then((response)=>{
      res.status(response.statusCode).json(response)
   })
 })