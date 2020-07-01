const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.get('/api/reviews/:listingId',(req,res) =>{

    console.log('received request')
  
    if(req.query.type=== 'review'){
      let listingId= req.params.listingId;
        dbConnection.query(`SELECT * FROM reviews WHERE listingId = ${listingId}`, (err,data)=>{
          let length = data.length;
          let score=0;
  
  
          data.forEach(review =>{
            score+=review.average;
          })
  
          let averageReview = parseFloat((score/length).toFixed(2));
          console.log(averageReview)
  
          res.json(averageReview)
        })
    }else{
      let listingId= req.params.listingId;
      dbConnection.query(`SELECT * FROM reviews WHERE listingId = ${listingId}`, (err,data)=>{
        // console.log(data);
        res.json(data);
      })
    }
  })
  
  
  
  
  app.get('/api/suggestions/:listingId',(req,res) =>{
    const listingId = req.params.listingId;
    let listArr=[Number(listingId)];
  
    let lists = new Array(100).fill(null).map((ele,idx) =>{return idx})
  
    lists.splice(listingId,1);
  
    for(var j =0; j<11;j++){
      var random = lists[Math.floor(Math.random() * lists.length)];
      listArr.push(random);
      var index = lists.indexOf(random)
      lists.splice(index,1);
    }
  
    var result = []
    listArr.forEach(listId =>{
      result.push(new Promise((resolve,reject)=>{
        dbConnection.query(`SELECT * FROM suggestions WHERE listingId=${listId}`,(err,listObj)=>{
          // console.log(listObj)
          resolve(listObj[0])
        })
      }))
    })
  
    return Promise.all(result).then(suggestList =>{
      res.json(suggestList)
    }).catch(err =>{
      console.log(err);
    })
  
  
  
  })
  
  
  app.get('/api/reviews',(req,res) =>{
    if(req.query.array){
      var array = JSON.parse(req.query.array);
  
      var averageReviews = [];
  
      for(let i =0; i<array.length;i++){
        let listingId = Number(array[i]);
        averageReviews.push(new Promise((resolve,reject) =>{
          dbConnection.query(`SELECT average FROM reviews WHERE listingId = ${listingId}`, (err,listObj)=>{
            if(err){
              console.log(err)
            }
  
            let avgValue = listObj.reduce((a, b) => a + b.average,0) / listObj.length;
  
            console.log(avgValue);
            resolve(avgValue)
          })
        }))
      }
  
      return Promise.all(averageReviews).then(avgArr =>{
        let avgValue = avgArr.reduce((a, b) => a + b) / avgArr.length;
  
  
        res.json(parseFloat((avgValue).toFixed(2)));
      }).catch(err =>{
        console.log(err);
      })
    }
  })
  
  app.get('/:listingId',(req,res) =>{
    if(req.params.listingId> 99){
      res.sendStatus(404);
    }
  
    var currentPage = path.join(__dirname, '../public/dist/index.html');
  
    res.sendFile(currentPage)
  })
  
  app.listen(8080, () => {
    console.log(`App is now listening on port 3000`);
  });

  module.exports.app = app;

