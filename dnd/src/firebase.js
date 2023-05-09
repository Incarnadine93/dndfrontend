import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCyIwGv3q4q3QDLuYvSItdretoOuD7h2ls",
    authDomain: "dndv2-4c780.firebaseapp.com",
    projectId: "dndv2-4c780",
    storageBucket: "dndv2-4c780.appspot.com",
    messagingSenderId: "788653705111",
    appId: "1:788653705111:web:f7cef72decf1566fcd26d2"
};

export const app = initializeApp(firebaseConfig);

// # REACT_APP_FIREBASE_API_KEY=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY
// # REACT_APP_FIREBASE_AUTH_DOMAIN=dnd-encounter-6b1cc.firebaseapp.com
// # REACT_APP_FIREBASE_PROJECT_ID=dnd-encounter-6b1cc
// # REACT_APP_FIREBASE_STORAGE_BUCKET=dnd-encounter-6b1cc.appspot.com
// # REACT_APP_FIREBASE_MESSAGING_SENDER_ID=155115543659
// # REACT_APP_FIREBASE_APP_ID=1:155115543659:web:66ee044606eeea5743e52e
// # REACT_APP_FIREBASE_DB_URL=https://dnd-encounter-6b1cc-default-rtdb.firebaseio.com