import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Callback after the file is uploaded
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    // Uploads.insert(fileInfo);
    console.log(fileInfo);
    var curr = Session.get("currentAd")
    Ads.update({ _id: curr }, { $set: {image: fileInfo} });
    //console.log(Ads.find({ image: fileInfo }).fetch());
    //console.log(foo)
  }
})


AdminConfig = {
  name: 'AdCub',
  adminEmails: ['jwitchel@colevalleygroup.com'],
  collections: {
    Ads: {}
  }
};

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
Router.configure({
  name: 'main', 
  layoutTemplate: 'main'
});
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
Router.route('/getStarted',{
  name:"getStarted"
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



