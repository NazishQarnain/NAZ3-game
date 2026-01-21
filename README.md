# NAZ3-game 🎮

A modern gaming platform with Firebase authentication and real-time coin management system. Register, play games, and earn NAZ coins!

## 🌐 Live Demo

**Play Now:** [https://nazishqarnain.github.io/NAZ3-game/](https://nazishqarnain.github.io/NAZ3-game/)

## ✨ Features

- **Firebase Authentication** - Secure user registration and login
- **Real-time Coin System** - NAZ coins stored in Cloud Firestore
- **4 Exciting Games** - Multiple ways to win coins
- **Responsive Design** - Works on desktop and mobile
- **Persistent Data** - Your coins and progress are always saved

## 🎲 Available Games

### 1. Dice Roll 🎲
- **Bet:** 10 NAZ coins
- **Win Condition:** Roll 4 or higher
- **Reward:** +30 NAZ coins

### 2. Coin Flip 🪙
- **Bet:** 5 NAZ coins
- **Win Condition:** Heads
- **Reward:** +15 NAZ coins

### 3. Lucky Number 🍀
- **Bet:** 20 NAZ coins
- **Win Condition:** 30% chance
- **Reward:** +60 NAZ coins

### 4. Tri-Color Wheel 🇮🇳
- **Bet:** 15 NAZ coins
- **Win Condition:** Match the wheel color
- **Reward:** +30 NAZ coins

## 🚀 Getting Started

1. Visit the [live site](https://nazishqarnain.github.io/NAZ3-game/)
2. Click "Register here" to create a new account
3. Enter your email, username, and password
4. Start with 100 NAZ coins
5. Choose a game and start playing!

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Firebase
  - Authentication (Email/Password)
  - Cloud Firestore (Database)
- **Hosting:** GitHub Pages

## 📁 Project Structure

```
NAZ3-game/
├── index.html          # Landing page with login/register
├── dice.html           # Dice roll game
├── coin.html           # Coin flip game
├── lucky.html          # Lucky number game
├── tricolor.html       # Tri-color wheel game
├── auth.js             # Firebase authentication logic
├── firebase-config.js  # Firebase configuration
└── README.md           # This file
```

## 🔧 Firebase Setup

The app uses Firebase for authentication and data storage:

1. **Authentication:** Email/Password sign-in
2. **Firestore Structure:**
   ```
   users/
     └── {userId}/
           ├── username: string
           ├── email: string
           └── coins: number
   ```

## 🎯 How It Works

1. **Registration:** New users are created in Firebase Auth and a Firestore document with 100 starting coins
2. **Login:** Users authenticate via Firebase and are redirected to the dice game
3. **Gaming:** Each game deducts the bet amount, runs the game logic, and updates coins in Firestore
4. **Persistence:** All coin balances sync with Firestore in real-time

## 🔒 Security

- Passwords are securely handled by Firebase Authentication
- User data is protected with Firebase security rules
- All game logic validates sufficient coin balance before playing

## 📱 Responsive Design

- Mobile-friendly interface
- Touch-enabled game controls
- Optimized for all screen sizes

## 🤝 Contributing

Feel free to fork this repository and submit pull requests!

## 📄 License

This project is open source and available for educational purposes.

---

**Created by NazishQarnain** | [GitHub Profile](https://github.com/NazishQarnain)
