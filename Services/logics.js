// import db.js
const db = require('../Services/db')


//logic for get all employees from the database
const getAllContacts=()=>{
    return db.contact.find().then(
        (result)=>{ // all employees details
            if(result){ 
                return{ //send to frontend
                    statusCode:200,
                    contacts_det:result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'Employees not found'
                }
            }
        }
    )
}

//logics for add an employee to the database
const addContact=(id,fname,lname,email,phone,city,street)=>{
    return db.contact.findOne({id}).then((result)=>{
            if(result){
                return{
                    statusCode:404,
                    message:"Contact already exist"
                }
            }
            else{
                //if id is not present in the db, save all the data in the db
                const newContact = new db.contact({ id, name: { firstname: fname, lastname: lname }, email, phone, address: { city, street } });
                newContact.save()
                return{
                    statusCode:200,
                    message:"Contact added successfully..."
                }

            }
        })
    
}

//Logic for deleting an employee from the database
const deleteContact=(id)=>{
    return db.contact.deleteOne({id}).then((result)=>{
        
        return{
            statusCode:200,
            message:"Contact Deleted successfully"
        }  
    })
    .catch((error)=>{
        return{
            statusCode:404,
            message:"Can't delete employee"
        }
    })
}

//Logic for view employee
const viewContact=(id)=>{
    return db.contact.findOne({id}).then((response)=>{
        return{
            statusCode:200,
            contact_det:response
        }
    })
    .catch((error)=>{
        return{
            statusCode:404,
            message:"contacts Not Found"
        }
    })

  
}

//Logics for update employee
const updateContact=(id,fname,lname,email,phone,city,street)=>{
    return db.contact.findOne({id}).then((result)=>{
        if (result){
            //assign updated employee details to the mongoDB object
            result.id=id;
            result.name.firstname=fname;
            result.name.lastname=lname;
            result.email=email;
            result.phone=phone;
            result.address.city=city;
            result.address.street=street;

            //to save the details
            result.save();
            
        return{
            statusCode:200,
            message:'Contact details Updated'
        }
    }
    else{
        return{
            statusCode:404,
            message:'Contact not found'
        }
    }
    }
    )
}

module.exports={
    getAllContacts,
    addContact,
    deleteContact,
    viewContact,
    updateContact
}