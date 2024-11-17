const express=require("express");
const Router=express.Router();
const Employee=require("../Models/EmployeeSchema");



Router.post("/",(req,res)=>{
     const Data= {HR,Name, email, mobile, image,Job,gender,password } = req.body;
     const NewEmployee=new Employee(Data)

     NewEmployee.save().then((employee)=>{
        res.status(200).json({employee})

     })
     .catch((err)=>{
        console.log(err);
          res.status(500).json({message:"Error Creating Employee"})
     })


})


Router.post("/:id", async (req, res) => {
   const { Name, email, mobile, image,Job } = req.body;
   const{id}=req.params
   console.log(req.body);
   try {
     await Employee.updateOne(
       { _id: id},
       {
         $set: {
           Name,
           mobile,
           image,
           Job
         },
       }
     );
     res.send({status:"Ok",data:"Updated"})
   } catch (error) {
      console.log(error)
     return res.send({ error: error });
   }
 });



Router.get("/", (req,res)=>{
   Employee.find()
   .then((Employees)=>{
      res.status(200).json(Employees);
   })
   .catch((err)=>{
      console.log(err);
      res.status(500).json({err:"Internal server error"})
   }
)

})

Router.get('/:id',async (req,res)=>{

   const{id}=req.params

   try{
      const employee=await Employee.findById(id)
      res.status(200).json(employee)


   }
   catch(err){
      res.status(500).json({message:"Error fetching employee"})
      console.log(err)
   }
})

Router.get('/hr/:HR',async (req,res)=>{

   const{HR}=req.params

   try{
      const employee=await Employee.find({HR})
      if(employee.length===0){
         return res.status(404).json({message:"No employee found"})
      }
      res.status(200).json(employee)


   }
   catch(err){
      res.status(500).json({message:"Error fetching employee"})
      console.log(err)
   }
})



Router.delete('/:id',async (req,res)=>{

   const{id}=req.params

   try{
      await Employee.findByIdAndDelete(id)
      res.status(200).json({message:"Employee Deleted"})

   }
   catch(err){
      res.status(500).json({message:"Error deleting employee"})
   }

   
})

module.exports=Router


