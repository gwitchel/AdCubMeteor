// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
// imports html page
import './main.html';

// Callback after the file is uploaded
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    // Uploads.insert(fileInfo);
    console.log(fileInfo);
    var curr = Session.get("currentAd")
    Ads.update({ _id: curr }, { $set: {image: fileInfo} }); // update current ad with file info
  }
  Hooks.init();
}
)

Template.uploadImage.events({
  'submit form': function(){
      // redirect to the next step
      event.preventDefault();
      Router.go("/adMetadata")
  }
})

// Admin screen
// https://atmospherejs.com/yogiben/admin
AdminConfig = {
  name: 'AdCub',
  adminEmails: ['jwitchel@colevalleygroup.com', 'gwitchel@gmail.com'],
  collections: {
    Ads: {},
    InsertionOrder: {},
    Credits: {},
  }
};

  // Redirects to the homepage on login and logout.
  // https://atmospherejs.com/differential/event-hooks
  Hooks.onLoggedOut = function () { 
    Router.go('/');
   }

  Hooks.onLoggedIn = function () { 
    Router.go('/');
   }

Template.home.helpers({
  // returns how much the school charges for an ad
    costOfAd: function(){
      cost = newSchools.findOne({admin: Meteor.userId()}).amount;
      return '$' + (cost/100).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
  // returns the number of ads an advertiser is currently running
    displayAdCount: function(){
      count = Ads.find({createdBy: Meteor.userId()}).count();
      if (count > 0){
        return count;
      } else{
        return "None";
      }
    },
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
    },
    // returns the name of the school related with the user
    displaySchool: function(){
      return newSchools.findOne({admin: Meteor.userId()}).schoolName;
    }
});

Template.howItWorks.helpers({
  // returns the number of registered school in newSchools
  userSchools: function(){
    var schools = newSchools.find().fetch().length; 
    return schools;
  },
  // returns the number of total ad requests
   userAds: function(){
    var ads = Ads.find().fetch().length; 
    return ads;
  }
})

// Routes
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
Router.route('/acceptOffer/:_id', function (){
  var item = Ads.findOne({_id: this.params._id});
  this.render("schoolAcceptOrder", {data : item})
})
Router.route('/', {
    template: 'home'
});