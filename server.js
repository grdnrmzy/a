'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var qs = require('querystring');
    var imageData = "";
    var myId = 1;

    if (req.method == "POST") {
        var fullBody = "";
        req.on('end', function (chunk) {
            fullBody += chunk.toStrfing();
        });
        req.on('end', function () {
            res.writeHead(200, { 'Content-type': 'text/html' });
            var POST = qs.parse(fullBody);
            if (POST["p"] == "new") {
                imageData = POST["text"];
                myId += 1;
                res.write(imageData);
            } else if (POST["p"] == "ajax") {
                if (myId > parseInt(POST["last"])) {
                    if (typeof (imageData) != "undefined") {
                        res.write(document.body.innerHTML = ('<img scr=" +  '"' + imageData + '"' + "/>)); "+"\n"); 
                        res.write("last_message_id = " + myId + ";");

                    }
                }
            }
    res.end();
}).listen(port);
