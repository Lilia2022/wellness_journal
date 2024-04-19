var express = require('express');
var router = express.Router();
const userModel = require('./users');

const journalModel = require('./journals');
// const postModel = require('./posts');
// const mongoose = require('mongoose');
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const upload = require("./multers");
// const Journal = require('./journals');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/settings', function(req, res, next) {
  res.render('settings');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

// router.get('/journal', function(req, res, next) {
//   res.render('journal');
// });

router.get('/mood', function(req, res, next) {
  res.render('mood');
});

router.get('/login', function(req, res, next) {
  // console.log(req.flash("error"));
  res.render('login',{error:req.flash('error')});
});

router.get("/feed" ,function(req, res, next) {
  res.render("feed.ejs");
});

router.get("/calendar" ,function(req, res, next) {
  res.render("calendar.ejs");
});

router.post("/upload" , isLoggedIn ,upload.single("file") , async function(req, res, next) {
  // if(!req.file){
  //   return res.status(404).send("No files were given");
  // }
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  const Journal = await journalModel.create({
    title: req.body.title,
    content: req.body.content,
    user: user._id
  });
  user.Journals.push(Journal._id);
  await user.save();

  res.redirect("/journal");  

});

router.post("/uploadimg" , isLoggedIn ,upload.single("file") , async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("No files were given");
  }
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  user.image = req.file.filename;
  await user.save();
  res.redirect("/profile");  

});

router.get('/profile', isLoggedIn , async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  res.render("profile",{user});
});

router.get('/journal', isLoggedIn , async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  }).populate("Journals");
  res.render("journal",{user});
});

router.post("/Register",function(req,res){
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullname
  })
  userModel.register(userData, req.body.password).then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/login");
    })
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}),function(req,res){
});

router.get('/logout',function(req,res){
  req.logout(function(err){
    if(err) return err;
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

// router.get('/createuser', async function(req, res, next) {
//   let createduser = await userModel.create({
//     username: "Aryannn",
//     password: "Aryan123",
//     posts:[],
//     email: "aryan12@gmail.com",
//     fullName: "Aryan Dhawan"
//   })
//   res.send(createduser);
// });

// router.get('/alluserposts', async function(req, res, next) {
//   let user = await userModel.findOne({_id: "661b9921ebc13ee5c265c404"}).populate('posts')
//   res.send(user);
// });

// router.get('/createuser', async function(req, res, next) {
//   let createduser = await userModel.create({
//     username: "Aryannn",
//     password: "Aryan123",
//     posts:["121qqww2w2w2"],
//     email: "aryan12@gmail.com",
//     fullName: "Aryan Dhawan"
//   })
//   res.send(createduser);
// });

// router.get('/createpost', async function(req, res, next) {
//   let createdpost = await postModel.create({
//     postText: "Hello everyone, this is my first post on this platform!!",
//     user: "661b9921ebc13ee5c265c404"
//   });
//   let user = await userModel.findOne({_id: "661b9921ebc13ee5c265c404"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done");
// });

module.exports = router;
