@echo off
REM ============================================
REM The Princess Diaries - Installation Script
REM ============================================

title Installing Dependencies

echo ========================================
echo  THE PRINCESS DIARIES - INSTALLATION
echo ========================================
echo.

cd /d "%~dp0"
echo Working directory: %cd%
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is not installed!
    echo Install from https://nodejs.org
    pause
    exit /b 1
)
echo Node.js:
node --version
echo.

REM Remove existing node_modules
if exist "node_modules" (
    echo Removing old node_modules...
    rd /s /q node_modules
)

REM Remove package-lock.json
if exist "package-lock.json" (
    echo Removing old package-lock.json...
    del /f /q package-lock.json
)

REM Install dependencies
echo Installing dependencies (this may take a few minutes)...
echo.
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: npm install failed!
    echo.
    echo Trying alternative install methods...
    echo.
    echo Attempt 1: npm install --force
    npm install --force
    if %errorlevel% neq 0 (
        echo Attempt 2: npm install --no-optional
        npm install --no-optional
        if %errorlevel% neq 0 (
            color 0C
            echo ERROR: All install methods failed!
            echo.
            echo Please check your internet connection and try again.
            pause
            exit /b 1
        )
    )
)

color 0A
echo.
echo ========================================
echo  DEPENDENCIES INSTALLED SUCCESSFULLY!
echo ========================================
echo.

REM Verify installation
if exist "node_modules\next" (
    echo Next.js: Installed ✓
) else (
    echo Next.js: NOT FOUND ✗
)

if exist "node_modules\react" (
    echo React: Installed ✓
) else (
    echo React: NOT FOUND ✗
)

if exist "node_modules\tailwindcss" (
    echo Tailwind CSS: Installed ✓
) else (
    echo Tailwind CSS: NOT FOUND ✗
)

if exist "node_modules\framer-motion" (
    echo Framer Motion: Installed ✓
) else (
    echo Framer Motion: NOT FOUND ✗
)

echo.
echo Starting development server...
echo.
echo Website will be available at: http://localhost:3000
echo Press Ctrl+C to stop
echo.

npm run dev

pause