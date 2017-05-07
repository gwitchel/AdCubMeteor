import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

dataTableData = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // or .map()
    return x;
};

schoolTableData = function(){
        //Create a client side only Mongo collection
        var LocalSchools = new Mongo.Collection(null);
        for (var i = 0; i < schools.length; i++) {
            LocalSchools.insert(schools[i]);
        }
        var x = LocalSchools.find().fetch();
        return x;
}


var optionsObject = {
    "columnDefs": [ {
    "targets" : 2 ,
    "data": "img",
    "render" : function ( url, type, data) {
        return '<img style = "max-width:100%; height:auto" src="'+data["image"].url+'"/>';
    }
    } ],
    columns: [
    {
        title: 'ID',
        data: '_id', // note: access nested data like this
        className: 'nameColumn'
    },
    {
        title: 'targetSchools',
        data: 'targetSchools', // note: access nested data like this
        className: 'nameColumn'
    },
    {
    title: 'date placed',
    data: 'creationDate',
    className: 'nameColumn'
    }
],
    // ... see jquery.dataTables docs for more at https://datatables.net/
}

var schoolObject ={
    columns: [
        {
            title: 'School Name',
            data: 'schoolName', // note: access nested data like this
            className: 'nameColumn'
        },
        {
            title: 'School County',
            data: 'schoolCounty',
            className: 'nameColumn'
        }
        ],
}
Template.DisplayAdsTemplate.helpers({
    displayAds: function(){
        return Ads.find({createdBy : Meteor.userId() }).fetch();         
    },
    reactiveDataFunction: function () {
        return dataTableData;
    },
    optionsObject: optionsObject,
    schoolOptionObject: schoolObject,
    schoolDataFunction: function(){
        return schoolTableData;
    }

});