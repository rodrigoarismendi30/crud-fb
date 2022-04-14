
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCE3U0hedlfGiPB_P2nKSVOaqNwdRgiqRY",
  authDomain: "crud-fire-react-8087c.firebaseapp.com",
  projectId: "crud-fire-react-8087c",
  storageBucket: "crud-fire-react-8087c.appspot.com",
  messagingSenderId: "690120832438",
  appId: "1:690120832438:web:c11f2bf775e93efb12bd17"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)