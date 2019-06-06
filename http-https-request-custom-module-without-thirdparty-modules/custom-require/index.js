"use strict";

const {
    URL
} = require("url");

module.exports = (options, callback) => {

    //validate options
    if (typeof (options) != "object" || options.url === undefined) {
        callback(true, null, null);
        return;
    }

    let requestURL = new URL(options.url);

    if (requestURL === undefined) {
        callback(true, null, null);
        return;
    }

    const http = require("http");
    const https = require("https");

    // Execution of the request.
    let requestLib = requestURL.protocol === 'https:' ? https : http;

    if (options.method == "POST") {
        let length = Buffer.byteLength(JSON.stringify(options.body));
        options.headers["Content-Length"] = length;
    }

    let requestOptions = {
        method: options.method,
        hostname: requestURL.hostname,
        port: requestURL.port,
        path: requestURL.pathname,
        headers: options.headers
    };

    const req = requestLib.request(requestOptions, (res) => {
        let dataResponse = "";
        //console.log('statusCode:', res.statusCode);

        res.on('data', (d) => {
            dataResponse += d;
        });

        res.on('end', () => {
            if (options.json == true){
                callback(false, res, JSON.parse(dataResponse)); // To do handle return based on types.
            } else{
                callback(false, res, dataResponse); // To do handle return based on types.
            }

        });

    });

    req.on('error', (e) => {
        callback(true, null, null);
    });

    if (options.method == "POST") {
        req.write(JSON.stringify(options.body));
    }

    req.end();

};
