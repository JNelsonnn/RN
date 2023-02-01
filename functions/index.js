const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const stripe = require("stripe")("sk_test_ArKPlZUbGKGlrFpMAFNqdUsM");

exports.addLive = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new live into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore()
      .collection("lives")
      .add({original: original});
  // Send back a live that we've successfully written the live
  res.json({result: `Live with ID: ${writeResult.id} added.`});
});

exports.listLives = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return {message: "Authentication Required!", code: 401};
  }
  console.log(data);
  console.log(context.auth.uid);
  return admin.firestore().collection("lives").get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
});

// exports.listLives = functions.https.onRequest(async (req, res) => {
//   // Push the new live into Firestore using the Firebase Admin SDK.
//   const lives = await admin.firestore().collection('lives').get()
//     .then(snapshot => {
//       let arrayR = snapshot.docs.map(doc => {
//         return {id: doc.id, data: doc.data()};
//       });
//       res.json(arrayR);
//     })
// });

// Listens for new lives added to /lives/:documentId/original and creates an
// uppercase version of the live to /lives/:documentId/uppercase
exports.makeUppercase = functions.firestore.document("/lives/{documentId}")
    .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks
      // inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });

// https://firebase.google.com/docs/functions/schedule-functions
// exports.scheduledFunctionCrontab = functions.pubsub.schedule("0 9 * * *")
//     .timeZone("Europe/London")
//     .onRun((context) => {
//       console.log("This will be run every day at 9 AM Eastern!");
//       return null;
//     });

// Create stripe account and customer on sign up.
exports.createStripeAccountAndCustomer = functions.auth.user()
    .onCreate(async (user) => {
      const {uid, email} = user;
      const account = await stripe.accounts.create({
        type: "express",
        email: email,
      });
      const customer = await stripe.customers.create({email: email});

      return admin.firestore()
          .collection("profiles")
          .doc(uid)
          .set({
            stripeAccountId: account.id,
            stripeCustomerId: customer.id,
          })
          .then((response) => {
            console.log("Profile updated!");
            console.log(response);
          });
    });

exports.createUserMediaMetadata = functions.storage.object()
    .onFinalize(async (object, context) => {
      const functions = require("firebase-functions");
      functions.logger.log("object:", object);
      functions.logger.log("context:", context);
    });
