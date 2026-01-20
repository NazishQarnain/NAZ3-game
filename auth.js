// Firebase Authentication Module
import { auth, db } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    doc, 
    setDoc, 
    getDoc,
    updateDoc 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Check if user is already logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            localStorage.setItem('currentUser', user.email);
            localStorage.setItem('nazCoins', userData.coins || 200);
            localStorage.setItem('firebaseUID', user.uid);
            
            // If on login page, redirect to games
            if (window.location.pathname.includes('index.html')) {
                window.location.href = 'dice.html';
            }
        }
    }
});

// Login functionality
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('loginUsername').value + '@naz3game.com';
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                localStorage.setItem('currentUser', userData.username);
                localStorage.setItem('nazCoins', userData.coins);
                localStorage.setItem('firebaseUID', user.uid);
                window.location.href = 'dice.html';
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // Auto-register new user
                try {
                    const username = document.getElementById('loginUsername').value;
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    
                    // Create user document in Firestore
                    await setDoc(doc(db, 'users', user.uid), {
                        username: username,
                        email: email,
                        coins: 200,
                        createdAt: new Date().toISOString()
                    });
                    
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('nazCoins', '200');
                    localStorage.setItem('firebaseUID', user.uid);
                    window.location.href = 'dice.html';
                } catch (regError) {
                    alert('Registration failed: ' + regError.message);
                }
            } else {
                alert('Login failed: ' + error.message);
            }
        }
    });
}

// Update coins in Firebase when changed
export async function updateCoins(newBalance) {
    const uid = localStorage.getItem('firebaseUID');
    if (uid) {
        try {
            await updateDoc(doc(db, 'users', uid), {
                coins: newBalance
            });
            localStorage.setItem('nazCoins', newBalance);
        } catch (error) {
            console.error('Failed to update coins:', error);
        }
    }
}

// Logout functionality  
window.logout = async function() {
    try {
        await signOut(auth);
        localStorage.clear();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
};
