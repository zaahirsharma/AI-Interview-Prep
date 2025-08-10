
import { initializeApp, getApp,  getApps} from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBeSV5iU3cYJL-raKE7CF39bhpPtWJLONo",
    authDomain: "synapse-7e443.firebaseapp.com",
    projectId: "synapse-7e443",
    storageBucket: "synapse-7e443.firebasestorage.app",
    messagingSenderId: "35140026574",
    appId: "1:35140026574:web:829675528dd8f7272e909f",
    measurementId: "G-3K40YFS050"
};

// Check if initialized already
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);