// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// imports html page
import './reviewAdRequests.html';

// gets information and formatting for the table containing the information about  ad requests the user has made
dataTableData1 = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // gets ads
    return x;
};

var optionsObject1 = {
    "columnDefs": [ {
    "targets" : 3 ,
    "data": "img",
    "render" : function ( url, type, data) {
        return '<img style = "max-width:100%; height:auto" src="'+data["image"].url+'"/>'; //renders image
    }
    },

    {
        "targets" : 1 ,
        "data": "text",
        "render" : function ( url, type, data) {
            result = "";
            for (i = 0; i < data.targetSchools.length; i++){
                result = result + data.targetSchools[i].schoolName + ", ";
            }
            // Trim the last comma
            if(result.length > 2){
                result = result.substring(0, result.length - 2)
            }
            return result;
        }
    }


 ],
    columns: [
    // gives  information about ads
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

Template.DisplayAdsTemplate.helpers({
    displayAds: function(){
        return Ads.find({createdBy : Meteor.userId() }).fetch();  // returns ads        
    },
    reactiveDataFunction1: function () {
        return dataTableData1; // returns datatable
    },
    optionsObject1: optionsObject1
});