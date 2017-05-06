import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

dataTableData = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // or .map()
    return x;
};

var optionsObject = {
    "columnDefs": [ {
    "targets" : 3 ,
    "data": "img",
    "render" : function ( url, type, data) {
        return '<img height="75%" width="75%" src="'+data["_id"]+'"/>';
    }
    } ],
    columns: [
    {
        title: 'ID',
        data: '_id', // note: access nested data like this
        className: 'nameColumn'
    },
    {
    title: 'All Schools',
    data: 'allSchools',
    className: 'nameColumn'
    },
    {
    title: 'Regular',
    data: 'regular',
    className: 'nameColumn'
    }],
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