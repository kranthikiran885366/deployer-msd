@echo off
REM Ensure script runs from its directory
cd /d %~dp0
echo Starting CloudDeck Development Environment...
echo.

echo Installing frontend dependencies...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd server
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting backend server on port 5000...
start "Backend Server" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting frontend server on port 3000...
cd ..
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Development servers are starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
echo Press any key to exit...
pause > nul