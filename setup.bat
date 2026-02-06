@echo off
mkdir legacy 2>nul
move index.html legacy\
move styles.css legacy\
move BF.svg legacy\
move UH.jpg legacy\
move VTT.jpg legacy\
move logo.png legacy\
call npx -y create-vite@latest . --template react-ts
