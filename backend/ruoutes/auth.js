const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');

const user = new schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['ROLE_ADMIN', 'ROLE_USER'],
            message: '{VALUE} no es un role válido',
            default: 'ROLE_USER',
            required: true,
        }
    }
}, { timestamps: true }
);

const UserModel = mongoose.model("user", user);





router.post('/register',async(req, res)=>{
    let body = req.body;
    const salt = bcrypt.genSaltSync(10);
    let { username, email, password, role } = body;
    let user = new UserModel({
        username,
      email,
      password: bcrypt.hashSync(password, salt),
      role
    });
  user.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
           ok: false,
           err,
        });
      }
      res.json({
            ok: true,
            user: usuarioDB
         });
      })
  });


  module.exports = router;