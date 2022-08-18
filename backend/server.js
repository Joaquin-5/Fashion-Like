const express = require('express');
const app = express()


const dbfile=require('./connection')

app.get('/',(req, res)=>{
    res.end('funciona!')
})

app.listen(5000, function(){
    console.log('Encendido')
})