/** firebase  */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAuth, connectAuthEmulator, initializeAuth } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { firebaseConfig } from './firebaseconfig.js';

let config = firebaseConfig;
console.log(window.location.hostnmame);
if (window.location.hostname === "localhost") {
   config = {
      projectId: 'propely-casestudy',
      appId: 'demo-1',
      apiKey: 'demo-1'
   };
}

// Initialize Firebase
const app = initializeApp(config);
// const analytics = getAnalytics(app);
// const storage = getStorage(app);
// const rtdb = getDatabase(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// const auth = getAuth(app);

if (window.location.hostname == 'localhost') {
   // connectAuthEmulator(auth, 'http://localhost:9099');
   connectFirestoreEmulator(db, 'localhost', 8080);
   connectFunctionsEmulator(functions, "localhost", 5001);
}
// export all the things
export {
   app,
   // analytics,
   // storage,
   // rtdb,
   db,
   // auth
};