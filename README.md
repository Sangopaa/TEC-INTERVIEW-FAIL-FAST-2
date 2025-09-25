# Full Stack Application - React + Django

A full-stack web application with React frontend and Django backend.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)

## 🛠️ Tech Stack

**Frontend:**
- React 18+
- JavaScript/TypeScript
- Tailwind CSS
- Axios for API calls

**Backend:**
- Django 4+
- Django REST Framework
- Python 3.8+
- SQLite/PostgreSQL

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package installer)
- Git

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "PRUEBA TECNICA 2"
```

### 2. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create base data (run custom management command)
python manage.py create_base_data

# Create superuser (optional)
python manage.py createsuperuser

# Collect static files (if needed)
python manage.py collectstatic
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

## 🏃‍♂️ Development

### Starting the Backend Server

```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
python manage.py runserver
```

The Django server will start at `http://localhost:8000`

### Starting the Frontend Server

```bash
cd frontend
npm start
# or
yarn start
```

The React app will start at `http://localhost:3000`

### Development URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Django Admin:** http://localhost:8000/admin/

## 📁 Project Structure

```
PRUEBA TECNICA 2/
├── backend/                 # Django application
│   ├── .env                # Environment variables
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   ├── forms/              # Django app for forms
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── management/     # Custom management commands
│   │   │   └── commands/
│   │   │       └── create_base_data.py
│   │   ├── migrations/     # Database migrations
│   │   │   ├── __init__.py
│   │   │   └── 0001_initial.py
│   │   ├── serializers/    # DRF serializers
│   │   │   ├── __init__.py
│   │   │   ├── form.py
│   │   │   ├── person.py
│   │   │   └── rule.py
│   │   └── services/       # Business logic services
│   │       ├── __init__.py
│   │       ├── person.py
│   │       └── rules.py
│   └── tec_interview/      # Main Django project
│       ├── __init__.py
│       ├── asgi.py
│       ├── settings.py
│       ├── urls.py
│       └── wsgi.py
├── frontend/               # React + TypeScript application
│   ├── .env                # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js   # PostCSS configuration
│   ├── README.md
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── public/             # Static assets
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/                # Source code
│       ├── App.css
│       ├── App.test.tsx
│       ├── App.tsx         # Main App component
│       ├── index.css
│       ├── index.tsx       # Entry point
│       ├── logo.svg
│       ├── react-app-env.d.ts
│       ├── reportWebVitals.ts
│       ├── setupTests.ts
│       ├── components/     # React components
│       │   ├── DynamicField.tsx
│       │   └── PersonForm.tsx
│       ├── hooks/          # Custom React hooks
│       │   └── useRuleEngine.ts
│       ├── services/       # API services
│       │   └── request.ts
│       └── types/          # TypeScript type definitions
│           ├── personData.ts
│           └── rule.ts
├── .gitignore
└── README.md
```

## 🔌 API Documentation

### Base URL
- Development: `http://localhost:8000/api/`

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/` | API root |
| GET    | `/api/forms/rules/<form_id>/` | Get validation rules for a specific form |
| POST   | `/api/forms/person/` | Submit person form data |

## 🌍 Environment Variables

### Backend (.env)

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_DEBUG=true
```
