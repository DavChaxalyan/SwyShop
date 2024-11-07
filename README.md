# SwayShop - Online Shopping Platform

SwayShop is an e-commerce web application developed using **React**, **Redux Thunk**, **Express.js**, and **MongoDB**. The platform allows users to explore and purchase products, manage their profiles, and enjoy various features such as language and currency selection.

The entire project is **fully responsive**, ensuring a seamless shopping experience across all devices, including desktops, tablets, and mobile phones.

## Features

### 1. User Authentication
- **Registration and Login**: Users can register and log into their accounts.
- **Email Verification**: A confirmation code is sent to the provided email address, which needs to be entered to complete the registration.
- After logging in, users can:
  - Edit their profiles.
  - Change their passwords.
  - Reset their password via email if forgotten.

### 2. Product Management
- Users can add products to their cart.
- Registered users can:
  - Create, edit, and delete their products.
  - Add products to the cart and save them as favorites for later viewing.

### 3. Order Management
- Users can place orders (payment is not integrated; the process is simulated).
- After 5 minutes, the order is marked as **"delivered"**.
- Users can view their order history.

### 4. Multilingual Support
- The platform supports three languages for the interface:
  - **English**
  - **Russian**
  - **Armenian**

### 5. Multicurrency Support
- Users can select one of the following currencies:
  - **Russian Ruble (RUB)**
  - **US Dollar (USD)**
  - **Armenian Dram (AMD)**

### 6. Cart and Favorites
- Users can add products to their cart and save them for later viewing.
- Favorite products can be saved for future purchases.

### 7. Product Viewing
- Products are grouped by categories for easy browsing.
- Users can search products by:
  - Name
  - Category
  - Price

### 8. Profile Editing
Users can edit their profile, change their name, or update their profile picture.

## Installation

### Requirements
- **Node.js**
- **MongoDB**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/DavChaxalyan/SwyShop.git
    cd SwayShop
    ```

2. Install dependencies for both **frontend** and **backend**:

    **Frontend:**
    ```bash
    cd frontend
    npm install --legacy-peer-deps
    ```

    **Backend:**
    ```bash
    cd ../backend
    npm install
    ```
## Setup `.env` File

To run the backend server, you need to create a `.env` file in the root directory of your `backend` folder. Add the following variables to the file:

```plaintext
MONGODB_URI=your_mongoDB_URL  // example` mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS="your_email_app_password"
```

## Running the Application

### Backend

1. **Start MongoDB**:
    ```bash
    mongod
    ```

2. **Start the backend server**:
    ```bash
    cd backend
    node src/server.js
    ```

### Frontend

1. **Start the frontend server**:
    ```bash
    cd frontend
    npm run start
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### User Registration and Login
To access all features, you need to **create an account** or **log into** an existing one.  
After logging in, users will have full access to:
- Creating and managing products.
- Adding products to the cart.
- Placing orders.

### Creating and Managing Products
Users can:
- **Create** and **edit** their products.
- **Add** them to the cart or save them as **favorites** for future use.

### Language and Currency
You can switch the interface to one of the following languages:
- **English**
- **Russian**
- **Armenian**

You can also select one of the following currencies:
- **RUB** (Russian Ruble)
- **USD** (US Dollar)
- **AMD** (Armenian Dram)

### Placing Orders
You can:
- Place an order and view your **order history**.
- Orders will be marked as **"delivered"** after 5 minutes.

---

## Notes
- **SwayShop** is designed to provide a **complete online shopping experience** with features like product management, multilingual and multicurrency support, and a full order processing system.
- The platform is **fully responsive**, ensuring a seamless shopping experience on all devices (desktop, tablet, mobile).
- To experience all features, it's recommended to create **two accounts**. This way, you can add a product from one account and make a purchase from the other.
- 
