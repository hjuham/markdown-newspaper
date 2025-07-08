# 📰 Markdown Newspaper

A full-stack MERN (MongoDB, Express.js, React, Node.js) application. Admin user can write, preview, edit and delete articles written in **Markdown** format. Regular users can read articles based on their set interests.

## 🌟 Features

- User registration and login
- Write, save, edit, and delete Markdown articles
- Markdown preview
- RESTful API with Express & Node
- MongoDB for data storage
- Dockerized for streamlined deployment

## 🧰 Tech Stack

- **Frontend**: React, React Markdown, Material UI
- **Backend**: Node.js, Express.js, Passport
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hjuham/markdown-newspaper.git
cd markdown-newspaper
```

### 2. Create Environment Variables

Create `.env` file in the root of the project

```
PORT=5001
ADMIN_EMAIL=*insert email for admin user*
ADMIN_PASSWORD=*insert password for admin user*
SESSION_SECRET=*insert a secret for session*
MONGO_URI_DEVELOPMENT=*insert a development database URI*
# Use a local dockerized database for production
MONGO_URI_PRODUCTION="mongodb://mongo:27017/mydatabase"
```

### 3. Run the production build

`docker-compose up --build`

Open the website at http://localhost:3000/

### 4. Local Development (Without Docker)

**Backend**

```bash
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Open the website at http://localhost:5173

**Database**  
Either run the database locally or deploy a database on MongoDB Atlas https://www.mongodb.com/ (remember to add the URI to `.env`)
