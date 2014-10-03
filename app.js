/************************************
 **** INIT * ************************
 ************************************/
var webclient = require('https');
var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

//disable log when log config is false
var fileContents = fs.readFileSync("config.json");
var obj_config = JSON.parse(fileContents);

if(!obj_config.log ) {
 console.log = function () {};
}





/************************************
 **** Functions *********************
 ************************************/
function fnGetData() {
    console.log("fnGetData");
    try {
        var options = {
            host: 'api.solidshops.com',
            port: 443,
            path: '/v1/orders.json?count=1&order=id:desc',
            headers: {
                'Authorization': 'Basic '
                    + new Buffer(obj_config.api.key + ':' + obj_config.api.secret).toString('base64'),
                'User-Agent': 'SolidShops/Tessel'
            }
        };


        var request = webclient.get(options, function (res) {
            var body = "";
            res.on('data', function (data) {
                body += data;
            });
            res.on('end', function () {
                // here we have the full response, html or json object
                try {
                    var obj_response = JSON.parse(body);
                    fnHandleOrder(obj_response.data[0]);
                } catch (e) {
                    console.log("Error:  res.on('end') " + e.message);
                }
            })
            res.on('error', function (e) {
                console.log("Error:  res.on('error') " + e.message);
            });
        });
        request.on('error', function (error) {
            console.log("Error: request.on('error')");
        });

        request.end();
    } catch (e) {
        console.log('Error in fnGetData http connection');
    }


}

//handle data
var id_order_latest = 0;
function fnHandleOrder(obj_order) {
    //check order data
    console.log("fnHandleOrder");
    if (parseInt(obj_order.id) > id_order_latest) {
        id_order_latest = parseInt(obj_order.id);
        console.log("a new order was found: " + id_order_latest);
        fnPlayNotification("sound/neworder.mp3");
    }
};

//play sound
//play notification
function fnPlayNotification(str_filename) {
    console.log("Playing sound: " +str_filename);
    fs.createReadStream( str_filename)
        .pipe(new lame.Decoder())
        .on('format', function (format) {
            this.pipe(new Speaker(format));
            console.log("AUDIO PLAYED")
        });
}





/************************************
 **** Start *************************
 ************************************/
fnGetData();
setInterval(fnGetData, obj_config.interval);




















