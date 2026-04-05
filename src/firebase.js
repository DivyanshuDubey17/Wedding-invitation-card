import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  )
}

let app = null
let db = null

if (isFirebaseConfigured()) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  db = getFirestore(app)
}

/** True when env vars loaded and Firestore is initialised (submits will persist). */
export function isFirestoreReady() {
  return db !== null
}

export { db }
