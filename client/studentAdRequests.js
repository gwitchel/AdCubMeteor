// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// imports html page
import './studentAdRequests.html';
// creates a data table with all of the advertisements targetting the logged in school
dataTableData = function () {
    var x =  newSchools.find({admin:Meteor.userId()}).fetch(); // or .map()
    var ads = Ads.find().fetch(); 
    var adsTargettingUser = [];
    for(var k = 0; k < x.length; k++){
        for(var i = 0; i < ads.length; i++){
            for(var j = 0; j < ads[i].targetSchools.length; j++){
                var c = x[k];
                if(c.schoolName===ads[i].targetSchools[j].schoolName){
                    adsTargettingUser.push(ads[i]);
                }
            }
        }
    }
    return adsTargettingUser; // returns ads

};
var optionsObject = {
    "columnDefs": [ {
    "targets" : 3 ,
    "data": "img",
    "render" : function ( url, type, data) {
        return '<img style = "max-width:100%; height:auto" src="'+data["image"].url+'"/>';
    }
} ],
    columns: [
        // shows desired data to user
    {
        title: 'name',
        data: 'name', 
        className: 'nameColumn'
    },
    {
        title: 'timeframe',
        data: 'timeFrame', 
        className: 'nameColumn'
    },
    {
    title: '$',
    data: 'amountPerAd',
    className: 'nameColumn'
    },
    {
    title: 'location',
    data: 'location',
    className: 'nameColumn'
},   {
    title: 'accept', // allows user to accept an ad offer 
    "data": "_id", 
        "fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
            $(nTd).html("<a href ='/acceptOffer/"+oData._id+"'>Accept Offer</a>" ); // redirect then to the accpetOrder page to create a reciept
        },
    className: 'nameColumn'
}


],
    // ... see jquery.dataTables docs for more at https://datatables.net/
}


Template.DisplayAdRequests.helpers({
    displayAds: function(){
        return Ads.find({createdBy : Meteor.userId() }).fetch();          
    },
    reactiveDataFunction: function () {
        return dataTableData;
    },
    optionsObject: optionsObject
});