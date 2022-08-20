const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clothes = new schema({

    title: String,
    description: String,
    image: String,

})

const ClothesModel = mongoose.model('clothes',clothes);
module.exports = router;
/*
router.get('/example',(rq, res)=>{
    res.end('hi')
})*/

router.post('/add',(req, res)=>{
    const newC = new ClothesModel({

        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    })

    newC.save(function(err){
        if(!err){
            res.send('usuario agregado')
        }else{
            res.send(err)
        }
    })
})


//get

router.get('/get',(req, res)=>{
    ClothesModel.find({},function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



