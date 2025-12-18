#📝 Notey AI
Live Demo: https://notey-ai-project.firebaseapp.com/

An AI-integrated note-taking application built with Angular 18 and Firebase. This project demonstrates full-stack capabilities including real-time data streaming, secure authentication, and modern UI state management.

🚀 Technical Challenges & Solutions
1. Secure User Authentication
The Problem: Implementing a robust login system that persists user sessions across refreshes without manual token handling.

The Solution: Integrated Firebase Authentication. This allowed for secure Google/Email sign-on and provided a unique UID for every user, ensuring data privacy between different accounts.

2. Real-time CRUD Operations
The Problem: Managing Create, Read, Update, and Delete operations while keeping the local UI in sync with the database.

The Solution: Leveraged Cloud Firestore. By using Firestore's NoSQL structure, I implemented efficient data models for notes. This moved the app from static data to a persistent, cloud-based backend.

3. Dynamic UI Updates in Angular
The Problem: Encountered issues where the Angular view wouldn't update immediately after asynchronous Firebase operations finished (Change Detection issues).

The Solution: Optimized the rendering cycle using NgZone and ChangeDetectorRef. By explicitly wrapping external Firebase triggers within Angular’s "Zone," I ensured the UI reflects data changes instantly without requiring a page reload.

🛠️ Tech Stack
- Frontend: Angular 18 (Signals, Standalone Components)

- Backend/BaaS: Firebase Auth & Cloud Firestore

- Deployment: Firebase Hosting

- Styling: Tailwind CSS
