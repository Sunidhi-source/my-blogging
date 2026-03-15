**🖋️ Ink & Imagination**
A High-Performance MERN Stack Blogging PlatformInk & Imagination is a full-stack web application designed for creators. It combines a sophisticated writing experience with a robust administrative backend, allowing for seamless content management and audience insights.

**🚀 Live Demo**
deploying

## 📸 Project Previews 

| **Main Landing Page** | **Admin Dashboard** |
| :---: | :---: |
| ![Hero](./screenshots/hero.png) | ![Admin](./screenshots/admin.png) |

| **Latest Articles (Live Data)** |
| :---: |
| ![Articles](./screenshots/articles.png) |

**✨ Key Features**
Rich Text Editor: Integrated CKEditor 5 to provide a professional writing interface for authors.Administrative Suite: A dedicated dashboard for monitoring user growth and content statistics.
Full CRUD Operations: Comprehensive API for Creating, Reading, Updating, and Deleting blog posts.Category Management: Dynamic filtering of articles by topic.
Responsive UI: Fully optimized for mobile, tablet, and desktop viewing.

**🛠️ Tech Stack**
Frontend: React.js, Vite, Axios, Bootstrap CSS
Backend: Node.js, Express.js
Database: MongoDB Atlas (Mongoose ODM)
Security: JWT Authentication, Bcrypt Password Hashing, Dotenv

**⚙️ Installation & Setup**
1. Ensure you have Node.js and npm installed on your machine.
2. Clone the Repository git clone https://github.com/Sunidhi-source/my-blogging.git
cd my-blogging
3. Backend Configuration
cd backend
npm install
# Setup .env file (see Environment Variables section below)
npm start
nodemon index
4. Frontend Configuration
cd ../frontend
npm install --legacy-peer-deps
# Setup .env file
npm run dev

**🔐 Environment Variables**
To run this project locally, create a .env file in both the frontend and backend directories.Backend (/backend/.env)
PORT=3000
SALT=10
EMAIL= email id
PASSWORD= password
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog
JWT_SECRET=your_secret_key_here

Frontend (/frontend/.env)
VITE_API_URL=http://localhost:3000
VITE_IMAGE_SRC=http://localhost:3000/public/

**📜 Professional Highlights**
This project demonstrates proficiency in:
State Management: Handling complex UI states across the MERN stack.
API Architecture: Building RESTful services with structured error handling.
Database Design: Implementing schema-based data modeling with Mongoose.
Frontend Integration: Seamlessly connecting React hooks with Axios for real-time data fetching.
