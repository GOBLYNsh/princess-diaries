@echo off
@echo off
REM The Princess Diaries - Run Script
@echo ========================================
@echo THE PRINCESS DIARIES - RUNNING
@echo ========================================
echo.
cd /d "%~dp0"
echo Working directory: %cd%
echo.
echo Starting development server...
echo.
echo Website will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause