[IMS System](https://github.com/ioNihal/sims-dashboard-front)
[Backend Code](https://github.com/S488U/ims)

# SIMS - Customer Portal

## Overview

This project is the **Customer Portal** of the **Smart Inventory Management System (SIMS)** built using **React** and **Vite**. It enables customers to browse products, place orders, view invoices, and manage their profiles — all in a streamlined, responsive interface. The portal interacts with the backend inventory system for real-time data.

## Features

* **Product Listing**: Display available inventory items with search and filter support.
* **Cart System**: Add/remove items, view total cost, and checkout with ease.
* **Order Management**: View all placed orders with statuses and details.
* **Invoice Handling**: View, and download invoices in PDF format.
* **User Authentication**: Secure login and session handling.
* **Profile Settings**: View profile and preferences.
* **Feedback System**: Submit feedback.
* **Responsive UI**: Optimized for both desktop and mobile devices.
* **Theming Support**: Switch between light/dark themes using context API.

## Tech Stack

* **React** – Core framework for UI
* **React Icons** – Icon set for UI enhancement
* **React Toastify / Hot Toast** – Toast notifications
* **JSPDF** – To generate downloadable invoice PDFs

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sims-customer-portal.git
   cd sims-customer-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` file in the root directory and add your API base URL:

   ```env
   VITE_API_BASE_URL=https://your-api-url.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview the production build**

   ```bash
   npm run preview
   ```

## Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## License

This project is licensed under the MIT License.
