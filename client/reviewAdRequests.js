import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

dataTableData = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // or .map()
    return x;
};

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
    title: 'date placed',
    data: 'creationDate',
    className: 'nameColumn'
    }
],
    // ... see jquery.dataTables docs for more at https://datatables.net/
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