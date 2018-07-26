
// const router = express.Router();
// external dependencies
const express= require('express');
const router = require('express').Router();
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require('cheerio');



// Database configuration
const databaseUrl = "mongodb://localhost:27017/newsScraper";
const collections = ["newsscrapes"];

const NewsScrape = require("../models/newsScrapeModel.js");
mongoose.connect(
  process.env.MONGODB_URI || databaseUrl,{});

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

  

  router.post('/:id', function (req, res) {


    if (req.body.comment === "") {


      res.send(`You need to enter a comment,
      please go back and try again`);


    } else {

    console.log("method post");
    var ObjectId = `ObjectId("${req.params.id}")`;
    console.log(ObjectId);

    NewsScrape.findOneAndUpdate({"_id": req.params.id},
      {$push: { "comments": req.body.comment}},
      { upsert: true }, function (error, comment) {

        if (error) throw error;
        res.redirect('/');



      });
    };
  });


  router.get("/all",  function (req, res){
    res.redirect('/');
  });

  router.get("/index",  function (req, res){
    res.redirect('/');
  });

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
    
  
  router.get("/scrape", function(req, res) {  
  
    request("https://www.theonion.com/", function(error, response, html) {
  
      let newsArr = [];
  
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $("h1.headline").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
   
        var newScrapeObj = new NewsScrape({  
          title: title,
          link: link  
        })
  
        console.log(`New Obj: ${newScrapeObj}
        --------------------------------------------`);
  
        newsArr.push(newScrapeObj);
  
      });
  
        NewsScrape.insertMany(newsArr, {ordered: false}, function(err, res) {
  
          if (err) {
          console.log(`a news scrape has been completed with this info.
          Please try again tomorrow`);
        } else {
      
          return
  
        };
  
        });
           res.redirect('/');
          
      });
    });

    router.get('/*', function(req, res){

      res.send(`This is not a valid URL.
      Please try again`);

  });

  router.post('/*', function(req, res){

    res.send(`This is not a valid URL.
    Please try again`);

  });

module.exports = router;


