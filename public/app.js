const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const NewsScrape = require("../newsScrapeModel.js");

console.log("app.js in effect");

$('#scrape').click( function() {
    console.log("scrape working");
    event.preventDefault();
    
      request("https://www.theonion.com/", function(error, response, html) {
    
        let newsArr = [];
    
        var $$ = cheerio.load(html);
        // For each element with a "title" class
        $$("h1.headline").each(function(i, element) {
          // Save the text and href of each link enclosed in the current element
          var title = $$(element).children("a").text();
          // console.log(`Title: ${title}`)
          var link = $$(element).children("a").attr("href");
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
    
        });
  
      });
