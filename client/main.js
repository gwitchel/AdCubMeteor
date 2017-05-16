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

Router.configure({
  name: 'main', 
  layoutTemplate: 'main'
});
Router.route('/selectRole',{
  name: 'selectRole'
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
