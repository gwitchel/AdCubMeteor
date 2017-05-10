import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'

  // code to run on server at startup
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
  });
}); 

Meteor.methods({
  // Server side function to set a role
  setRole:  function(role) {
    if(role === "school"){
        Roles.addUsersToRoles( Meteor.userId(), 'school', 'adcub-roles' );
    } else if(role === "advertiser") {
        Roles.addUsersToRoles( Meteor.userId(), 'advertiser', 'adcub-roles');
    }
    // You have to explictly reference the role-group (aka 'adcub-roles') otherwise it returns []
    // https://github.com/alanning/meteor-roles/issues/68
    // Also note Meteor._debug writes to the console for server side debugging
    Meteor._debug(Roles.getRolesForUser( Meteor.userId(), 'adcub-roles' ));
}

})

