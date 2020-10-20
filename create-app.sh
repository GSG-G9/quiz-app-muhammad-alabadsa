touch index.html
mkdir assets
cd assets
touch style.css main.js
cd ..
code .
git add .
git commit -m "Create Initial Files"
git checkout -b "initial-files"
git remote add origin https://github.com/GSG-G9/quiz-app-muhammad-alabadsa.git
git push origin initial-files

