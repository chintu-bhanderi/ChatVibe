const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userRegister = (req, res) => {
     const form = formidable();
     form.parse(req, async (err, fields, files) => {

          console.log("hello");
          const {
               userName, email, password,confirmPassword
          } = fields;

          const {image} = files;
          const error = [];

          if(!userName){
               error.push('Please provide your user name');
          }
          if(!email){
               error.push('Please provide your Email');
          }
          if(email && !validator.isEmail(email)){
               error.push('Please provide your Valid Email');
          }
          if(!password){
               error.push('Please provide your Password');
          }
          if(!confirmPassword){
               error.push('Please provide your confirm Password');
          }
          if(password && confirmPassword && password !== confirmPassword){
               error.push('Your Password and Confirm Password not same');
          }
          if(password && password.length < 6){
               error.push('Please provide password mush be 6 charecter');
          }
          if(Object.keys(files).length === 0){
               error.push('Please provide user image');
          }
          if(error.length > 0){
               res.status(400).json({
                    error:{
                         errorMessage : error
                    }
               })
          } else {
               const getImageName = files.image.originalFilename;
               const randNumber = Math.floor(Math.random() * 99999 );
               const newImageName = randNumber + getImageName;
               files.image.originalFilename = newImageName;
               // const newPath1 = `../../frontend1/public/image/${files.image.originalFilename}`;
               const newPath = "E:\\React Project\\Udemy Projects\\Chat-App-Project\\frontend1\\public\\image\\"+files.image.originalFilename;
               try{
                    const checkUser = await registerModel.findOne({email});
                    if(checkUser) {
                         res.status(404).json({
                              error: {
                                   errorMessage: ['This email is already existed']
                              }
                         })   
                    } else {
                         fs.copyFile(files.image.filepath,newPath, async(error) => {
                              if(!error) {
                                   const userCreate = await registerModel.create({
                                        userName,
                                        email,
                                        password : await bcrypt.hash(password,10),
                                        image: files.image.originalFilename
                                   });

                                   const token = jwt.sign({
                                        id : userCreate._id,
                                        email: userCreate.email,
                                        userName: userCreate.userName,
                                        image: userCreate.image,
                                        registerTime: userCreate.createdAt,
                                   }, process.env.SECRET,{
                                        expiresIn: process.env.TOKEN_EXP
                                   })
                                   const options = {expires : new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000)}
                                   res.status(201).cookie('authToken',token, options).json({
                                        successMessage: 'Your Register Successful',
                                        token
                                   })
                              } else {
                                   // console.log('Image move error-> ',error);
                                   res.status(500).json({
                                        error: {
                                             errorMessage: ['Internal Server Error']
                                        }
                                   })
                              }
                         })
                    }

               } catch(err) {      
                    res.status(500).json({
                         error: {
                              errorMessage: ['Internal Server Error']
                         }
                    })
               }

          }


     }) // end Formidable  
     // res.send({message: "Working4"});
}


module.exports.userLogin = async (req, res) => {
     const error = [];
     const {email,password} = req.body;
     if(!email){
          error.push('Please provide your Email');
     }
     if(!password){
          error.push('Please provide your Passowrd');
     }
     if(email && !validator.isEmail(email)){
          error.push('Please provide your Valid Email');
     }
     if(error.length > 0){
          res.status(400).json({
               error:{
                    errorMessage : error
               }
          })
     }else {
          try{
               const checkUser = await registerModel.findOne({
                    email:email
               }).select('+password');  // for take password in this tupple.

               if(checkUser){
                    const matchPassword = await bcrypt.compare(password, checkUser.password );

                    if(matchPassword){
                         const token = jwt.sign({
                              id : checkUser._id,
                              email: checkUser.email,
                              userName: checkUser.userName,
                              image: checkUser.image,
                              registerTime : checkUser.createdAt
                         }, process.env.SECRET,{
                              expiresIn: process.env.TOKEN_EXP
                         }); 
                         const options = { expires : new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 )}
                         res.status(200).cookie('authToken',token, options).json({
                              successMessage : 'Your Login Successful',token
                         })
                    } else {
                         res.status(400).json({
                              error: {
                                   errorMessage : ['Your Password not Valid']
                              }
                         })
                    } 
               } else {
                    res.status(400).json({
                         error: {
                              errorMessage : ['Your Email Not Found']
                         }
                    })
               }

          } catch(error) {
               res.status(404).json({
                    error: {
                         errorMessage : ['Internal Sever Error']
                    }
               })
          }
     }
}