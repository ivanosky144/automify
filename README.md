# Automify - Automation Web Based Application for CarbonEthics

## 1. Installation and Environment Setup

### 1.1 Prerequisites
- Node.js 20+
- Python 3.10+
- PostgreSQL
- npm or yarn
- Zapier

### 1.2 Clone Repository
```sh
git clone https://github.com/mufidussani/carbonethics-workflow
cd carbonethics-workflow
```

## 2. Backend API Configuration (Django + PostgreSQL)

### 2.1 Navigate to Backend Directory
```sh
cd server
```

### 2.2 Set Up Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # UNIX
venv\Scripts\activate  # WINDOWS
```

### 2.3 Install Dependencies
```sh
pip install requirement.txt
```

### 2.4 Configure Local PostgreSQL in `backend/backend/settings.py`
Create an .env file in the server directory to store your environment variables. This file should contain:
```sh
ZAPIER_WEBHOOK_URL = 

DB_ENGINE = 
DB_NAME = 
DB_USER = 
DB_HOST = 
DB_PORT = 
DB_PASSWORD = 
```
Replace each variable's value as needed.

### 2.5 Migrate Database
```sh
python manage.py makemigrations
python manage.py migrate
```

### 2.6 Run Backend Server
```sh
python manage.py runserver
```
Runs at [http://localhost:8000](http://localhost:8000)

### 2.8 List of API Endpoints in the Backend System

- `GET /api/login` - Login into your account
- `POST /api/register` - Create a new account
- `GET /api/users/:id` - Get account detail

- `GET /api/clients` - List all clients
- `POST /api/clients` - Create a new client
- `PUT /api/clients/:id` - Update a client
- `DELETE /api/clients/:id` - Delete a client

- `GET /api/requests` - List all requests (Paginated)
- `POST /api/requests` - Create a new request
- `PUT /api/requests/:id` - Update a request
- `DELETE /api/requests/:id` - Delete a request

## 3. Frontend Setup (Next.js)

### 3.1 Navigate to Frontend Directory
```sh
cd web
```

### 3.2 Install Dependencies
```sh
npm install
```

### 3.3 Integration with Backend API
To connect the frontend client with backend api, create a new .env file in the web directory. The file should contain:
```sh
NEXT_PUBLIC_API_URL =
```
Fill this variable's value with the existing running api url in your localhost.

### 3.4 Start Development Server
```sh
npm run dev
```

### 3.5 Open Frontend App
[http://localhost:3000](http://localhost:3000)

## 4. Workflow Automation (Zapier + Trello Integration)

### 4.1 Setting Up Zappier Integration
- Create a New Zap: Begin by logging into your Zapier account and initiating a new Zap
- Configure the Trigger by choosing "Webhook by Zappier" as the trigger app then select the "Catch Hook" event. 
- Insert the URL generated by Zapier into the ZAPIER_WEBHOOK_URL in the .env file located inside server directory.
- Set up actions by selecting Trello as the action app and choose "Create Card" event. Configure the necessary fields to define how and where the cards should be created.
- Choose Gmail as the action app and select "Send Email" event. Fill in the required fields to specify email's recipient, subject, and body content.




