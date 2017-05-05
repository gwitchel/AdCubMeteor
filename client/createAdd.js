import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './createAdd.html';

Template.CreateAd.events({
    'submit form': function(event){
        event.preventDefault();
        //school type
        var allSchools = $("#allSchools").is(":checked");
        var regular = $("#regularSchools").is(":checked");
        var other = $("#other").is(":checked");
        //schools grades
        var allGrades = $("#allGrades").is(":checked");
        var highSchool = $("#highSchool").is(":checked");
        var middleSchool = $("#middleSchool").is(":checked");
        var lowerSchool = $("#lowerSchool").is(":checked");
        // population and restrictions
        var allowAtypical = event.target.allowAtypical;        
        var lowerLimit = $("#minimum").val();
        var upperLimit = $("#maximum").val();
        var currUser = Meteor.userId();
        //inserting ad properties to database
         Ads.insert({
            //date 
            //name 
            //target schools 
            //time frame
            // amount 
            // location / type 
            // size 
            // image
            createdBy: currUser,
            creationDate: new Date() 
        }
    }
});