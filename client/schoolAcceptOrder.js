// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
// imports html page
import './schoolAcceptOrder.html';

Template.schoolAcceptOrder.rendered = function(){ //when the page is first loaded
    if(!this._rendered){
        this._rendered = true;
        var currentAd = Ads.findOne({_id: Router.current().params._id}) // finds current ad
        var currentSchool = newSchools.findOne({admin: Meteor.userId()}) // finds current school
        var amount = currentSchool.amount; // schools charge 
        var orderDate = new Date();  // date accepted 
        var createdBy = Meteor.userId(); // who accepted the ad 
       // creates a reciept for the order by adding the info to the InsertionOrder collection
        InsertionOrder.insert({
            ad : currentAd,
            school: currentSchool, 
            amount: amount, 
            orderDate: orderDate,
            createdBy: createdBy
        })
        var advertiserCredit = Credits.findOne({user : currentAd.createdBy});
        var schoolCredit = Credits.findOne({user : currentSchool.admin});
        Credits.update({ _id: advertiserCredit._id }, { $set: {amount: (advertiserCredit.amount - amount)} });
        if(schoolCredit){ // if the school as an account for credits update it
        Credits.update({ _id: schoolCredit._id }, { $set: {amount: (schoolCredit.amount + amount )} });
        } else{ // otherwise make the school an account
            Credits.insert({
                 user: Meteor.userId(),
                 amount: amount,
                 charges : []
            })
            
        }
    }
}
