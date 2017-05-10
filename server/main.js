import { Meteor } from 'meteor/meteor';

  // code to run on server at startup
Meteor.startup(function() {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
  });

  var users = [
      {name:"John Witchel",email:"jwitchel@colevalleygroup.com",roles:['admin']},
      {name:"Georgia Witchel",email:"gwitchel@gmail.com",roles:['admin']},
    ];

_.each(users, function (user) {
  var id;

  var exists =  Meteor.users.find({email: this.email});
  if(!exists){
    id = Accounts.createUser({
      email: user.email,
      password: "123456",
      profile: { name: user.name }
    });
  
  if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles, 'admin-group');
  }
  }
})
});