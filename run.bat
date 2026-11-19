@echo off
REM ============================================
REM The Princess Diaries - Run Script
REM ============================================

title The Princess Diaries - Running

color 0F
echo.
echo ========================================
echo  THE PRINCESS DIARIES - RUNNING
echo ========================================
echo.

cd /d "%~dp0"

echo Starting development server...
echo.
echo Website will be available at: http://localhost:3000
echo Press Ctrl+C to stop
echo.

npm run dev

pause