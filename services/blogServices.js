
const { Blog } = require('../models/blogModel');
const { User } = require('../models/userModel')



module.exports.addBlog = (data, user) => {
    return new Promise((resolve, reject) => {
        if (data.title) {
            User.findOne({ $and: [{ _id: user._id, isblogger: true }] }, (error, result) => {
                if (result) {
                    Blog.create({ title: data.title, blogger: result.username }, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                }
                else {
                    reject("you are not a blogger");
                }
            })
        } else {
            reject("please provide blog");
        }
    })
};
module.exports.comment = (data, user) => {
    return new Promise((resolve, reject) => {
        if (data) {
            //  Blog.create({comments.[].title:data.title})
        } else {
            reject('please do any comment');
        }
        resolve(user)
    })
};
module.exports.editBlog = (data, _id, user) => {
    return new Promise((resolve, reject) => {
        if (data.title) {
            User.findOne({ $and: [{ _id: user._id, isblogger: true }] }, (error, blogger) => {
                if (blogger) {
                    Blog.findByIdAndUpdate({ _id: _id }, { $set: { title: data.title } }, (error, blog) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(blog);
                        }
                    })
                } else {
                    reject('you are not a blogger')
                }
            })
        } else {
            reject('please provide updated feilds');
        }
    });
};
module.exports.deleteBlog = (_id, user) => {
    return new Promise((resolve, reject) => {
        if (_id) {
            User.findOne({ $and: [{ _id: user._id, isblogger: true } ]}, (error, blogger) => {
                if (blogger) {
                    Blog.findByIdAndDelete({ _id: _id }, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(result);
                        }
                    })
                } else {
                    reject('you are not blogger')
                }
            })
        } else {
            reject('please provide blog id')
        }
    })
};
module.exports.publishBlog=(_id,user)=>{
    return new Promise((resolve,reject)=>{
        if(_id){
             User.findOne({$and:[{_id:user._id,isblogger:true}]},(error,blogger)=>{
                   if(blogger){
                       Blog.findByIdAndUpdate({_id:_id},{$set:{isPublish:true}},(error,result)=>{
                        if(error){
                            reject(error);
                        }else{
                            resolve(result);
                        }
                       })
                   }else{
                    reject('you are not blogger')
                   }
             })
        }else{
            reject("please provide blogger id");
        }
    })
};

module.exports.unPublishBlog=(_id,user)=>{
    return new Promise((resolve,reject)=>{
        if(_id){
             User.findOne({$and:[{_id:user._id,isblogger:true}]},(error,blogger)=>{
                   if(blogger){
                       Blog.findByIdAndUpdate({_id:_id},{$set:{isPublish:false}},(error,result)=>{
                        if(error){
                            reject(error);
                        }else{
                            resolve(result);
                        }
                       })
                   }else{
                    reject('you are not blogger')
                   }
             })
        }else{
            reject("please provide blogger id");
        }
    })
};

module.exports.getAllBlogs=(user)=>{
    return new Promise((resolve,reject)=>{
        if(user){
             User.findOne({$and:[{_id:user._id,isblogger:true}]},(error,blogger)=>{
                   if(blogger){
                       Blog.find({},(error,result)=>{
                        if(error){
                            reject(error);
                        }else{
                            resolve(result);
                        }
                       })
                   }else{
                    reject('you are not blogger')
                   }
             })
        }else{
            reject("please provide blogger id");
        }
    })
}