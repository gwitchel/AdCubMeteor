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

var schoolOptionsObject = {
    columns: [
    {
        title: 'ID',
        data: '_id',
        className: 'nameColumn'
    },
],
    // ... see jquery.dataTables docs for more at https://datatables.net/
}
var schools = [{"ID":1,"schoolName":"Alamosa Ombudsman School of Excellence","schoolCounty":"Alamosa County","Phone":"(719) 937-2112","Address":"2431 Main St","City":"Alamosa","Zip":81101,"schoolType":"Other/Alternative school","G-K":0,"G-1":0,"G-2":0,"G-3":0,"G-4":0,"G-5":0,"G-6":1,"G-7":1,"G-8":10,"G-9":15,"G-10":17,"G-11":10,"G-12":7,"Lat":37.4762,"Long":-105.892,"State School Id":368,"State District Id":100," Male":41," Female":20," American Indian Alaskan":1," Asian":0," Black":2," Hispanic":50," White":7,"Teachers":3.29,"Local School Id":6508,"Urban Locale Code":33,"Title 1 Eligible":"No","Magnet School":"No","Charter School":"No"," Free & Reduced Lunch":41," Pacific":0," 2race":1,"students":61}]

$(".schoolsTable").DataTable({
    data: schools
})

Template.DisplayAdsTemplate.helpers({
    displayAds: function(){
        return Ads.find({createdBy : Meteor.userId() }).fetch();         
    },
    reactiveDataFunction: function () {
        return dataTableData;
    },
    optionsObject: optionsObject,
   
});
