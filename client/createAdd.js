import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './createAdd.html';

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
    'submit form': function(event){
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
                var sortedSchools = [];
                if(!(allSchools)){
                        sort(regular, "schoolType", "Regular school");
                        sort(other, "schoolType", "Other/Alternative school");
                        swap(); 
                }
                if(!(allGrades)){
                    gradeDecide(highSchool, 1, 5);
                    gradeDecide(middleSchool,5,8);
                    gradeDecide(lowerSchool,8,13);
                    gradeSort(); 
                }
                numberSort(lowerLimit,upperLimit); ;
                console.log(schools)   
            }

            function sort(id , sorter, sorterCaller){
                if(id){
                    for(var i = 0; i < schools.length; i++ ){
                        if(schools[i][sorter] === sorterCaller){
                            sortedSchools.push(schools[i])
                        }
                    }
                } 
            }

            function gradeSort(){
                if(allowAtypical){
                    for(var i = 0; i < schools.length; i++ ){
                        for(var k = 0; k < grades.length; k++ ){
                            if(schools[i][levels[k]] === 0 && grades[k] === 0 ){
                            } else if (schools[i][levels[k]] > 0 && grades[k]){
                                    sortedSchools.push(schools[i]);
                                    k = grades.length;
                            }
                        }
                    }
                } else {
                        for(var i = 0; i < schools.length; i++ ){
                        var k = 0
                            while(schools[i][levels[k]] === 0 && grades[k] === 0 || schools[i][levels[k]] > 0 && grades[k] ){
                                k++;
                            } 
                            if(!(k < grades.length)){
                                sortedSchools.push(schools[i]);
                            }
                    }
                }
                swap();
            }
            function numberSort(min,max){
                for(var i = 0; i < schools.length; i++){
                    if(schools[i].students > min && schools[i].students < max){
                        sortedSchools.push(schools[i]);
                    }
                }

                swap(); 
            }
            function swap(){
                schools = sortedSchools; 
                sortedSchools = []; 
            }
            function gradeDecide(id, start, end){
                    if(id){
                    for(var i = grades.length - start; i > grades.length - end; i--){
                            grades[i] = true
                    }
                }
            }
        //inserting ad properties to database
        if(!(allSchools && regular && other) && !(allGrades && highSchool && middleSchool && lowerSchool) && lowerLimit<upperLimit){
            redirect(); 
            if(schools.length !==0){
                var ad_id = Ads.insert({
                    name : "incomplete",
                    targetSchools: schools,
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