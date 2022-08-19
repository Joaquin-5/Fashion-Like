const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clothes = new schema({

    title: String,
    desc: String,
    img: String,
    id: Number

})

const ClothesModel = mongoose.model('clothes',clothes);
module.exports = router;

router.get('/example',(rq, res)=>{
    res.end('hi')
})

