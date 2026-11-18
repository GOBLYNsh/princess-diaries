@echo off
REM ============================================
REM The Princess Diaries - Complete Setup & Start Script
REM ============================================

title The Princess Diaries - Setup & Start
color 0F

echo.
echo ========================================
echo  THE PRINCESS DIARIES - SETUP SCRIPT
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"
echo Working directory: %cd%
echo.

REM Check Node.js installation
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js 18.17 LTS or later from:
    echo   https://nodejs.org
    echo.
    echo After installing Node.js, run this script again.
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo.

REM Check npm version
echo Checking npm version...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: npm is not available!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
echo.

REM Delete package-lock.json to ensure fresh install with correct versions
if exist "package-lock.json" (
    echo Removing old package-lock.json...
    del /f /q package-lock.json
)

REM Check if node_modules exists and remove it for clean install
if exist "node_modules" (
    echo Removing existing node_modules for clean install...
    rd /s /q node_modules
)

echo Running: npm install --legacy-peer-deps
echo.
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo WARNING: Standard install failed, trying with --force...
    echo.
    npm install --legacy-peer-deps --force
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: Failed to install dependencies!
        echo.
        echo Try running these commands manually:
        echo   npm install --legacy-peer-deps
        echo   or
        echo   npm install --force
        echo.
        pause
        exit /b 1
    )
)

color 0A
echo.
echo Dependencies installed successfully!
echo.

REM Set up environment file
echo Setting up environment variables...
if not exist ".env.local" (
    if exist ".env.example" (
        echo Creating .env.local from .env.example
        copy .env.example .env.local >nul
        color 0E
        echo.
        echo IMPORTANT: Please edit .env.local with your Supabase credentials!
        echo.
        echo Required values:
        echo   - NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
        echo   - NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
        echo   - SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
        echo.
        echo Find these at: https://supabase.com
        echo   Dashboard > Your Project > Settings > API
        echo.
        color 0F
        start "" "notepad.exe" ".env.local"
        echo.
        echo The .env.local file has been opened in Notepad.
        echo Please fill in your Supabase credentials before continuing.
        echo.
        pause
    ) else (
        color 0C
        echo ERROR: .env.example not found!
        pause
        exit /b 1
    )
) else (
    echo .env.local already exists.
)

REM Verify Next.js is installed
echo Verifying installation...
if not exist "node_modules\next" (
    color 0C
    echo ERROR: Next.js package not found after installation!
    echo Try running: npm install --legacy-peer-deps --force
    pause
    exit /b 1
)
echo.

REM Success! Start development server
color 0A
echo ========================================
echo  SUCCESS! Starting development server...
echo ========================================
echo.
echo Website will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
color 0F
pause
echo.

REM Start the dev server
npm run dev

pause