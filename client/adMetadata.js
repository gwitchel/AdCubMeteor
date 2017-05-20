// imports collections from Mongo
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// imports html page
import './adMetadata.html';

Template.adMetadata.events({
    // submit form event for advertisers
    'submit form': function(i){
        var currentAd = Session.get("currentAd"); // gets current add that user is working on
       // sets variables from inputs boxes in HTML
        var name = $("#name").val();
        var SD = $("#startDate").val();
        var ED = $("#endDate").val();
        var price = $("#adPrice").val();
        var location = $("#location").val();
        var totalAmount = $("#totalAmount").val();
        var email = $("#email").val();
        var budget = Credits.find({user: Meteor.userId()}).fetch() // current user credits
        budget = budget[0].amount 
        // checks to see if user can afford ad
        if ((budget - totalAmount) < 0){
            window.alert("uh-oh, it looks like you do not have enough credits to purchase this ad. Please buy more credits and try again")
        } else {
            // subtracts the cost of the current ad from the useres budget
            var newBudget = budget-totalAmount;
            budget = Credits.find({user: Meteor.userId()}).fetch()
            var userAdmin = budget[0]._id
            Credits.update({_id : userAdmin }, { $set: {amount: newBudget} }); 
        }
        // updates the current ad to contain the information specified in the HTML (name timeframe etc.)
        Ads.update({ _id: currentAd }, { $set: {name: name} });
        Ads.update({ _id: currentAd }, { $set: {timeFrame: SD + " - " + ED} });
        Ads.update({ _id: currentAd }, { $set: {amountPerAd: price} })
        Ads.update({ _id: currentAd }, { $set: {totalAmount: totalAmount} })
        Ads.update({ _id: currentAd }, { $set: {location: location} })
        Ads.update({ _id: currentAd }, { $set: {email: email} })
        Router.go("reviewAdRequests") // sends the user to the review ads page
    }
})