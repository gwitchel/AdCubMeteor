import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './createAdd.html';

Template.CreateAd.events({
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
                if(!(allSchools)){
                    sort(reguler, "schoolType", "Regular school");
                    sort(other, "schoolType", "Other/Alternative school");
                    swap(); 
                }
                if(!(allGrades)){
                    gradeDecide(highSchool, 1, 5);
                    gradeDecide(middleSchool,5,8);
                    gradeDecide(lowerSchool,8,13);
                    gradeSort();
                }
                numberSort(lowerLimit,upperLimit); 
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
        redirect(); 
         var ad_id = Ads.insert({
            //date 
            //name 
            targetSchools: schools,
            //time frame
            // amount 
            // location / type 
            // size 
            image: "incomplete" ,
            createdBy: currUser,
            creationDate: new Date() 
        })
        // Write the ad_id to a session variable
        Session.set("currentAd",ad_id)
        var curr = Session.get("currentAd")
        console.log(curr)
        // Send the user to the next step
        Router.go('/uploadImage');
    },
});