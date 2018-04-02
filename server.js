// Dependencies express
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));



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




