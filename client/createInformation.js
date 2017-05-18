import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './createInformation.html';


var selectYourschoolOptionObject ={
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
    'click tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return; // Won't be data if a placeholder row is clicked
        // Your click handler logic here
        $(event.currentTarget).css('background-color', 'LightGray')
        Session.set("schoolNameCookie", rowData["schoolName"]);
    },
    'submit form': function(){
        event.preventDefault();
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
        if (schoolIsMapped)
        {
            window.alert("Sorry, your school is already registered.")
        } else {
              newSchools.insert({
                name: name,
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
