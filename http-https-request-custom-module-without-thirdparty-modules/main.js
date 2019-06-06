"use strict";

const custom_request = require("./custom-require");
const conn_details = require("./env_details.json");

conn_details.forEach(conn_detail => {

    custom_request(conn_detail, (err, res, body) => {
        if (err) {
            console.log("error");
        } else {
            console.log("success");
            console.log(body);
        }

    });
});