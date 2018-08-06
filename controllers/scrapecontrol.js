
// external dependencies
const express= require('express');
const router = require('express').Router();
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require('cheerio');
const moment = require('moment');



// Database configuration
const MONGODB_URI = "mongodb://heroku_194wc5v6:g50o512huirtvbsq75cacv7f8e@ds117539.mlab.com:17539/heroku_194wc5v6";
const databaseUrl = "mongodb://localhost:27017/newsScraper";
const collections = ["newsscrapes"];

const NewsScrape = require("../models/newsScrapeModel.js");

mongoose.connect(
  process.env.MONGODB_URI || databaseUrl,{useNewUrlParser: true});

// Hook mongojs configuration to the db variable
const db = mongojs(MONGODB_URI, collections);
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

        next();  
            
        //using next() to go to the next router after this possible write error  

      } else {
    
        res.redirect('/');

      };

      
      });         
    });
  }, function(req, res) {

    res.redirect('/');

  } );

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

      res.send(`This is not a valid URL.
      Please try again: ${req}`);

  });

  

  router.post('/*', function(req, res){

    res.send(`This is not a valid URL.
    Please try again`);

  });

module.exports = router;


