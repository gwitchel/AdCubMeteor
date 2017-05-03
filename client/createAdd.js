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
            allSchools: allSchools,
            regular: regular,
            other: other,
            allGrades: allGrades,
            highSchool: highSchool,
            middleSchool: middleSchool,
            lowerSchool: lowerSchool,
            allowAtypical: allowAtypical,
            lowerLimit: lowerLimit, 
            upperLimit: upperLimit,
            createdBy: currUser,
            creationDate: new Date() 
        });
        // console.log(allGrades)
        // console.log(highSchool)
        // console.log(middleSchool)
        // console.log(lowerSchool)      
        // console.log(allowAtypical.value)
        // console.log(lowerLimit)
        // console.log(upperLimit)
    }
});