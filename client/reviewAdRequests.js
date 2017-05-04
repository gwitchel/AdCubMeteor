import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';
   //var foo = Ads.find().fetch();
 //console.log(foo)
Template.reviewAdRequests.events({
    'click .foo': function(){
         var requests = [];
         var foo = Ads.find().fetch(); 
         for(var i =0; i < foo.length; i++){
            if(foo[i].createdBy === Meteor.userId()){
                requests.push(foo[i])
            }
         } 
    },
});

Template.DisplayAdsTemplate.helpers({
    displayAds: function(){
        var requests = [];
        var foo = Ads.find().fetch(); 
         for(var i =0; i < foo.length; i++){
            if(foo[i].createdBy === Meteor.userId()){
                requests.push(foo[i])
            }
         }
         return requests;  
    },
    'otherHelperFunction': function(){
        return "Some other function";
    }
});
