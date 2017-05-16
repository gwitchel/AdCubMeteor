import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './main.html';
var role = 0; 
Template.selectRole.events({
    'submit form': function(event){
        event.preventDefault();
        var role = event.target.optionsRadios;  
        // Calls the server side method in server/main.js
        Meteor.call('setRole', role.value);
        Router.go('/home');

    }
})


