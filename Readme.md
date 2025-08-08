# Abhi ram dathu and backend 

backend with javascript
- [Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

🧠 Backend Service – Node.js | Express | MongoDB
A scalable backend API built using Node.js, Express, and MongoDB. This project includes robust user authentication, playlist management, video handling, like/dislike features, comment threading, and tweet-based interaction features. It follows modular structure and uses industry best practices.


🚀 Features: 
🔐 User Authentication (Register, Login)

🎬 Video Management (upload, update, delete)

📃 Comment System (on videos, tweets)

❤️ Like/Dislike Mechanism (for videos, tweets, and comments)

🧾 Playlist System (create, update, delete playlists)

🐦 Tweet Feature (post tweet, get tweets)

📦 Modular MVC Architecture

✅ Request validation and error handling



📁 Project Structure
/src
  /controllers   -> Route logic (e.g., user, playlist, video)
  /models        -> Mongoose schemas
  /routes        -> Route definitions
  /middlewares   -> Auth, error handling
  /utils         -> Helper functions
  /config        -> Database and env config
/public/temp     -> Temporary file storage (e.g., video/image uploads)



🔧 Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB + Mongoose

Authentication: JWT (JSON Web Token)

Validation: Joi / custom logic

Tooling: Prettier, Git, ESLint 


📦 Installation:
  git clone https://github.com/AbhiRamDathu/backend-prjt.git
cd backend-prjt

Install dependencies:
 npm install

Setup environment variables:
 cp .env.sample .env

Run the server:
 npm run dev
 

🔌 API Endpoints (Sample)
Method	   Endpoint              Description
POST	 /api/v1/register	         Register user
POST	 /api/v1/login	           Login user
POST	 /api/v1/video	           Upload video
GET	  /api/v1/playlist/:id       Get playlist by ID
POST /api/v1/like/:entityId	     Like video/tweet/comment

Full API docs coming soon...


🧪 Testing
Unit and integration tests with Abhi ram dathu + Mocha are under development.

📎 Useful Links:
- [📁 Models Directory](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/models)  
- [🧠 Controllers Directory](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/controllers)  
- [🔗 API Routes](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/routes)  
- [⚙️ Middleware (Auth, Error)](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/middlewares)  
- [🧰 Utils Folder](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/utils)  
- [🔧 Config Folder](https://github.com/AbhiRamDathu/backend-prjt/tree/main/src/config)  
- [📄 README (This File)](https://github.com/AbhiRamDathu/backend-prjt/blob/main/README.md)  
- [🚀 Live API (if hosted)](https://your-deployment-url.com)  
- [🧪 Postman Collection (optional)](https://www.postman.com/your-workspace/collection-link)


👨‍💻 Author
Abhi Ram Dathu
🚀 Passionate full-stack developer on a self-taught journey.

## 📜 License: 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project for personal or commercial purposes with proper credit.

© 2025 Abhi Ram Dathu








