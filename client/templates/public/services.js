// runs on template created
Template.services.onCreated( () => {
  let template = Template.instance();
  template.selectedService  = new ReactiveVar( false );
  template.processing       = new ReactiveVar( false );
// runs when user clicks checkout
  template.checkout = StripeCheckout.configure({
    // all adCub payments go through the stripe payment system. Stripe is PCI DSS compliant ad has SSL and data encryption 
    key: Meteor.settings.public.stripe,
    locale: 'auto',
    token( token ) {
      let service = template.selectedService.get(),
          // set charge
          charge  = {
            amount: token.amount || service.amount,
            currency: token.currency || 'usd',
            source: token.id,
            description: token.description || service.description,
            receipt_email: token.email
          };

      Meteor.call( 'processPayment', charge, ( error, response ) => {
        if ( error ) {
          template.processing.set( false );
          window.alert( error.reason, 'danger' ); // alert if there is an error with the payments
        } else {
          Meteor.call('buyCredit', charge.amount); // charges the account
          window.alert( 'Thanks!', 'success' ); // alerts user of success
        }
      });
    },
    closed() {
      template.processing.set( false ); // the template is no longer processing
    }
  });
});

Template.services.helpers({
  processing() {
    return Template.instance().processing.get();
  },
  paymentSucceeded() {
    return Template.instance().paymentSucceeded.get();
  }
});

Template.services.events({
  // sets evens on the click of each purchese option
  'click [data-service]' ( event, template ) {
    const pricing = {
      'small-package': {
        amount: 100000,
        description: "small"
      },
      'medium-package': {
        amount: 500000,
        description: "medium"
      },
      'large-package': {
        amount: 1000000,
        description: "large"
      }
    };

    let service = pricing[ event.target.dataset.service ];

    template.selectedService.set( service ); // sets the selected services
    template.processing.set( true );

    template.checkout.open({ // checkout
      name: 'adCub credit purchase',
      description: service.description,
      amount: service.amount,
      bitcoin: true
    });
  }
});