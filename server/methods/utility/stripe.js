let Stripe = StripeAPI( Meteor.settings.private.stripe );

Meteor.methods({
  processPayment( charge ) {
    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String,
    });


    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
        payment      = handleCharge( charge );

    return payment;
  },
  buyCredit(amount){
   var credit = Credits.find({user : Meteor.userId()}).fetch(); 
   Meteor._debug(credit);
    if(credit.length > 0){
      var newAmount = credit[0].amount + amount;
      Credits.update({ user: Meteor.userId() }, { $set: {amount: newAmount} });
    } else {
      Credits.insert({
        user: Meteor.userId(),
        amount: amount,
        charges : []
      })
    }
  }
});