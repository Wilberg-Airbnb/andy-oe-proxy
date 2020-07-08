const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use(cors())

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname+'/../public/index.html'))
})

app.use((req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Headers','Origin','X-Requested-With','Content-Type','Accept')
  next();
})

app.listen(port,() =>{
  console.log(`server listening to port ${port}`)
})