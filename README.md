
# To-Do Web Application

## 🚀 Project Overview
This is a full-stack To-Do Web Application built to enhance productivity by allowing users to manage tasks efficiently. It integrates multiple modern technologies to provide a feature-rich and secure user experience.  

The project can be run locally using:

```bash
npm start
````

---

## 🧩 Tech Stack

### Frontend

* **React** – For building a dynamic, component-based UI
* **Redux** – For global state management
* **Redux Thunk** – To handle asynchronous operations
* **Tailwind CSS** – Utility-first CSS framework for responsive design

### Backend

* **Node.js & Express.js** – RESTful API development
* **MongoDB** – NoSQL database for storing user and task data

### Security

* **JWT (JSON Web Tokens)** – For authentication and route protection
* **Password Hashing** – Ensures secure storage of user credentials
* **Protected Routes** – Only authorized users can access certain resources

---

## 📌 Key Features

### User Authentication

* Secure user registration and login
* JWT-based authentication for session management
* Passwords hashed before storage
* Protected routes accessible only by authenticated users

### Task Management

* Add, view, update, and delete tasks
* Tasks searchable by title or description

### Calendar Integration

* Tasks are organized on a calendar view by date
* Easy visualization of deadlines and task schedules

### User Personalization

* Upload profile images and custom cover photos
* Add and display personal motivational quotes

### Search Functionality

* Keyword-based task filtering for quick access to tasks

### Session Handling

* Secure logout that clears JWT tokens and prevents unauthorized access

---

## 🛠 Installation & Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd todo-web-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

4. **Run the application**

```bash
npm start
```

The frontend will be served on `http://localhost:3000` and the backend API will run on the specified `PORT`.

---

## 💻 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/FeatureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚡ Contact

For questions or suggestions, feel free to reach out:

* GitHub: [saraniz](https://github.com/saraniz)

---

Made with ❤️ using React, Express, MongoDB, and Redux

