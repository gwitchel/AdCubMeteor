import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './main.html';

// Callback after the file is uploaded
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    // Uploads.insert(fileInfo);
    console.log(fileInfo);
    var curr = Session.get("currentAd")
    Ads.update({ _id: curr }, { $set: {image: fileInfo} });
    Router.go("/adMetadata")
  }
})
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.home.helpers({
    // Get the value of the credits object for this user
    displayCredits: function(){
      credits = Credits.findOne({user : Meteor.userId()}); 
      if(credits){
        return '$' + (credits.amount/100).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      }
      else
      {
        return "$ 0.00"
      };
    }
});


Router.configure({
  name: 'main', 
  layoutTemplate: 'main'
});
Router.route('/selectRole',{
  name: 'selectRole'
})
Router.route('/services',{
  name: 'services'
})
Router.route('/commitInformation',{
  name: 'commitInformation'
})
Router.route('/createInformation',{
  name: 'createInformation'
})
Router.route('/home',{
  name: 'home'
})
Router.route('/createAd',{
  name: 'createAd'
});
Router.route('/reviewAdRequests',{
  name:"reviewAdRequests"
})
Router.route('/updateBilling',{
  name:"updateBilling"
})
Router.route('/aboutUs',{
  name:"aboutUs"
})
Router.route('/howItWorks',{
  name:"howItWorks"
})
Router.route('/studentMain',{
  name:"studentMain"
})
Router.route('/viewAdResults',{
  name:"viewAdResults"
})
Router.route('/uploadImage',{
  name:"uploadImage"
})
Router.route('/studentAdRequests',{
  name:"studentAdRequests"
})
Router.route('/schoolInformation',{
  name:"schoolInformation"
})
Router.route('/adMetadata',{
  name:"adMetadata"
})
