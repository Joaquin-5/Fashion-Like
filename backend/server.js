const express = require('express');
const app = express()

app.get('/',(req, res)=>{
    res.end('funciona!')
})

app.listen(5000, function(){
    console.log('Encendido')
})