import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/alanning:roles'
import './schoolAcceptOrder.html';

Template.schoolAcceptOrder.rendered = function(){
    if(!this._rendered){
        this._rendered = true; 
        var currentAd = Ads.findOne({_id: Router.current().params._id})
        var currentSchool = newSchools.findOne({admin: Meteor.userId()})
        var amount = currentSchool.amount;
        var orderDate = new Date(); 
        var createdBy = Meteor.userId(); 
        console.log("template onload" );
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
        if(schoolCredit){
        Credits.update({ _id: schoolCredit._id }, { $set: {amount: (schoolCredit.amount + amount )} });
        } else{
            Credits.insert({
                 user: Meteor.userId(),
                 amount: amount,
                 charges : []
            })
            
        }
        var school  = newSchools.findOne({admin: Meteor.userId()})
        var adsCurrentRunning = currentAd.schoolsRunning
        adsCurrentRunning.push(currentAd)
        var schoolCurrentRunning = school.runningAds
        schoolCurrentRunning.push(Meteor.userId())
        newSchools.update({ _id: school._id }, { $set: {runningAds: adsCurrentRunning}});
        Ads.update({ _id: currentAd._id }, { $set: {schoolsRunning: schoolCurrentRunning}});
        Credits.update({ _id: advertiserCredit._id }, { $set: {charges:{ school : school.schoolName}} });
    }
}
