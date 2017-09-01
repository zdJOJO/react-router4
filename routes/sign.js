/*
  登录、注册
*/

const userModel = require("../models").userModel;
const saveCtrl = require("./controller");

module.exports = function(app) {

  //注册
  app.post("/api/signup", (req, res)=>{
    saveCtrl.handleSave(req.body, userModel, (err, entity)=>{
      res.send({
        result: err || entity,
        msg: err || "registered successfully",
        status: err ? -1 : 0
      });
    });
  });

  //登录
  app.post("/api/login", (req, res)=>{
    userModel.findOne({"username": req.body.username}, (err, user)=>{
      if (err){
        throw err;
        res.send({
          result: null,
          msg: 'username does not exist',
          status: -1
        });
      }else{
        let isPasswordCorrected = req.body.password===user.toObject().password;
        res.send({
          result: isPasswordCorrected ? user : null,
          msg: isPasswordCorrected ? 'success': 'password error !',
          status: isPasswordCorrected ? 0 : 1
        });
      }
    });
  });

};


