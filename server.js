const stripe = require('stripe')('sk_test_ArKPlZUbGKGlrFpMAFNqdUsM');
const express = require('express');
const app = express();
// app.use(express.static('public'));
app.use(express.json())
// const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.get('/d', (req, res, next) => {
  const account = stripe.accounts
    .create({
      type: 'express',
      email: 'checkout4@lisimba.co.uk',
    })
    .then(function (account) {
      console.log(account.id);
      res.send('Hello World!');
    })
    .catch(next);
});

app.get('/c'),
  async (req, res, next) => {
    console.log('test');
    stripe.accounts
      .create({
        type: 'express',
        email: 'checkout4@lisimba.co.uk',
      })
      .then(function (x) {
        console.log(x);
        res.send('Hello World!');
      })
      .catch(next);
  };

app.post('/create-account-onboarding-link', async (req, res) => {
  const { stripeAccountId } = req.body
  const accountLinks = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: 'https://example.com/reauth',
    return_url: 'https://example.com/return',
    type: 'account_onboarding',
  });
  res.json(accountLinks);
});

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    customer: customer.id,
  });
  console.log(paymentIntent);
  console.log(ephemeralKey);
  console.log(customer);

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // TODO: replace this with the `price` of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     payment_method_types: [
//       'card',
//       'bacs_debit',
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url)
// });

app.listen(4242, () => console.log('Running on port 4242'));
