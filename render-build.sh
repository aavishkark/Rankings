set -o errexit

npm install


if [ ! -d "/opt/render/project/src/node_modules/puppeteer/.local-chromium" ]; then
  echo "Installing Puppeteer Browsers..."
  npx puppeteer browsers install chrome
fi
