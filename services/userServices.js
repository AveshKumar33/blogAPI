const {User} = require('../models/userModel');
const{Blog}=require('../models/blogModel');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const config  = require('../config/credential');

module.exports.register =(data)=>{
    return new Promise((resolve,reject)=>{
      if(data.username && data.password){
        const salt = bcrypt.genSaltSync(13);
        const hashpassword=bcrypt.hashSync(data.password,salt);
          User.create({username:data.username,password:hashpassword},(error,result)=>{
            if(error){
              reject(error);
            }
            else{
                resolve(result);
            }
          })
        }
        else{
          reject('all feilds are required')
        }
    })
};
module.exports.login=(data)=>{
  return new Promise((resolve,reject)=>{
    if(data.username && data.password){
          User.findOne({username:data.username},(error,result)=>{
            if(error){
              reject('username not found')
            }else{
              const isMatched= bcrypt.compareSync(data.password,result.password);
              if(isMatched){
                const payload={
                  _id:result._id,
                  username:result.username
                }
              jwt.sign(payload,config.secret_key,{expiresIn:"1d"},(error,token)=>{
                if(error){
                  reject("token did'nt created");
                }else{
                  resolve(token);
                }
              });  
              }else{
                reject('please provide valid username or password')
              }
            }
          })

    }else{
      reject('all feilds are required');
    }
  })
};
module.exports.getAllUsers=()=>{
  return new Promise((resolve,reject)=>{
    User.find({},(error,result)=>{
      if(error){
        reject(error);
      }else{
        resolve(result);
      }
    })
  })
};
module.exports.getAllPublishBlogs=(user)=>{
  return new Promise((resolve,reject)=>{
    User.find({_id:user._id},(error,user)=>{
      if(user){
        Blog.find({isPublish:true},(error,result)=>{
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        })
      }else{
        reject("you are not user of blog")
      }
    })
  })
};

module.exports.makeBlogger=(data)=>{
  return new Promise((resolve,reject)=>{
    if(data.username && data.password && data.secret){
    User.findOne({username:data.username},(error,user)=>{
      if(error){
        reject("username did'nt  find in DB ");
      }else{
        if(user !== null){
          const isMatched=bcrypt.compareSync(data.password,user.password);
          if((isMatched) && (data.secret===config.blogger_secret_key)){
            User.updateOne({_id:user._id},{$set:{isblogger:true}},(error,result)=>{
             if(error){
              reject(error);
             }else{
              resolve({"status":"success","blogger":result});
             }
            })
          }else{
           reject("please provide valid credentials");
          }
        } else{
          resolve(null);
        }
      }
    })
  }
  else{
    reject("all feilds are required");
  }
  })
};