Template.services.onCreated( () => {
  let template = Template.instance();

  template.selectedService  = new ReactiveVar( false );
  template.processing       = new ReactiveVar( false );

  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
   // image: 'https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png',
    locale: 'auto',
    token( token ) {
      let service = template.selectedService.get(),
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
          window.alert( error.reason, 'danger' );
        } else {
          Meteor.call('buyCredit', charge.amount);
          window.alert( 'Thanks!', 'success' );
        }
      });
    },
    closed() {
      template.processing.set( false );
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

    template.selectedService.set( service );
    template.processing.set( true );

    template.checkout.open({
      name: 'adCub credit purchase',
      description: service.description,
      amount: service.amount,
      bitcoin: true
    });
  }
});