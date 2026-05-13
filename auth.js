import { auth, db } from './firebase-config.js';
import {
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import {
  doc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

export function watchAuth(onUserReady, onLoggedOut) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('nazCoins');
      localStorage.removeItem('firebaseUID');

      if (typeof onLoggedOut === 'function') {
        onLoggedOut();
      }
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await signOut(auth);
        if (typeof onLoggedOut === 'function') {
          onLoggedOut();
        }
        return;
      }

      const data = snap.data();
      const userData = {
        uid: user.uid,
        username: data.username || user.email.split('@')[0],
        coins: data.coins ?? 100
      };

      localStorage.setItem('currentUser', userData.username);
      localStorage.setItem('nazCoins', String(userData.coins));
      localStorage.setItem('firebaseUID', user.uid);

      if (typeof onUserReady === 'function') {
        onUserReady(userData, userRef);
      }
    } catch (e) {
      console.error('Auth helper error:', e);
      if (typeof onLoggedOut === 'function') {
        onLoggedOut();
      }
    }
  });
}

export async function appLogout() {
  await signOut(auth);
  localStorage.removeItem('currentUser');
  localStorage.removeItem('nazCoins');
  localStorage.removeItem('firebaseUID');
}
