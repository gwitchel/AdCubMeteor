// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// imports html page
import './createAdd.html';

// creates the datatable that displays the schools that the ad will be sent to. This block is currently not functional, and therefore is not utalized in the website. 
schoolTableData = function(){
        //Create a client side only Mongo collection
        var LocalSchools = new Mongo.Collection(null);
        for (var i = 0; i < schools.length; i++) {
            LocalSchools.insert(schools[i]);
        }
        var x = LocalSchools.find().fetch();
        return x;
}
var schoolObject ={
    columns: [
        {
            title: 'School Name',
            data: 'schoolName', // note: access nested data like this
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
Template.CreateAd.helpers({
    schoolOptionObject: schoolObject,
    schoolDataFunction: function(){
        return schoolTableData;
    }
});
Template.CreateAd.events({
    'click #preview': function(event){
        event.preventDefault();
        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {
                var min = parseInt($("#minimum").val());
                var max = parseInt($("#maximum").val());
                var age = parseFloat( data["2"] ) || 0; // use data for the 3rd column

                if ( ( isNaN( min ) && isNaN( max ) ) ||
                    ( isNaN( min ) && age <= max ) ||
                    ( min <= age   && isNaN( max ) ) ||
                    ( min <= age   && age <= max ) )
                {
                    return true;
                }
                return false;
            }
        );
        var t = $('#DataTables_Table_0').DataTable();
        t.draw();
    },
    'submit form': function(event){ //finds target schools and creates the current ad that the user is making
        event.preventDefault();
        //school type
        var allSchools = $("#allSchools").is(":checked");
        var regular = $("#regularSchools").is(":checked");
        var other = $("#other").is(":checked");
        //schools grades
        var allGrades = $("#allGrades").is(":checked");
        var highSchool = $("#highSchool").is(":checked");
        var middleSchool = $("#middleSchool").is(":checked");
        var lowerSchool = $("#lowerSchool").is(":checked");
        // population and restrictions
        var allowAtypical = event.target.allowAtypical;        
        var lowerLimit = $("#minimum").val();
        var upperLimit = $("#maximum").val();
        var currUser = Meteor.userId();
        // generating list of school that fit the user discription
        var typeOfSchool; 
        var locations; 
        var level; 
        var sortedSchools = [];
        var grades = [0,0,0,0,0,0,0,0,0,0,0,0,0]; 
        var levels = ["G-K","G-1","G-2","G-3","G-4","G-5","G-6","G-7","G-8","G-9","G-10","G-11","G-12",]
        function redirect(){
            var sortedSchools = [];  // used to keep track of schools and make sure that the same school isn't counted twice when sorted (if it meet two different parameters)
            if(!(allSchools)){
                // puts all of the school into the sortedSchools array
                sort(regular, "schoolType", "Regular school");
                sort(other, "schoolType", "Other/Alternative school");
                swap(); // resets school as the sorted schools and clears sortedSchools
            }
            if(!(allGrades)){
                // makes an array containing booleans as to whether or not each grade is to be counted
                gradeDecide(highSchool, 1, 5);
                gradeDecide(middleSchool,5,8);
                gradeDecide(lowerSchool,8,13);
                //sorts out the schools that have one the grades specified
                gradeSort(); 
            }
            // sorts out schools based on population
            numberSort(lowerLimit,upperLimit); ;   
        }
        function sort(id , sorter, sorterCaller){
            if(id){ // id is the boolean of if a checkbox is checked
                for(var i = 0; i < schools.length; i++ ){
                    if(schools[i][sorter] === sorterCaller){ // sorterCaller is the variablebeing sorted for and sorter is the property in the object
                        // pushes school whos given property meets the sorterCaller
                        sortedSchools.push(schools[i])
                    }
                }
            } 
        }
        function gradeSort(){
            if(allowAtypical){ // schools can contain grades other than the grade specified
                //pulls out grades that contain one or more of the grades specified
                for(var i = 0; i < schools.length; i++ ){
                    for(var k = 0; k < grades.length; k++ ){
                            if(schools[i][levels[k]] === 0 && grades[k] === 0 ){
                        } else if (schools[i][levels[k]] > 0 && grades[k]){
                            sortedSchools.push(schools[i]);
                            k = grades.length;
                        }
                    }
                }
            } else { // schools must only contain the grades specified and nothing else
                for(var i = 0; i < schools.length; i++ ){ // checks for every school
                    var k = 0
                    // checks all of grades to make sure they match the grades array booleans perfectly
                    while(schools[i][levels[k]] === 0 && grades[k] === 0 || schools[i][levels[k]] > 0 && grades[k] ){
                        k++;
                    } 
                    if(!(k < grades.length)){
                        sortedSchools.push(schools[i]);
                    }
                }
            } 
            swap(); // resets school as the sorted schools and clears sortedSchools
        }
        function numberSort(min,max){
            // checks to make sure that the population of each school is greater than the min and less than the max 
            for(var i = 0; i < schools.length; i++){
                if(schools[i].students > min && schools[i].students < max){
                    sortedSchools.push(schools[i]);
                }
            }
            swap(); // resets school as the sorted schools and clears sortedSchools
        }
        function swap(){
            // resets school as the sorted schools and clears sortedSchools
            schools = sortedSchools; 
            sortedSchools = []; 
        }
        function gradeDecide(id, start, end){
            if(id){ // if the id checkbox is checke
                for(var i = grades.length - start; i > grades.length - end; i--){ // sets all of the 0's between the two given indexes to true
                    grades[i] = true // each index corrolates with a given grade
                }
            }
        }
        //inserting ad properties to database
        if(!(allSchools && regular && other) && !(allGrades && highSchool && middleSchool && lowerSchool) && lowerLimit<upperLimit){ // makes sure that all form elements are filled out
            redirect(); // returns list of schools that meet the ad requirements
            if(schools.length !==0){ // if there are ANY schools that meet the requirements
                // inserts a new ad to the Ads database
                var ad_id = Ads.insert({
                    name : "incomplete",
                    targetSchools: schools,
                    schoolsRunning: [],
                    timeFrame: "incomplete",
                    amountPerAd: "incomplete", 
                    totalAmount: "incomplete", 
                    location: "incomplete",
                    image: "incomplete" ,
                    creatorEmail: "incomplete",
                    createdBy: currUser,
                    creationDate: new Date() 
                })
                // Write the ad_id to a session variable
                Session.set("currentAd",ad_id)
                Session.set("dateMade", ad_id.creationDate)
                // Send the user to the next step
                Router.go('/uploadImage');
            } else {
                window.alert("uh-oh, it looks like there aren't any registered schools that fit your search... try widening your range")
            }
        } else {
            window.alert("oops, it looks like you missed some information when filling out your form")
        }
    },
});