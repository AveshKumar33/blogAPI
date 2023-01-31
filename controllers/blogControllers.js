const { post, patch } = require('../routers/userRouter')
const blogService = require('../services/blogServices')



exports.addBlog = async (req, res) => {
    await blogService.addBlog(req.body, req.user).then((result) => {
        res.status(200).send({ "status": "success", "method": post, "blog": result })
    }).catch((error) => {
        res.status(417).send({ "status": "failed", "error": error });
    })
}
exports.postComment = async (req, res) => {
    await blogService.comment(req.body, req.user).then((result) => {
        res.status(200).send({ "status": "success", "method": post, "blog": result })
    }).catch(error => {
        res.status(417).send({ "status": "failed", "error": error });
    })
};
exports.editPost =async(req,res) =>{
     await blogService.editBlog(req.body,req.params.id,req.user).then((result)=>{
        res.status(200).send({"status":"success","method":"patch","newBlog":result})
    }).catch((error)=>{
            res.status(404).send({"status":"failed","error":error});
        });
};
exports.deletePost=async(req,res)=>{
 await blogService.deleteBlog(req.params.id,req.user).then((result)=>{
    res.status(200).send({"status":"success","method":"patch","newBlog":result});
 }).catch(error=>{
    res.status(200).send({"status":"failed","error":error});
 })
}
exports.publishPost=async(req,res)=>{
    await blogService.publishBlog(req.params.id,req.user).then((result)=>{
       res.status(200).send({"status":"success","publishBlog":result});
    }).catch(error=>{
       res.status(200).send({"status":"failed","error":error});
    })
   };
   exports.unPublishPost=async(req,res)=>{
    await blogService.unPublishBlog(req.params.id,req.user).then((result)=>{
       res.status(200).send({"status":"success","publishBlog":result});
    }).catch(error=>{
       res.status(200).send({"status":"failed","error":error});
    })
   };
   exports.getAllPosts=async(req,res)=>{
    await blogService.getAllBlogs(req.user).then((result)=>{
       res.status(200).send({"status":"success","method":"patch","newBlog":result});
    }).catch(error=>{
       res.status(200).send({"status":"failed","error":error});
    })
   }