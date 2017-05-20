// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
// imports html page
import './createInformation.html';
// allows user to select their school from a datatable containing all of the schools in the dataset
var selectYourschoolOptionObject ={
    // school identifying features shown 
    columns: [
        {
            title: 'School Name',
            data: 'schoolName', 
            className: 'nameColumn'
        },
        {
            title: 'School County',
            data: 'schoolCounty',
            className: 'nameColumn'
        },
        {
            title: 'Student Count',
            data: 'students',
            className: 'nameColumn'
        }
        ],
}

selectYourSchoolFunction = function(){
        //Create a client side only Mongo collection
        var LocalSchools = new Mongo.Collection(null);
        for (var i = 0; i < schools.length; i++) {
            LocalSchools.insert(schools[i]);
        }
        // returns local schools
        var x = LocalSchools.find().fetch();
        return x;
}

Template.createInformation.helpers({
    selectYourschoolOptionObject: selectYourschoolOptionObject,
    selectYourSchoolFunction: function(){
        return selectYourSchoolFunction;
    }
});



Template.createInformation.events({
    // lets user select an element from the table that represents their school
    'click tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return; // Won't be data if a placeholder row is clicked
        // Your click handler logic here
        $(event.currentTarget).css('background-color', 'LightGray')
        Session.set("schoolNameCookie", rowData["schoolName"]); // sets the current school to the session
    },
    'submit form': function(){ // ran when user updates their school information
        event.preventDefault(); // prevents default
        // gets variables from html page inputs 
        var schoolName = Session.get("schoolNameCookie");
        var name = $('#name').val();
        var phone = $("#phone").val();
        var address = $('#address').val();
        var city = $('#city').val();
        var zip = $('#zip').val();
        var schoolType = $('#schoolType').val();
        var charterSchool = $('input[type="checkbox"]').prop("checked")
        var amount = $("#amount").val(); 
        var schoolIsMapped = newSchools.findOne({schoolName: schoolName});
        if (schoolIsMapped) // checks to see if the school is already registered
        {
            window.alert("Sorry, your school is already registered.")
        } else { // inserts a school into the newSchools database (registered users) containing the information specified about the school creator
              newSchools.insert({
                name: name,
                runningAds : [], 
                schoolName: schoolName,
                phone: phone,
                address: address,
                city: city,
                zip: zip,
                schoolType: schoolType,
                charterSchool: charterSchool,
                amount: amount,
                admin: Meteor.userId(),
                creationDate: new Date() 
            })
            window.alert("Yay! You are in the database now!")
        }
    }
}) 
