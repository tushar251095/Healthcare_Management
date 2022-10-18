const  Patient = require("../model/patientModel");
const  User = require("../model/masterUser");
const  Doctor = require("../model/doctorModel");
const jwtMiddleware = require("../middleware/jwt");
const { v4: uuidv4 } = require("uuid");
//api to add new user 
exports.registerUser = (req, res, next) => {
 //console.log(req.body);
 req.body.userId = uuidv4();
 req.body.role="patient"
  let patient = new Patient(req.body);
  let obj={
    email:req.body.email,
    password:req.body.password,
    role:req.body.role
  }
  patient
    .save()
    .then(() => {
      let user = new User(obj)
      user. save()
      .then(()=>{
        res.send(true);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          err.status = 400;
        }
        next(err);
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};



exports.registerDoctor = (req, res, next) => {
  //console.log(req.body);
  req.body.doctorId = uuidv4();
  req.body.role="doctor"
  req.body.password=Math.random().toString(36).slice(-8)
  console.log( req.body.password)
   let doctor = new Doctor(req.body);
   let obj={
     email:req.body.email,
     password:req.body.password,
     role:req.body.role
   }
   doctor
     .save()
     .then(() => {
       let user = new User(obj)
       user. save()
       .then(()=>{
         res.send(true);
       })
       .catch((err) => {
         if (err.name === "ValidationError") {
           err.status = 400;
         }
         next(err);
       });
     })
     .catch((err) => {
       if (err.name === "ValidationError") {
         err.status = 400;
       }
       next(err);
     });
 };

let getDeatils=(role,email)=>{
  return new Promise((resolve,reject)=>{
    if(role=='patient'){
      Patient.findOne({email:email})
      .then(result=>{
           resolve(result)
      })
      .catch(error=>reject(error))
   }else if(role=='doctor'){
    Doctor.findOne({email:email})
    .then(result=>{
         resolve(result)
    })
    .catch(error=>reject(error))
   }else{
    User.findOne({email:email})
    .then(result=>{
      resolve(result)
    })
   }
  })
}
exports.Login = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  User
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        let err = new Error("wrong email address");
        err.status = 404;
        return next(err);
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            // console.log(user);
            const userinfo = {};

            getDeatils(user.role,user.email)
            .then(result=>{
              if(result!="admin"){
                userinfo.firstName=result.firstName,
                userinfo.lastName=result.lastName,
                userinfo.role=result.role
                userinfo.email=result.email
              }else if(result.role=="admin"){
                userinfo.firstName="admin",
                userinfo.lastName="admin",
                userinfo.role="admin"
                userinfo.email=result.email
              }
              const token = jwtMiddleware.generateToken(userinfo);
              res.json({
                token
              });
            })
          } else {
            let err = new Error("wrong password");
            err.status = 404;
            return next(err);
          }
        });
      }
    })
    .catch((err) => next(err));
};
