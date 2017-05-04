import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

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
