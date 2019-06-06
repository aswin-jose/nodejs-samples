"use strict";


module.exports = (options, callback) => {

    let requestProtocol;
    const {
        URL
    } = require("url");

    if (typeof (options) == "object" && options.url) {
        let requestURL = new URL(options.url);

        if (requestURL) {
            console.log(requestURL.protocol);
            switch (requestURL.protocol) {
                case "http:":
                    requestProtocol = require("http");
                    break;
                case "https:":
                    requestProtocol = require("https");
                    break;
                default:
                    requestProtocol = undefined;
            }

            let requestOptions = {};

            requestOptions["method"] = options.method;
            requestOptions["hostname"] = requestURL.hostname;
            requestOptions["port"] = requestURL.port;
           // requestOptions["port"] = 80;
            requestOptions["path"] = requestURL.pathname;
            requestOptions["headers"] = options.headers;

            console.log(requestOptions);

            const req = requestProtocol.request(requestOptions, (res) => {
                let dataResponse = "";
                console.log('statusCode:', res.statusCode);

                res.on('data', (d) => {
                    dataResponse += d;
                });

                res.on('end', () => {
                    callback(false,res,dataResponse);
                });

            });

            req.on('error', (e) => {
                callback(true,null,null);
            });

            if (options.method=="POST"){
                req.write(JSON.stringify(options.body));
            }


            req.end();

        }
    }

    // let request=require("request");
    // request(options,callback);
};
