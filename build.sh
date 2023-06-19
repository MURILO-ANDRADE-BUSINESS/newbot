yarn && yarn tsc &&
cp package.json ./dist/package.json && 
cp Procfile ./dist/Procfile &&
cd dist &&
rm -f dist.zip &&
zip -r dist.zip .