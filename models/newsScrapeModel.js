const mongoose = require("mongoose");
const moment = require("moment");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var NewsScrape = new Schema({


  title: {

    type: String,
    unique: true,
    required: true
  },

  link: {
    type: String,
    unique: true,
    required: true
  },
  
  created:{
    type: Date,
    default: Date.now,
    required: true
  },

  comments: {
    type: Array,
    default: []

  }
  

});

// This creates our model from the above schema, using mongoose's model method
 var NewsScrape = mongoose.model("NewsScrape", NewsScrape);

// Export the User model
module.exports = NewsScrape;
