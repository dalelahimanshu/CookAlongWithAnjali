# Cook With Anjali Website (Free Setup)

This project is built to stay fully free to run.

Features:
- Public free content for all visitors
- Login with multiple methods (Google, Facebook, Email/Password)
- Free membership unlock (no payment)
- Premium content section for free members
- Latest recipe carousel
- Top 3 YouTube videos by current view count

## Stack (No Cost)
- Static frontend: HTML/CSS/JS on GitHub Pages (free)
- Login: Firebase Auth (Spark free tier)
- Video stats: YouTube Data API v3 (free quota)

## How Membership Works
- User logs in.
- User clicks **Join Free Membership**.
- Membership is stored in browser `localStorage` for that logged-in user ID.
- Premium section is shown for that member.

Note: This is free and simple. Since it is client-side storage, it is not a secure paid wall.

## Project Files
- `index.html`: Main page
- `styles.css`: Styling
- `app.js`: UI, auth, free membership logic, YouTube fetching
- `config.js`: API/project config
- `config.example.js`: Same structure as reference

## Setup
1. Create Firebase project.
2. Enable Firebase Authentication providers:
   - Google
   - Facebook
   - Email/Password
3. Create a YouTube Data API key and get your channel ID.
4. Fill all values in `config.js`.

## How to Run Locally
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080`.

## Deploy to GitHub Pages
1. Push this project to your GitHub repo.
2. In GitHub repo settings, open **Pages**.
3. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Your site URL will be:
   - `https://<your-username>.github.io/<repo-name>/`
