const userService= require('../services/userServices');
exports.signup=async(req,res)=>{
  await userService.register(req.body).then((result)=>{
    res.status(200).send({"status":"success","user":result});
  }).catch(error =>{
    res.status(417).send({"status":"failed","error":error})
  });
};

exports.userLogin=async (req,res)=>{
  await userService.login(req.body).then((token)=>{
   res.status(200).send({"status":" user log-in successfully ","token":token})
  }).catch(error=>{
    res.status(401).send({"status":"failed","error":error});
  });
};
exports.allUsers=async(req,res)=>{
  await userService.getAllUsers().then(result=>{
    res.status(200).send({"status":"success","users":result})}).catch((error)=>{
      req.status(404).send({"status":"failed","errors":error});
    })
  };
  exports.publishBlogs=async(req,res)=>{
    await userService.getAllPublishBlogs(req.user).then(result=>{
      res.status(200).send({"status":"success","users":result})}).catch((error)=>{
        req.status(404).send({"status":"failed","errors":error});
      })
    };
exports.toMakeBlogger=async(req,res)=>{
  await userService.makeBlogger(req.body)
    .then((result)=>{
            if(result === null){
              res.status(400).send({"status":"got null object / username not found"});
            } else{
              res.status(200).send({"status":"success","blogger":result});
            }
  }).catch(error=>{
    res.status(400).send({"status":"failed","error":error});
  })
}