import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './main.html';

Template.commitInformation.events({
    'submit form': function(){
        event.preventDefault();
        var name = Session.get("schoolNameCookie")

        var schoolFirstNames = []; 
        for(var i = 0; i < schools.length; i++){
            schoolFirstNames.push(schools[i].schoolName);
        }
        var newSchool = newSchools.find().fetch()
        var newSchoolFN = []; 
        for(var i = 0; i < newSchool.length; i++){
            newSchoolFN.push(newSchool[i].schoolName)
        }
        if($.inArray(name, newSchoolFN) !== -1){
                console.log('foo')

        } else {
            var p = $.inArray(name, schoolFirstNames)
            newSchools.insert({
                schoolName: name,
                schoolCounty: schools[p].schoolCounty,
                phone: schools[p].phone,
                Address: schools[p].Address,
                admin: Meteor.userId(),
                creationDate: new Date() 
            })
            console.log("congrats! Your information has been added to our database! go to your ad homepage to view ad requestss")
             
        }
    }
}) 


 