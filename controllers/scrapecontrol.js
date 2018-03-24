const express = require('express');
const router = express.Router();

const mongojs = require("mongojs");
const mongoose = require("mongoose");

// Database configuration
const databaseUrl = "mongodb://localhost:27017/newsScraper";
const collections = ["newsscrapes"];

const request = require("request");
const cheerio = require("cheerio");

const NewsScrape = require("../newsScrapeModel.js");
mongoose.connect("mongodb://localhost:27017/newsScraper", {
});

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Create routes
// ----------------------------------------------------
// router.get('/', function (req, res) {
//     res.render('index');
//   });
  
  
//   // Index Page (render all burgers to DOM)
//   router.get('/index', function (req, res) {
//     burger.selectAll(function(data) {
//       var hbsObject = { burgers: data };
//       //console.log(hbsObject);
//       res.render('index', hbsObject);
//     });
//   });
  
  
//   // Create a New Burger
//   router.post('/burger/create', function (req, res) {
//     burger.insertOne(req.body.burger_name, function() {
//       res.redirect('/index');
//     });
//   });
  
  
//   // Devour a Burger
//   router.post('/burger/eat/:id', function (req, res) {
//     burger.updateOne(req.params.id, function() {
//       res.redirect('/index');
//     });
//   });
  // ----------------------------------------------------
  
  // Retrieve data from the db
  router.get("/", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.newsscrapes.find({}, function(error, scrapes) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {

        console.log(scrapes);
        // res.json(scrapes);
        // res.render('index');
        var hbsObject = { newsscrapes: scrapes };
//       //console.log(hbsObject);
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
        // console.log(`Title: ${title}`)
        var link = $(element).children("a").attr("href");
        // console.log(`Link: ${link}
        // -------------------------------------------`);
  
  
        var newScrapeObj = new NewsScrape({
  
          title: title,
          link: link
  
        })
  
  
        console.log(`New Obj: ${newScrapeObj}
        --------------------------------------------`);
  
        newsArr.push(newScrapeObj);
  
      });
  
        // console.log(`news arr: ${newsArr}
        // --------------------------------------------`);
  
        NewsScrape.insertMany(newsArr, {ordered: false}, function(err, res) {
  
          if (err) {console.log(`error: ${err}`)
        } else {
          console.log(`uploaded:  ${res}`);
          
          return
  
        };
  
        });
       
        res.send("scrape complete"); 
  
      })
  });












module.exports = router;