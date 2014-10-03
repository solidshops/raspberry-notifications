#tessel-notifications

##What
Play the sound of a falling coin every time your [SolidShops](www.solidshops.com)  store gets a new order.

The default API keys in the config.json file are those from [the notifications teststore](http://notifications.solidshops.com/). Once you start this application and create a new testorder and you will hear a falling coin.

If you want to connect to your own SolidShops account, just change the API keys in the config.json file.


##Setup
### system
* wget http://node-arm.herokuapp.com/node_latest_armhf.deb
* sudo dpkg -i node_latest_armhf.deb
* sudo apt-get install libasound2-dev
* run at startup crontab -u pi -e, /usr/bin/sudo -u pi -H /usr/local/bin/node /YOURCLONEDFOLDER/app.js

### app
* clone this repository
* npm install
* add you own API key and secret to the config.json file
* sudo tessel run|push app.js

##Note
As you might have noticed, this app just polls the SolidShops API every 5 minutes. Let us know if you want to receive realtime notifications and we will give you more information about webhooks and websockets.


