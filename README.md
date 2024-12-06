# Vendor E-Commerce Platform

An advanced e-commerce platform designed to empower vendors to showcase their products and customers to browse and purchase with ease. This project features dynamic role-based user management, seamless image handling, and a robust backend infrastructure.

---

## Features

### 🌟 **User Roles**

- **Customer**
  - Browse and purchase products.
  - Manage profile and view order history.
- **Vendor**
  - Register and manage products.
  - Monitor sales and product performance.
- **Admin**
  - Directly created in the database for enhanced security.
  - Oversee platform activities and manage users/products.

### 🛠️ **Core Functionalities**

- **Dynamic Registration Forms**
  - Separate signups for customer and vendor roles.
  - Vendors include both user and vendor-specific details.
- **Role-Based Access Control**
  - Default role is Customer; vendors are set via frontend.
- **Cloudinary Image Uploads**
  - Optimized image storage and delivery via Cloudinary.
  - Middleware restricts uploads (e.g., `profileImage`).
- **Responsive Frontend**
  - User-friendly design for all devices.
- **Powerful Backend**
  - Built with Node.js and Express, using MongoDB for data storage.

---

## Tech Stack

### ⚙️ **Frontend**

- **Framework**: React / Next.js
- **Styling**: Tailwind CSS, CSS Modules, or Custom Styling
- **API Communication**: Axios

### ⚙️ **Backend**

- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **File Uploads**: Cloudinary for image storage
- **Authentication**: JWT for role-based access control

### 🧰 **Tools and Libraries**

- **Toast Notifications**: React Hot Toast for error/success handling.
- **Environment Management**: dotenv for secure API keys.
- **Version Control**: Git & GitHub for collaborative development.

---

## Project Structure

vendor-ecommerce/ ├── frontend/ │ ├── src/ │ ├── public/ │ ├── package.json │ └── ... ├── backend/ │ ├── src/ │ │ ├── models/ │ │ ├── controllers/ │ │ ├── middlewares/ │ │ ├── routes/ │ │ ├── utils/ │ │ └── ... │ ├── package.json │ ├── .env │ └── ... ├── .gitignore ├── README.md └── ...

yaml
Copy code

---

## Installation

### 🚀 **Prerequisites**

- Node.js
- MongoDB
- Cloudinary account for image uploads

### 📋 **Setup Instructions**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vendor-ecommerce.git
   cd vendor-ecommerce
   Install dependencies for both frontend and backend
   ```

bash
Copy code

# Install frontend dependencies

cd frontend
npm install

# Install backend dependencies

cd ../backend
npm install
Configure environment variables
Create a .env file in the backend folder with the following configuration:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the application

Frontend:
bash
Copy code
cd frontend
npm start
Backend:
bash
Copy code
cd backend
npm run dev
Access the app

Frontend: http://localhost:3000
Backend: http://localhost:5000
🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

📝 License
This project is licensed under the MIT License.
