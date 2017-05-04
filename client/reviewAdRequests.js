import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

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


dataTableData = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // or .map()
    return x;
};

var optionsObject = {
    columns: [{
        title: 'ID',
        data: '_id', // note: access nested data like this
        className: 'nameColumn'
    },
    {title: 'All Schools',
    data: 'allSchools',
    className: 'nameColumn'
    },
    {title: 'Regular',
    data: 'regular',
    className: 'nameColumn'
    }],
    // ... see jquery.dataTables docs for more
}


Template.DisplayAdsTemplate.helpers({
    displayAds: function(){
        return Ads.find({createdBy : Meteor.userId() }).fetch();         
    },
    reactiveDataFunction: function () {
        return dataTableData;
    },
    optionsObject: optionsObject // see below
});