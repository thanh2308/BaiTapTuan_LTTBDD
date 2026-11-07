@echo off
chcp 65001 >nul
cd /d "%~dp0"
if exist "runtime\node.exe" goto bundled
where node >nul 2>nul
if errorlevel 1 goto missing
node server.cjs
goto finish
:bundled
"runtime\node.exe" server.cjs
goto finish
:missing
echo Ban ma nguon nay can Node.js 22+ hoac hay dung ZIP Buoi9 HoanThien co san runtime.
:finish
pause
