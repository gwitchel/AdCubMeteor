// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
//imports HTML page
import './main.html';

Template.commitInformation.events({
    // submit form event to update school information
    'submit form': function(){
        event.preventDefault(); // prevent auto submit
        var name = Session.get("schoolNameCookie") // gets current cookie
        // checks to see if the school is in the schools dataset based on first name
        var schoolFirstNames = []; 
        for(var i = 0; i < schools.length; i++){
            schoolFirstNames.push(schools[i].schoolName);
        }
        var newSchool = newSchools.find().fetch()
        var newSchoolFN = []; 
        for(var i = 0; i < newSchool.length; i++){
            newSchoolFN.push(newSchool[i].schoolName)
        }
        if($.inArray(name, newSchoolFN) === -1){
            // if the school is not in the collectiong already defined in mongo add it to the schools registered on the server
            var p = $.inArray(name, schoolFirstNames)
            newSchools.insert({
                schoolName: name,
                schoolCounty: schools[p].schoolCounty,
                phone: schools[p].phone,
                Address: schools[p].Address,
                admin: Meteor.userId(),
                creationDate: new Date() 
            })
        }
    }
}) 


 