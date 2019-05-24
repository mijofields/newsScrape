
// external dependencies
const express= require('express');
const router = require('express').Router();
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require('cheerio');
const moment = require('moment');



// Database configuration
const MONGODB_URI = "mongodb://heroku_w2lr5mgz:7v57hi3fmgf62f87q7ff2gccst@ds031893.mlab.com:31893/heroku_w2lr5mgz";
const MONGODB_USER = "mongodb://user1:databa5e@ds031893.mlab.com:31893/heroku_w2lr5mgz"
const databaseUrl = "mongodb://localhost:27017/newsScraper";
const collections = ["newsscrapes"];

const NewsScrape = require("../models/newsScrapeModel.js");

mongoose.connect(
  process.env.MONGODB_URI || MONGODB_URI,{useNewUrlParser: true});

// Hook mongojs configuration to the db variable
const db = mongojs(MONGODB_USER, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});



router.get("/scrape", function(req, res, next) {
  
  console.log(`server scrape working`);
  
   request("https://www.theonion.com/", function(error, response, html) {

    let newsArr = [];

    const $ = cheerio.load(html);
    // For each element with a "title" class
    $("h1.headline").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      let title = $(element).children("a").text();
      let link = $(element).children("a").attr("href");

 
      const newScrapeObj = new NewsScrape({  
        title: title,
        link: link  
      })

      newsArr.push(newScrapeObj);

    });

      NewsScrape.insertMany(newsArr, {ordered: false}, function(err, res) {

        if (err) {
        console.log(`${err.message}, it looks like a news scrape has been conducted recently.
                     ${err.result.nInserted} articles have been inserted 
                     but ${err.writeErrors.length} articles were duplicates`);
        console.log(1)  
        next();  
            
        //using next() to go to the next router after this possible write error  

      } else {
        next();

      };

      
      });         
    });
  }, function(req, res) {
    console.log(3)
    res.redirect('/');

  } 
  );

  // Retrieve data from the db
  router.get("/", function(req, res) {

  // Find all results from the scrapedData collection in the db
  db.newsscrapes.find({}).sort({created: -1}, function(error, scrapes) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    else {
   
      var hbsObject = { newsscrapes: scrapes };
      res.render('index', hbsObject);
    }
  });
});

  

  router.post('/:id', function (req, res) {

    
      var commentObj = {

      comment: req.body.comment,
      username: req.body.username,
      date: moment().format("MMM Do YYYY, HH:mm")

    }   

      NewsScrape.findOneAndUpdate({"_id": req.params.id},
        {$push: {"comments": commentObj}},
        { upsert: true }, function (error, commentObj) {

          if (error) throw error;
        
          res.redirect('/');
        
      });
  });


  router.get("/all",  function (req, res){
    res.redirect('/');
  });

  router.get("/index",  function (req, res){
    res.redirect('/');
  });
   
  


    router.get('/*', function(req, res){

      res.status(404).send(`This is not a valid URL.
      Please try again: ${req}`);

  });

  

  router.post('/*', function(req, res){

    res.status(404).send(`This is not a valid URL.
    Please try again`);

  });

module.exports = router;


