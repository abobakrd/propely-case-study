import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp();

exports.addRandomLikeToUpdatedPost = functions.firestore
   .document('posts/{postId}')
   .onCreate((change, context) => {
      functions.logger.log(change);
      return change.ref.set({ likes: Math.round(Math.random() * 10) }, { merge: true });
   });