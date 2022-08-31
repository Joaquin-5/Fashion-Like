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
    let { username, email, password, role } = body;
    let user = new UserModel({
        username,
      email,
      password: bcrypt.hashSync(password, 10),
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

  router.post('/login',async(req, res)=>{
    let body = req.body;
    
    UserModel.findOne({ email: body.email }, (erro, usuarioDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
 // Verifica que exista un usuario con el mail escrita por el usuario.
    if (!usuarioDB) {
       return res.status(400).json({
         ok: false,
         err: {
             message: "Usuario o contraseña incorrectos"
         }
      })
    }
 // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
    if (! bcrypt.compareSync(body.password, usuarioDB.password)){
       return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario o contraseña incorrectos"
          }
       });
    }
 // Genera el token de autenticación
     let token = jwt.sign({
      user: usuarioDB,
         }, process.env.SEED_AUTENTICACION, {
         expiresIn: process.env.CADUCIDAD_TOKEN
     })
     res.json({
         ok: true,
         user: usuarioDB,
         token,
     })
 })
  });