const User = require('../models/authModel');
const messageModel = require('../models/messageModel');
const formidable = require('formidable');
const fs = require('fs');

const getLastMessage = async(myId, fdId) => {
     const msg = await messageModel.findOne({
          $or: [{
               $and: [{
                    senderId : {
                        $eq: myId
                    }
               },{
                    reseverId : {
                        $eq : fdId 
                    }
               }]
          }, {
               $and : [{
                    senderId : {
                         $eq : fdId
                    } 
               },{
                    reseverId : {
                         $eq : myId
                    }
               }]
          }]

     }).sort({
          updatedAt : -1
     });
     return msg;
}

module.exports.getFriends = async (req, res) => {
     const myId = req.myId;
     let fnd_msg = [];
     try{
          const friendGet = await User.find({
               _id: {
                    $ne: myId
                }
          });
          for (let i = 0; i < friendGet.length; i++ ){
               let lmsg = await getLastMessage(myId,friendGet[i].id);
               fnd_msg = [...fnd_msg, {
                    fndInfo : friendGet[i],
                    msgInfo : lmsg
               }]
          }
          // const filter = friendGet.filter(d=>d.id !== myId );
          res.status(200).json({success:true, friends : fnd_msg})

     }catch (error) {
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     }
}

module.exports.messageUploadDB = async (req, res) =>{
     const {
          senderName,
          reseverId,
          message
     } = req.body
     const senderId = req.myId;

     try{
          const insertMessage = await messageModel.create({
               senderId : senderId,
               senderName : senderName,
               reseverId : reseverId,
               message : {
                    text: message,
                    image : '',
                    audio : ''
               }
          })
          res.status(201).json({
               success : true,
               message: insertMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Sever Error'
               }
          })
     }
}

module.exports.audioMessageUploadDB = async (req, res) =>{
     const {
          senderName,
          reseverId,
          audioMessage
     } = req.body
     const senderId = req.myId;

     try{
          const insertMessage = await messageModel.create({
               senderId : senderId,
               senderName : senderName,
               reseverId : reseverId,
               message : {
                    text: '',
                    image : '',
                    audio : audioMessage
               }
          })
          res.status(201).json({
               success : true,
               message: insertMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Sever Error'
               }
          })
     }
}

module.exports.messageGet = async(req,res) => {
     const myId = req.myId;
     const fdId = req.params.id;
     try{
          let getAllMessage = await messageModel.find({
               $or: [{
                    $and: [{
                         senderId : {
                             $eq: myId
                         }
                    },{
                         reseverId : {
                             $eq : fdId 
                         }
                    }]
               }, {
                    $and : [{
                         senderId : {
                              $eq : fdId
                         } 
                    },{
                         reseverId : {
                              $eq : myId
                         }
                    }]
               }]
          })

          // getAllMessage = getAllMessage.filter(m=>m.senderId === myId && m.reseverId === fdId || m.reseverId ===  myId && m.senderId === fdId );

          res.status(200).json({
               success: true,
               message: getAllMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Server error'
               }
          })

     }
}    

module.exports.ImageMessageSend = (req,res) => {
     const senderId = req.myId;
     const form = formidable();

     form.parse(req, (err, fields, files) => {
          const {
              senderName,
              reseverId,
              imageName 
          } = fields;

          const newPath = "E:\\React Project\\Udemy Projects\\Chat-App-Project\\frontend1\\public\\image\\"+imageName;
          const newPath1 = __dirname + `../../../frontend1/public/image/${imageName}`
          files.image.originalFilename = imageName;
          try{
               fs.copyFile(files.image.filepath, newPath, async (err)=>{
                    if(err){
                         res.status(500).json({
                              error : {
                                   errorMessage: 'Image upload fail'
                              }
                         })
                    } else{
                         const insertMessage = await messageModel.create({
                              senderId : senderId,
                              senderName : senderName,
                              reseverId : reseverId,
                              message : {
                                   text: '',
                                   image : files.image.originalFilename,
                                   audio : ''
                              }
                         })
                         res.status(201).json({
                              success : true,
                              message: insertMessage
                         })
                    }
               } )
          }catch{
               res.status(500).json({
                    error : {
                         errorMessage: 'Internal Sever Error'
                    }
               })
          }
     })
}

module.exports.messageSeen = async (req,res) => {
     const messageId = req.body._id;

     await messageModel.findByIdAndUpdate(messageId, {
         status : 'seen' 
     })
     .then(() => {
          res.status(200).json({
               success : true
          })
     }).catch(() => {
          res.status(500).json({
               error : {
                    errorMessage : 'Internal Server Error'
               }
          })
     })
}


module.exports.delivaredMessage = async (req,res) => {
     const messageId = req.body._id;

     await messageModel.findByIdAndUpdate(messageId, {
         status : 'delivared' 
     })
     .then(() => {
          res.status(200).json({
               success : true
          })
     }).catch(() => {
          res.status(500).json({
               error : {
                    errorMessage : 'Internal Server Error'
               }
          })
     })
}

module.exports.getMessageSuggestion = async (req,res) => {
     try{
          const newPath = "E:\\React Project\\Udemy Projects\\Chat-App-Project\\frontend1\\public\\message\\messages.txt";
          fs.readFile(newPath, 'utf-8', function (err, data) {
               if (err) {
                 console.error(err);
                 res.status(500).send('Error reading messages');
               } else {
                    const messageArray = data.trim().split('\n');
                    res.status(200).json({messageArray});
               }
             });
     } catch (err) {
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     }
}

module.exports.postMessageSuggestion = async (req,res) => {
     try{
          const message = req.body.message;
          const newPath = "E:\\React Project\\Udemy Projects\\Chat-App-Project\\frontend1\\public\\message\\messages.txt";
          fs.appendFile(newPath, message + '\n' , function (err) {
               if (err) {
                 console.error(err);
                 res.status(500).send('Error reading messages');
               } else {
                    res.status(200).json({message:"Message added successfully"});
               }
          });
     } catch (err) {
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     }
}