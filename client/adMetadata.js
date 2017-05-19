import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adMetadata.html';

Template.adMetadata.events({
    'submit form': function(i){
        var currentAd = Session.get("currentAd");
        //var currentAd = Ads.find({_id : currentAd}).fetch();
        var name = $("#name").val();
        var SD = $("#startDate").val();
        var ED = $("#endDate").val();
        var price = $("#adPrice").val();
        var location = $("#location").val();
        var totalAmount = $("#totalAmount").val();
        var email = $("#email").val();
        var budget = Credits.find({user: Meteor.userId()}).fetch()
        budget = budget[0].amount 
        console.log(budget);
        if ((budget - totalAmount) < 0){
            window.alert("uh-oh, it looks like you do not have enough credits to purchase this ad. Please buy more credits and try again")
        } else {
            var newBudget = budget-totalAmount;
            budget = Credits.find({user: Meteor.userId()}).fetch()
            var userAdmin = budget[0]._id
            Credits.update({_id : userAdmin }, { $set: {amount: newBudget} }); 
        }
        Ads.update({ _id: currentAd }, { $set: {name: name} });
        Ads.update({ _id: currentAd }, { $set: {timeFrame: SD + " - " + ED} });
        Ads.update({ _id: currentAd }, { $set: {amountPerAd: price} })
        Ads.update({ _id: currentAd }, { $set: {totalAmount: totalAmount} })
        Ads.update({ _id: currentAd }, { $set: {location: location} })
        Ads.update({ _id: currentAd }, { $set: {email: email} })
        Router.go("reviewAdRequests")
    }
})