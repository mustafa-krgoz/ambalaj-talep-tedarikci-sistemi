# 📦 Packaging Request & Supplier Matching System (Paketera)

This is a full-stack web application that allows **customers to create packaging requests** and enables **suppliers to view and respond** to those requests.

## 🌐 Live Preview
> ⚠️ Currently running locally. Deployment link will be added soon.

---

## 🛠️ Technologies Used

### 🔙 Backend (NestJS)
- **NestJS** (modular architecture)
- **TypeORM** with **PostgreSQL**
- **JWT Authentication** (access tokens)
- **Role-based Authorization** (Customer / Supplier)
- **DTO Validation** with `class-validator` & `class-transformer`
- **Entities**: User, PackagingRequest, SupplierResponse, ProductType
- **Database Syncing** with `synchronize: true` during development

### 🔜 Frontend (Next.js + React)
- **Next.js** (pages routing system)
- **React Hooks** (`useState`, `useEffect`, `useRouter`)
- **Material UI (MUI)** for responsive UI components
- **React Toastify** for success/error feedback
- **JWT Token Storage** (localStorage)
- **Custom Theming** using MUI sx
- **API Integration** with backend via `fetch`

---

## 📦 Features Implemented

### ✅ Backend
- User registration & login (with hashed passwords)
- JWT-protected endpoints with role guards
- Packaging request creation logic (with related product type & customer)
- Supplier response entity and relation setup
- Validation on DTO level (UUID, array of items, quantities, etc.)
- Error handling (e.g. customer not found, missing fields)

### ✅ Frontend
- **Login Page** with form validation and redirect on success
- **Homepage** displaying trending packaging types
- **Create Request Page** (for customers)
  - Fields: Product Type ID, Quantity
  - Auth check before submission
  - Success/error toast messages
- **Dynamic API integration** based on JWT token
- Image assets and UI placeholders for future product types

---

## 📁 Project Structure

### Backend
backend/
├── src/
│   ├── auth/                  # JWT, login logic
│   ├── user/                  # User entity, service
│   ├── packaging-request/     # Create & fetch requests
│   ├── supplier-response/     # Supplier responses
│   └── product-type/          # Available packaging types

### Frontend
frontend/
├── src/
│   ├── pages/
│   │   ├── index.tsx                   # Home
│   │   ├── login.tsx                   # Login
│   │   └── customer/create-request.tsx # Create packaging request
│   ├── components/                     # Navbar, Footer
│   └── styles/                         # MUI custom styling
├── public/
│   ├── icons/                          # SVGs, logos
│   ├── images/                         # Product images

---

## 🚀 Setup Instructions

### 📌 Backend

```bash
cd backend
npm install
# Configure PostgreSQL connection in src/config/typeorm.config.ts or .env
npm run start:dev

cd frontend
npm install
npm run dev




