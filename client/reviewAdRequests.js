import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

dataTableData1 = function () {
    var x=  Ads.find({createdBy : Meteor.userId() }).fetch(); // or .map()
    return x;
};

var optionsObject1 = {
    "columnDefs": [ {
    "targets" : 3 ,
    "data": "img",
    "render" : function ( url, type, data) {
        return '<img style = "max-width:100%; height:auto" src="'+data["image"].url+'"/>';
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
        return Ads.find({createdBy : Meteor.userId() }).fetch();         
    },
    reactiveDataFunction1: function () {
        return dataTableData1;
    },
    optionsObject1: optionsObject1
});