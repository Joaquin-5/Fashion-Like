const express = require('express');
const app = express()


const dbfile=require('./connection')

const routesC = require('./ruoutes/clothes');

//body parse

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



app.use('/api/clothes',routesC);

app.get('/',(req, res)=>{
    res.end('funciona!')
})

app.listen(5000, function(){
    console.log('Encendido')
})