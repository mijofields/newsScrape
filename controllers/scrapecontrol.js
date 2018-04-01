
// const router = express.Router();
// external dependencies
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


  
  

  router.post('/comment/:id?', function (req, res) {

    if (err) throw err;

    console.log("post working");
    console.log(req.params.id)
    console.log(req.params.body);
    console.log(req.params.comment);

    
    console.log(res);

   
    console.log(`req: ${req}`);

  });

    

  //   db.newsscrapes.findByIdAndUpdate(())

  //   Employeehierarchy.findByIdAndUpdate(employeeparent._id,
  //     { "$push": { "childrens": employee._id } },
  //     { "new": true, "upsert": true },
  //     function (err, managerparent) {
  //         if (err) throw err;
  //         console.log(managerparent);
  //     }
  // );

      // db.newsscrapes.

    // db.newsscrapes.updateOne(req.params.id, function() {
    //   res.redirect('/index');
  



  router.get("/all",  function (req, res){
    res.redirect('/');
  });

  router.get("/index",  function (req, res){
    res.redirect('/');
  });

  // Retrieve data from the db
  router.get("/", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.newsscrapes.find().sort({created: -1}, function(error, scrapes) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      else {
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
  
          if (err) { console.log(`error: ${err}`)
        } else {
          console.log(`uploaded:  ${res}`);          
          return
  
        };
  
        });
           res.redirect('/');
          
      });
    });

    router.get('/*', function(req, res){

      res.send("wildcard get activated, puto");

  });

  router.post('/*', function(req, res){

    res.send("wildcard post activated, puto");

  });


//       $('.submit').click(function(){

//         event.preventDefault();

//         comment = $('.submit').val().trim();

//         // NewsScrape.findByIdAndUpdate(  
//           // the id of the item to find
//       //     req.params.todoId,
      
//       //     // the change to be made. Mongoose will smartly combine your existing 
//       //     // document with this change, which allows for partial updates too
//       //     req.body,
      
//       //     // an option that asks mongoose to return the updated version 
//       //     // of the document instead of the pre-updated one.
//       //     {new: true},
      
//       //     // the callback function
//       //     (err, todo) => {
//       //     // Handle any possible database errors
//       //         if (err) return res.status(500).send(err);
//       //         return res.send(todo);
//       //     }
//       // )
//       // There a
//  });



module.exports = router;


