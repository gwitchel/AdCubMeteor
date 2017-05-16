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
        Ads.update({ _id: currentAd }, { $set: {name: name} });
        Ads.update({ _id: currentAd }, { $set: {timeFrame: SD + " - " + ED} });
        Ads.update({ _id: currentAd }, { $set: {amountPerAd: price} })
        Ads.update({ _id: currentAd }, { $set: {totalAmount: totalAmount} })
        Ads.update({ _id: currentAd }, { $set: {location: location} })
        Ads.update({ _id: currentAd }, { $set: {email: email} })

    }
})