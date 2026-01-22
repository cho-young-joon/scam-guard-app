@echo off
chcp 65001
echo ==========================================
echo       ScamGuard 서비스 시작 중...
echo ==========================================
echo.
echo 1. 서버를 시작합니다...
echo 2. 브라우저가 자동으로 열립니다 (http://localhost:3000)
echo.

:: 브라우저를 3초 뒤에 엽니다 (서버 로딩 시간 고려)
timeout /t 3 >nul
start http://localhost:3000

:: Next.js 프로덕션 서버 시작
call npm run start

pause
