// Dependencies
const express = require("express");
const mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");

const NewsScrape = require("./newsScrapeModel.js");
mongoose.connect("mongodb://localhost:27017/newsScraper", {
});
// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "mongodb://localhost:27017/newsScraper";
var collections = ["newsscrapes"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.newsscrapes.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {


  request("https://www.theonion.com/", function(error, response, html) {

    let newsArr = [];

    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("h1.headline").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      console.log(`Title: ${title}`)
      var link = $(element).children("a").attr("href");
      console.log(`Link: ${link}
    -------------------------------------------`);


      var newScrapeObj = new NewsScrape({

        title: title,
        link: link

      })


      console.log(`New Obj: ${newScrapeObj}
    --------------------------------------------`);

      newsArr.push(newScrapeObj);

    });

      console.log(`news arr: ${newsArr}
      --------------------------------------------`);

      db.newsscrapes.insertMany(newsArr, function(error, docs) {

        if (err) return res.status(500).send(err);
        return res.status(200).send(docs);

      });
     
      console.log(`scrape complete`);

    })
});



// Scrape data from one site and place it into the mongodb db
//   app.get("/scrape", function(req, res) {

//   // Make a request for the news section of the onion
//   request("https://www.theonion.com/", function(error, response, html) {
//     // Load the html body from request into cheerio
//     var $ = cheerio.load(html);
//     // For each element with a "title" class
//     $("h1.headline").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         NewsScrape.create({
//           title: title,
//           link: link,
//           created: Date.now
//         })
//         .then(function(dbScrape) {
//       // If saved successfully, send the the new User document to the client
//         console.log(dbScrape);
//     })
//     .catch(function(err) {
//       // If an error occurs, send the error to the client
//       console.log(err);
    
// })};
//   })
// });
  //       db.scrapedData.insert({
  //         title: title,
  //         link: link,
  //         created: Date.now
  //       },
  //       function(err, inserted) {
  //         if (err) {
  //           // Log the error if one is encountered during the query
  //           console.log(err);
  //         }
  //         else {
  //           // Otherwise, log the inserted data
  //           console.log(inserted);
  //         }
  //       });
  //     }
  //   });
  // });

//   app.post("/submit", function(req, res) {
//     // Create a new user using req.body
//     User.create(req.body)
//       .then(function(dbUser) {
//         // If saved successfully, send the the new User document to the client
//         res.json(dbUser);
//       })
//       .catch(function(err) {
//         // If an error occurs, send the error to the client
//         res.json(err);
//       });
//   });
  

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
