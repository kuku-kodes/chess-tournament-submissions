# ♟️ Chess Tournament Management System

A modern and responsive **Chess Tournament Management System** built with **Svelte + JavaScript**, designed to simplify tournament organization by providing player management, tournament management, automated match generation, and ranking calculation.

This project demonstrates clean architecture, modular component design, reusable code, and efficient state management while following modern frontend development practices.

---

# 📸 Application Screenshots

> **Note:** Replace the placeholders below with actual screenshots after completing the project.

---

## 🏠 Dashboard

Displays an overview of the application, quick statistics, and navigation to different modules.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.34.39 AM.png" alt="Dashboard" width="900">
</p>

---

## 👤 Player Management

Create, view, update, and delete player information.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.36.14 AM.png" alt="Player Management" width="900">
</p>

---

## 🏆 Tournament Management

Manage tournaments and register players.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.34.50 AM.png" alt="Tournament Management" width="900">
</p>

---

## ➕ Add Players to Tournament

Assign registered players to a selected tournament.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.48.05 AM.png" alt="Add Players" width="900">
</p>

---

## ♟️ Match Generation

Automatically generate random player pairings and match results.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.36.41 AM.png" alt="Match Generation" width="900">
</p>

---

## 🥇 Tournament Rankings

Displays the final leaderboard with the top-ranked players.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.35.57 AM.png" alt="Tournament Rankings" width="900">
</p>

---

## 📱 Responsive Design

Desktop, Tablet, and Mobile views.

<p align="center">
  <img src="./src/assets/Screenshot 2026-07-29 at 1.35.08 AM.png" alt="Responsive Design" width="900">
</p>

---

## 🚀 Features

### 👤 Player Management
- Create new players
- View all registered players
- Update player information
- Delete players
- Search and manage player records

---

### 🏆 Tournament Management
- Create tournaments
- Update tournament details
- Delete tournaments
- Register players into tournaments
- View tournament information

---

### ♟️ Match Generation
- Randomly pair tournament players
- Automatically generate matches
- Randomly determine winners (assignment requirement)
- Save match history

---

### 🥇 Rankings
- Calculate tournament rankings
- Display Top 3 Players
- Show complete leaderboard
- Rank players based on match victories

---

## 🏗️ Project Architecture

```
                     Chess Tournament Management
                                  │
      ┌───────────────────────────┼───────────────────────────┐
      │                           │                           │
  Player Module            Tournament Module            Match Module
      │                           │                           │
      └──────────────┬────────────┴─────────────┬─────────────┘
                     │                          │
              Ranking System             Local Storage
```

---

# 📂 Project Structure

```
chess-tournament-management
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── players/
│   │   ├── tournaments/
│   │   ├── matches/
│   │   └── rankings/
│   │
│   ├── pages/
│   │   ├── Dashboard.svelte
│   │   ├── Players.svelte
│   │   ├── Tournaments.svelte
│   │   ├── Matches.svelte
│   │   └── Rankings.svelte
│   │
│   ├── services/
│   │
│   ├── stores/
│   │
│   ├── utils/
│   │
│   ├── App.svelte
│   └── main.js
│
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Svelte** | Frontend Framework |
| **JavaScript (ES6+)** | Application Logic |
| **Vite** | Build Tool |
| **Svelte Stores** | State Management |
| **CSS3** | Styling |
| **Local Storage** | Data Persistence |

---

# 🎯 Application Workflow

```
Dashboard
     │
     ▼
Create Players
     │
     ▼
Create Tournament
     │
     ▼
Register Players
     │
     ▼
Generate Random Matches
     │
     ▼
Store Match Results
     │
     ▼
Calculate Rankings
     │
     ▼
Display Top 3 Players
```

---

# 💡 Design Principles

This project was developed following modern frontend engineering principles:

- Component-Based Architecture
- Reusable UI Components
- Single Responsibility Principle (SRP)
- Separation of Concerns
- DRY (Don't Repeat Yourself)
- Modular Folder Structure
- Clean Code Practices

---

# 📦 Core Modules

## 👤 Player Module

Responsible for:

- Registering players
- Updating player information
- Deleting players
- Listing all registered players

---

## 🏆 Tournament Module

Responsible for:

- Creating tournaments
- Editing tournaments
- Deleting tournaments
- Managing tournament details
- Registering players

---

## ♟️ Match Module

Responsible for:

- Random player pairing
- Match generation
- Winner selection
- Match history

---

## 🥇 Ranking Module

Responsible for:

- Calculating player rankings
- Displaying Top 3 winners
- Leaderboard generation

---

# 📊 Data Models

### Player

```javascript
{
  id,
  name,
  email,
  age,
  city,
  rating
}
```

### Tournament

```javascript
{
  id,
  name,
  location,
  startDate,
  endDate,
  players:[]
}
```

### Match

```javascript
{
  id,
  tournamentId,
  playerOne,
  playerTwo,
  winner,
  playedAt
}
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/chess-tournament-management.git
```

Navigate to the project

```bash
cd chess-tournament-management
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🧪 Features Demonstrated

- CRUD Operations
- Component Reusability
- State Management
- Random Match Algorithm
- Ranking Algorithm
- Responsive UI
- Local Data Persistence
- Modular Architecture

---

# 🎨 Future Enhancements

- Swiss Tournament Format
- Round Robin Tournament
- Single Elimination
- Double Elimination
- Player Ratings (ELO)
- Authentication & Authorization
- Dark Mode
- Tournament Analytics
- PDF Export
- Search & Filtering
- Cloud Database Integration

---

# 📚 Learning Outcomes

This project helped strengthen my understanding of:

- Svelte Fundamentals
- Component-Based Development
- State Management using Svelte Stores
- JavaScript ES6+
- Frontend Architecture
- Application Design
- Modular Code Organization
- CRUD Operations
- Business Logic Implementation
- Responsive Web Development

---

# 📸 Screenshots

> Add screenshots after completing the project.

- Dashboard
- Players
- Tournament Management
- Match Generation
- Rankings

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome.

Feel free to fork the repository and create a pull request.

---

# 👨‍💻 Author

**Kaushlendra Kumar Verma**

- 💼 Full Stack Developer
- ⚙️ Go Backend Developer
- 🤖 AI & Agentic AI 

Email: kaushlendrakumarverma46@gmail.com
Phone no: 9511070782

Project website link: https://chess-tournament-submissions.onrender.com

GitHub: https://github.com/kuku-kodes

---

# ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.

---

## 📄 License

This project was developed for educational purposes and technical assessment.