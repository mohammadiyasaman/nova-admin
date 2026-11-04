# NOVA Admin

A responsive admin dashboard built with **React 19, TypeScript, Vite, and Redux Toolkit** as part of the NOVA Frontend Technical Challenge.

## Features

- **Authentication:** Login, authentication state management, and protected routes.
- **Dashboard:** Overview of store information and summary cards.
- **Products:** Fetch, search, filter, view details, and add products.
- **Users:** Fetch, search, view details, and add users.
- **Internationalization:** Persian and English language support.
- **Theming:** Light and Dark modes.
- **Responsive Design:** Adaptable layout for different screen sizes.
- **Form Validation:** Formik and Yup.

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Formik & Yup
- Styled Components

## Project Structure

```text
src/
├── Components/
│   └── Layout/
├── Dictionary/
├── Pages/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Products/
│   └── Users/
├── Redux/
│   └── Slices/
├── Routes/
├── Shared/
│   ├── Providers/
│   └── Theme/
├── Storage/
├── types/
├── Utils/
│   ├── api/
│   └── services/
└── Validations/
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohammadiyasaman/nova-admin.git
cd nova-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

### 4. Run the application

```bash
npm run dev
```

## Demo Credentials

Use the following Fake Store API test account:

| Field | Value |
|---|---|
| Username | `mor_2314` |
| Password | `83r5^_` |

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check and production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## API

This project uses [Fake Store API](https://fakestoreapi.com/) for authentication and product/user data.

**Note:** Fake Store API is a demo API. Create operations may return simulated responses and are not guaranteed to persist data on the server.

## Author

**Yasaman Mohammadi**

[GitHub Repository](https://github.com/mohammadiyasaman/nova-admin)