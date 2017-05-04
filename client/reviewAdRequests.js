import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './reviewAdRequests.html';

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