#!/bin/bash
ls
echo removing /home/csille00/school/cs340/tweeter-web-starter/tweeter-server/dist
rm -rf dist
echo removing node_modules
rm -rf /home/csille00/school/cs340/tweeter-web-starter/tweeter-server/node_modules
npm i
rm -rf /home/csille00/school/cs340/tweeter-web-starter/tweeter-server/nodejs
rm /home/csille00/school/cs340/tweeter-web-starter/tweeter-server/dist.zip
rm /home/csille00/school/cs340/tweeter-web-starter/tweeter-server/nodejs.zip
ls
mkdir nodejs
rsync -aL node_modules nodejs/node_modules
tsc
zip -r dist.zip dist 1>/dev/null
zip -r nodejs.zip nodejs 1>/dev/null

./updateLayers.sh
./uploadLambdas.sh