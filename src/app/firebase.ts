import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';
import { getFirestore } from 'firebase/firestore';


const app = initializeApp(environment.firebase);

export const auth = getAuth(app);


//db firestore instance
export const db = getFirestore(app);