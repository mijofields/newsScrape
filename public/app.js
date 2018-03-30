// const express = require('express');
// const router = express.Router();
// const cheerio = require('cheerio');
// const NewsScrape = require("../newsScrapeModel.js");

// console.log("app.js in effect");

// ("button").on("click", function() {
//       var _id = $(this).attr("data-person");
//       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         person + "&api_key=dc6zaTOxFJmzC&limit=10";

//       $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//         .done(function(response) {
//           var results = response.data;







$(document).on( "click", 'button', function(){
     event.preventDefault();
    console.log("comment working");
    
    var _id = $(this).attr('data-id');
    console.log(_id);
    var comment = $(this).text("comment-input");
    console.log(comment);
    // var queryDB = "mongodb://localhost:27017/newsScraper";


    // $.ajax({
    //   // url: queryDB,
    //   method: "POST",
    //   _id: _id,
    //   comment: comment
    // })
    // .done(function(response) {
    //   var results = response.data;
    //   console.log(results);

    // });

  });
    
      // request("https://www.theonion.com/", function(error, response, html) {
    
      //   let newsArr = [];
    
      //   var $$ = cheerio.load(html);
      //   // For each element with a "title" class
      //   $$("h1.headline").each(function(i, element) {
      //     // Save the text and href of each link enclosed in the current element
      //     var title = $$(element).children("a").text();
      //     // console.log(`Title: ${title}`)
      //     var link = $$(element).children("a").attr("href");
      //     // console.log(`Link: ${link}
      //     // -------------------------------------------`);
    
    
      //     var newScrapeObj = new NewsScrape({
    
      //       title: title,
      //       link: link
    
      //     })
    
    
      //     console.log(`New Obj: ${newScrapeObj}
      //     --------------------------------------------`);
    
      //     newsArr.push(newScrapeObj);
    
      //   });
    
      //     // console.log(`news arr: ${newsArr}
      //     // --------------------------------------------`);
    
      //     NewsScrape.insertMany(newsArr, {ordered: false}, function(err, res) {
    
      //       if (err) {console.log(`error: ${err}`)
      //     } else {
      //       console.log(`uploaded:  ${res}`);
            
      //       return
    
      //     };
    
      //     });
         
      //     res.send("scrape complete"); 
    
      //   });
  
      // });
