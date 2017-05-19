import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './studentAdRequests.html';

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
    return adsTargettingUser;

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
    {
        title: 'name',
        data: 'name', // note: access nested data like this
        className: 'nameColumn'
    },
    {
        title: 'timeframe',
        data: 'timeFrame', // note: access nested data like this
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
    title: 'accept',
    "data": "_id", 
        "fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
            $(nTd).html("<a href ='/acceptOffer/"+oData._id+"'>Accept Offer</a>" );
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
Template.DisplayAdRequests.events({
    'click tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return; // Won't be data if a placeholder row is clicked
        // Your click handler logic here
        $(event.currentTarget).css('background-color', '#bada55')
        Session.set("schoolNameCookie", rowData["schoolName"]);
    },
})