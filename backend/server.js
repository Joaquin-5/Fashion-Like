const express = require('express');
const app = express()


const dbfile=require('./connection')

const routesC = require('./ruoutes/clothes');


app.use('/api/clothes',routesC);

app.get('/',(req, res)=>{
    res.end('funciona!')
})

app.listen(5000, function(){
    console.log('Encendido')
})