import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './main.html';
var directions = []
Template.schoolInformation.events({
    
    'submit form': function(){
        event.preventDefault();
        //sets the names of the original schools array        
        var name = $("#schoolName").val();
        var schoolsArrayFirstNames = []; 
        for(var i = 0; i < schools.length; i++){
           schoolsArrayFirstNames.push(schools[i].schoolName);
        }
        // checks to see if it's a registered school
        if($.inArray(name, schoolsArrayFirstNames) !== -1){
            var newSchool = newSchools.find().fetch()
            //makes the list of the schools in the DB
            var newSchoolFN = []; 
            for(var i = 0; i < newSchool.length; i++){
                newSchoolFN.push(newSchool[i].schoolName)
            }
            // checks to see if it's already there
            if($.inArray(name, newSchoolFN) === -1){
                // if it's not, push it to the server
                var p = $.inArray(name, schoolsArrayFirstNames)
                newSchools.insert({
                    schoolName: name,
                    schoolCounty: schools[p].schoolCounty,
                    phone: schools[p].phone,
                    Address: schools[p].Address,
                    admin: Meteor.userId(),
                    creationDate: new Date() 
                })
            } else {   
                console.log("your information is already in the server... yay I guess...")                
            }
        } else {
              Router.go('/createInformation');
        }
    }
}) 

Template.schoolInformation.helpers({
    schoolName: function(){
      name = newSchools.findOne({admin: Meteor.userId()}).schoolName;
      return name; 
    },
    userName: function(){
      username = newSchools.findOne({admin: Meteor.userId()}).name;
      return username; 
    },
    phone: function(){
      phone = newSchools.findOne({admin: Meteor.userId()}).phone;
      return phone; 
    },
    userid: function(){
      theid = newSchools.findOne({admin: Meteor.userId()})._id;
      return theid; 
    }
})


 