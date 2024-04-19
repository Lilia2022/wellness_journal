const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/newWebApp3");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  image:{
    type: String
  },
  password: {
    type: String,
    // required: true
  },
  Journals:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journal"
  }],
  // dp: {
  //   type: String // Assuming dp is a URL to the user's display picture
  // },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  }
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
