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

app.use('/:listingId', (req, res, next) => {
  if (req.params.listingId > 99 || req.params.listingId < 0) {
    res.sendStatus(404)
  }
  next()
})
app.use('/:listingId', express.static(__dirname + '../../public'));
app.use(express.json());



app.get('/api/host/:listingId', (req, res) => {
  res.redirect(`http://ec2-3-12-169-208.us-east-2.compute.amazonaws.com:2000/api/host/${req.params.listingId}`)
})


app.get('/api/reservation/:listingId', (req, res) => {
  res.redirect(`http://ec2-52-14-154-112.us-east-2.compute.amazonaws.com/api/reservation/${req.params.listingId}`)
})

app.get('/api/location/:listingId', (req, res) => {
  res.redirect(`http://ec2-3-12-169-208.us-east-2.compute.amazonaws.com:2001/api/location/${req.params.listingId}`)
})

app.get('/:listingId/airbrb_home.png', (req, res) => {
  res.redirect(`http://ec2-3-12-169-208.us-east-2.compute.amazonaws.com:2001/${req.params.listingId}/airbrb_home.png`)
})

app.get('/api/description/:listingId', (req, res) => {
  res.redirect(`http://52.14.166.9:4000/api/description/${req.params.listingId}`)
})

app.get('/api/suggestions/:listingId', (req, res) => {
  res.redirect(`http://ec2-52-14-214-44.us-east-2.compute.amazonaws.com:8080/api/suggestions/${req.params.listingId}`)
})

app.get('/api/reviews/:listingId', (req, res) => {

  if(req.query.type==='review'){
    res.redirect(`http://ec2-52-14-214-44.us-east-2.compute.amazonaws.com:8080/api/reviews/${req.params.listingId}?type=review`)
  }
  res.redirect(`http://ec2-52-14-214-44.us-east-2.compute.amazonaws.com:8080/api/reviews/${req.params.listingId}`)
})



app.listen(port,() =>{
  console.log(`server listening to port ${port}`)
})