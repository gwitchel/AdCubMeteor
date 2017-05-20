// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
// imports html page
import './main.html';
var role = 0; 
Template.selectRole.events({
    'submit form': function(event){
        event.preventDefault();
        var role = event.target.optionsRadios;  // finds user selected role 
        // Calls the server side method in server/main.js
        Meteor.call('setRole', role.value); // sets the users role to the role value
        Router.go('/home'); // redirects to the home page

    }
})


