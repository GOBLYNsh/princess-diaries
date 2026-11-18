@echo off
REM Princess Diaries - Local Deployment Script
REM This script sets up and starts the Princess Diaries website locally

echo ========================================
echo The Princess Diaries - Local Deployment
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18.17 or later from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Navigate to the project directory
cd /d "%~dp0"
echo Current directory: %cd%
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo IMPORTANT: .env.local file not found!
    echo Please:
    echo 1. Copy .env.example to .env.local
    echo 2. Fill in your Supabase credentials
    echo 3. Run this script again
    echo.
    echo Running: copy .env.example .env.local
    copy .env.example .env.local
    echo.
    echo Please edit .env.local with your Supabase credentials:
    echo   - NEXT_PUBLIC_SUPABASE_URL
    echo   - NEXT_PUBLIC_SUPABASE_ANON_KEY
    echo   - SUPABASE_SERVICE_ROLE_KEY
    echo.
)

echo Starting development server...
echo.
echo The website will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

pause