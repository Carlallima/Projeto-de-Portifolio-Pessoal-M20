@echo off
echo ========================================
echo Executando Testes K6
echo ========================================

echo.
echo [1/4] Teste de Login...
k6 run tests/testK6/login.test.js

echo.
echo [2/4] Teste de Usuarios...
k6 run -e TEST_TOKEN=123456789teste tests/testK6/users.test.js

echo.
echo [3/4] Teste de Contratos...
k6 run -e TEST_TOKEN=123456789teste tests/testK6/contracts.test.js

echo.
echo [4/4] Teste de Emails...
k6 run -e TEST_TOKEN=123456789teste tests/testK6/email.test.js

echo.
echo ========================================
echo Testes K6 Finalizados!
echo ========================================
