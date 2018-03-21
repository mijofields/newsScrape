// Dependencies express
const express = require("express");
const exphbs = require('express-handlebars');
//dependencies mongoDB

// Require request and cheerio. This makes the scraping possible
const app = express();
app.use(express.static('public'));


// Initialize Express


//Initialize handlebars

app.engine('handlebars', exphbs({defaultLayout: 'scrape'}));
app.set('view engine', 'handlebars');



var router = require('./controllers/scrapecontrol.js');
app.use('/', router);

// Open Server
var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log(`app now running on port ${port}`);
});

// Main route (simple Hello World Message)




