import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './main.html';

Template.createInformation.events({
    'submit form': function(){
        event.preventDefault();
        var name = Session.get("schoolNameCookie")
        var schoolCounty = $("#county").val();
        var phone = $("#phone").val();
        var newSchool = newSchools.find().fetch();
        var schoolNameInDB = []; 
        for(var i = 0; i < newSchool.length; i++){
            schoolNameInDB.push(newSchool[i].schoolName);
        }
        if($.inArray(name, schoolNameInDB) !== -1){
            console.log("sorry, your already registered")
        } else {
              newSchools.insert({
                schoolName: name,
                schoolCounty: schoolCounty,
                phone: phone,
                admin: Meteor.userId(),
                creationDate: new Date() 
            })
            console.log("yay! Your in the databse now!")
        }
    }
}) 
