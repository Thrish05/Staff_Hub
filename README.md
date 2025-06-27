# CIT Staff Hub - Comprehensive Faculty Management System

A modern, full-stack web application built with Next.js 15, TypeScript, and Tailwind CSS that serves as a comprehensive digital workspace for Chennai Institute of Technology's faculty members.

## 🚀 Features

- **Leave Management System** - Complete workflow for applying, approving, and tracking leave applications
- **Interactive Calendar** - Department-wide task scheduling and event management
- **Faculty Directory** - Advanced search and filtering system with detailed profiles
- **AI-Powered Chat Assistant** - "Walter" bot providing contextual faculty information
- **Analytics Dashboard** - Real-time activity tracking and performance metrics
- **Profile Management** - Comprehensive faculty profile system with photo uploads

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Node.js API routes with PostgreSQL database
- **AI/ML:** Custom RAG system with Ollama for intelligent responses
- **Authentication:** Role-based access control (Faculty, HOD, Principal)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **Ollama** (for AI features)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Staff_Hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/faculty

# Ollama Configuration (for AI features)
OLLAMA_HOST=http://localhost:11434
OLLAMA_URL=http://localhost:11434
EMBED_MODEL=nomic-embed-text

# Optional: Custom database credentials (if not using DATABASE_URL)
DB_USER=postgres
DB_HOST=localhost
DB_NAME=faculty
DB_PASSWORD=your_password
DB_PORT=5432
```

### 4. Database Setup

#### Option A: Using DATABASE_URL (Recommended)
```bash
# Create database
createdb faculty

# Run database migrations (if you have them)
# npm run db:migrate
```

#### Option B: Manual PostgreSQL Setup
```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE faculty;

-- Connect to the faculty database and create required tables
\c faculty

-- Create leave_applications table
CREATE TABLE leave_applications (
    id SERIAL PRIMARY KEY,
    faculty_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    leave_type VARCHAR(10) NOT NULL,
    approver VARCHAR(255) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    designation VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create calendar_events table
CREATE TABLE calendar_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    task_type VARCHAR(50) NOT NULL DEFAULT 'FACULTY',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create faculty_profiles table (basic structure)
CREATE TABLE faculty_profiles (
    faculty_id VARCHAR(50) PRIMARY KEY,
    faculty_name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    faculty_position VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    experience_years INTEGER,
    specialization TEXT,
    expertise_in_subjects TEXT,
    phd_guideship BOOLEAN DEFAULT FALSE,
    fdp_attended_count INTEGER DEFAULT 0,
    patents_count INTEGER DEFAULT 0,
    research_papers_count INTEGER DEFAULT 0,
    award_achievement_activity TEXT,
    photo_url TEXT
);

-- Create project_details table (for AI features)
CREATE TABLE project_details (
    id SERIAL PRIMARY KEY,
    faculty_id VARCHAR(50) NOT NULL,
    project_title VARCHAR(500) NOT NULL,
    project_description TEXT,
    name_of_faculty VARCHAR(255) NOT NULL,
    funding_agency VARCHAR(255),
    year_of_award INTEGER,
    embedding vector(768)
);

-- Enable vector extension (for AI features)
CREATE EXTENSION IF NOT EXISTS vector;
```

### 5. Install and Setup Ollama

#### Install Ollama
```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

#### Pull Required Models
```bash
# Pull embedding model
ollama pull nomic-embed-text

# Pull chat model
ollama pull llama3.2
```

### 6. Generate Embeddings (Optional - for AI features)

If you have faculty data, generate embeddings for the AI chat feature:

```bash
# Run the embedding generation script
node scripts/generate-embeddings.js
```

### 7. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Database Connection
The application supports both connection string and individual parameter configurations:

- **Preferred:** Use `DATABASE_URL` environment variable
- **Alternative:** Use individual `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT` variables

### AI Features Configuration
- **Ollama Host:** Defaults to `http://localhost:11434`
- **Embedding Model:** Uses `nomic-embed-text` for vector embeddings
- **Chat Model:** Uses `llama3.2` for AI responses

## 📁 Project Structure

```
Staff_Hub/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── leave/            # Leave management pages
│   ├── calendar/         # Calendar functionality
│   ├── analytics/        # Analytics dashboard
│   └── globalSearch/     # Faculty search
├── lib/                  # Utility functions
├── scripts/              # Database and embedding scripts
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication & Roles

The system supports three user roles:

1. **Faculty** - Basic access to leave applications, calendar, and profile
2. **HOD (Head of Department)** - Can manage department leave applications and create department tasks
3. **Principal** - Full access including HOD management and global faculty search

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env.local`
   - Ensure database `faculty` exists

2. **Ollama Connection Error**
   - Verify Ollama is running: `ollama serve`
   - Check if models are downloaded: `ollama list`
   - Ensure port 11434 is accessible

3. **Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

4. **AI Features Not Working**
   - Verify Ollama models are installed
   - Check embedding generation script output
   - Ensure vector extension is enabled in PostgreSQL

### Development Tips

- Use `npm run dev` with Turbopack for faster development
- Check browser console for client-side errors
- Monitor server logs for API route issues
- Use PostgreSQL logs for database-related problems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the code comments for implementation details

---

**Note:** This is a production-ready application designed for educational institutions. Ensure proper security measures and data backup procedures are in place before deployment.